"""app.py – Task Assignment GA API

Flask API lista para desplegar en **Render.com**.
================================================
Esta versión expone el algoritmo genético como servicio REST.

Endpoints principales
---------------------
- **POST /optimize** → ejecuta el GA.  
  Cuerpo JSON ↓
  ```json
  {
    "tasks": [ {"id": 1, "name": "Tarea", "effort": 8, "complexity": 5,
                 "dependencies": [], "skills_required": {"python": 6} }, ... ],
    "developers": [ {"id": 1, "name": "Dev", "capacity": 72,
                     "skill_levels": {"python": 7}, "cost_per_hour": 25}, ... ],
    "config": {
        "population": 300,
        "generations": 500,
        "mutation": 0.3,
        "crossover": 0.9,
        "tournament": 4,
        "weights": {"makespan": 0.5, "variance": 0.2, "skill": 0.2, "cost": 0.1}
    }
  }
  ```
  Respuesta: JSON con `assignment`, `details`, `weights`.

- **GET /health** → retorna `{"status": "ok"}` para checkeo de Render.

Deploy rápido en Render
-----------------------
1. **requirements.txt**
   ```
   Flask==3.0.3
   gunicorn==22.0.0
   ````
   (Añade el resto de dependencias estándar de Python 3 que ya trae Render).

2. **Procfile**
   ```
   web: gunicorn app:app --preload --timeout 90
   ```

3. En Render → **New Web Service** con repo público/privado, build command `pip install -r requirements.txt`, start command `gunicorn app:app`.

4. Etiqueta `PYTHON_VERSION` >= 3.11 si tu GA usa `slots=True` en dataclasses.

Pruebas locales:
```
python app.py  # levanta Flask en localhost:5000
curl -X POST http://localhost:5000/optimize -H "Content-Type: application/json" \
     -d @payload.json
```
"""

from __future__ import annotations

import json
import math
import os
import random
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Sequence, Tuple, Any

from flask import Flask, jsonify, request
from werkzeug.exceptions import BadRequest

# =====================================================
# === Parámetros globales                             ===
# =====================================================
SPRINT_DAYS = 9
HOURS_PER_DAY = 8
DEFAULT_SPRINT_HOURS = SPRINT_DAYS * HOURS_PER_DAY

# =====================================================
# === Modelos de dominio                              ===
# =====================================================

@dataclass(slots=True)
class Task:
    id: int
    name: str
    effort: int  # horas
    complexity: int  # 1‑10
    dependencies: List[int] = field(default_factory=list)
    skills_required: Dict[str, int] = field(default_factory=dict)


@dataclass(slots=True)
class Developer:
    id: int
    name: str
    capacity: int = DEFAULT_SPRINT_HOURS
    skill_levels: Dict[str, int] = field(default_factory=dict)
    cost_per_hour: float = 25.0

    def level(self, skill: str) -> int:
        return self.skill_levels.get(skill, 0)


Chromosome = List[int]

# =====================================================
# === Utilidades de carga                             ===
# =====================================================


def load_tasks(raw_tasks: List[Dict[str, Any]]) -> List[Task]:
    return [Task(**t) for t in raw_tasks]


def load_devs(raw_devs: List[Dict[str, Any]]) -> List[Developer]:
    return [Developer(**d) for d in raw_devs]


def topological_sort(tasks: Sequence[Task]) -> List[Task]:
    indeg = {t.id: 0 for t in tasks}
    graph: Dict[int, List[int]] = defaultdict(list)
    for t in tasks:
        for dep in t.dependencies:
            indeg[t.id] += 1
            graph[dep].append(t.id)
    q: List[int] = [t.id for t in tasks if indeg[t.id] == 0]
    order: List[int] = []
    while q:
        cur = q.pop(0)
        order.append(cur)
        for nb in graph[cur]:
            indeg[nb] -= 1
            if indeg[nb] == 0:
                q.append(nb)
    if len(order) != len(tasks):
        raise ValueError("Ciclo detectado en dependencias")
    id2task = {t.id: t for t in tasks}
    return [id2task[i] for i in order]

# =====================================================
# === Fitness                                         ===
# =====================================================

def evaluate_chrom(
    chrom: Chromosome,
    tasks_ord: List[Task],
    devs: List[Developer],
    w: Dict[str, float],
) -> Tuple[float, Dict[str, Any]]:
    dev_timeline = {d.id: 0 for d in devs}
    dev_effort = {d.id: 0 for d in devs}
    task_start, task_finish = {}, {}
    penalty_skill = 0.0

    id2dev = {d.id: d for d in devs}

    for task, dev_id in zip(tasks_ord, chrom):
        dev = id2dev[dev_id]
        deps_done = max((task_finish.get(dep, 0) for dep in task.dependencies), default=0)
        start = max(dev_timeline[dev_id], deps_done)
        finish = start + task.effort

        task_start[task.id] = start
        task_finish[task.id] = finish
        dev_timeline[dev_id] = finish
        dev_effort[dev_id] += task.effort

        # gap skills
        for skill, req in task.skills_required.items():
            diff = max(0, req - dev.level(skill))
            penalty_skill += diff * task.complexity

    makespan = max(task_finish.values())
    loads = list(dev_effort.values())
    mean_load = sum(loads) / len(loads)
    load_var = sum((l - mean_load) ** 2 for l in loads) / len(loads)
    cost_total = sum(dev_effort[d.id] * d.cost_per_hour for d in devs) / 100.0

    fitness = (
        makespan * w["makespan"] + load_var * w["variance"] + penalty_skill * w["skill"] + cost_total * w["cost"]
    )
    details = {
        "makespan": makespan,
        "load_variance": load_var,
        "penalty_skill": penalty_skill,
        "cost_total": cost_total * 100,
        "task_start": task_start,
        "task_finish": task_finish,
        "dev_effort": dev_effort,
    }
    return fitness, details

# =====================================================
# === GA operadores                                   ===
# =====================================================

def init_population(pop_size: int, dev_ids: List[int], length: int) -> List[Chromosome]:
    return [random.choices(dev_ids, k=length) for _ in range(pop_size)]


def tournament(pop: List[Chromosome], k: int, cache: Dict[Tuple[int, ...], float]) -> Chromosome:
    cand = random.sample(pop, k)
    return min(cand, key=lambda c: cache[tuple(c)])


def crossover(p1: Chromosome, p2: Chromosome) -> Tuple[Chromosome, Chromosome]:
    if len(p1) < 3:
        return p1[:], p2[:]
    a, b = sorted(random.sample(range(1, len(p1)), 2))
    return p1[:a] + p2[a:b] + p1[b:], p2[:a] + p1[a:b] + p2[b:]


def mutate(ch: Chromosome, dev_ids: List[int], rate: float) -> None:
    for i in range(len(ch)):
        if random.random() < rate:
            ch[i] = random.choice([d for d in dev_ids if d != ch[i]])

# =====================================================
# === GA principal                                    ===
# =====================================================

def run_ga(
    tasks: List[Task],
    devs: List[Developer],
    cfg: Dict[str, Any],
) -> Tuple[Chromosome, Dict[str, Any]]:
    pop_size = cfg.get("population", 300)
    gens = cfg.get("generations", 500)
    mut = cfg.get("mutation", 0.3)
    cx = cfg.get("crossover", 0.9)
    tourn = cfg.get("tournament", 4)
    w = cfg.get(
        "weights",
        {"makespan": 0.5, "variance": 0.2, "skill": 0.2, "cost": 0.1},
    )
    patience = cfg.get("patience")
    seed = cfg.get("seed")
    if seed is not None:
        random.seed(seed)

    tasks_ord = topological_sort(tasks)
    dev_ids = [d.id for d in devs]
    pop = init_population(pop_size, dev_ids, len(tasks_ord))

    cache_fit: Dict[Tuple[int, ...], float] = {}
    cache_det: Dict[Tuple[int, ...], Dict[str, Any]] = {}

    def cached(c: Chromosome):
        key = tuple(c)
        if key not in cache_fit:
            f, d = evaluate_chrom(c, tasks_ord, devs, w)
            cache_fit[key] = f
            cache_det[key] = d
        return cache_fit[key], cache_det[key]

    best_c, best_f, best_det = pop[0], math.inf, {}
    stagn = 0

    for g in range(gens):
        for c in pop:
            f, d = cached(c)
            if f < best_f:
                best_c, best_f, best_det = c[:], f, d
                stagn = 0
        stagn += 1
        if patience and stagn >= patience:
            break

        new_pop: List[Chromosome] = [best_c[:]]
        while len(new_pop) < pop_size:
            p1 = tournament(pop, tourn, cache_fit)
            p2 = tournament(pop, tourn, cache_fit)
            c1, c2 = (crossover(p1, p2) if random.random() < cx else (p1[:], p2[:]))
            mutate(c1, dev_ids, mut)
            mutate(c2, dev_ids, mut)
            new_pop.extend([c1, c2])
        pop = new_pop[:pop_size]

    return best_c, best_det

# =====================================================
# === Flask App                                       ===
# =====================================================

app = Flask(__name__)


@app.route("/health")
def health():
    return {"status": "ok"}


@app.route("/optimize", methods=["POST"])
def optimize():
    try:
        payload = request.get_json(force=True)
        tasks_raw = payload.get("tasks")
        devs_raw = payload.get("developers")
        if not tasks_raw or not devs_raw:
            raise BadRequest("'tasks' y 'developers' son obligatorios")
        cfg = payload.get("config", {})
        tasks = load_tasks(tasks_raw)
        devs = load_devs(devs_raw)
        best_chrom, det = run_ga(tasks, devs, cfg)
        assignment = {
            t.id: next(d.name for d in devs if d.id == dev_id)
            for t, dev_id in zip(topological_sort(tasks), best_chrom)
        }
        return jsonify(
            {
                "assignment": assignment,
                "details": det,
                "weights": cfg.get("weights", {"makespan": 0.5, "variance": 0.2, "skill": 0.2, "cost": 0.1}),
            }
        )
    except BadRequest as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =====================================================
# === CLI fallback                                    ===
# =====================================================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
