import random
import json
import math
from collections import defaultdict
from dataclasses import dataclass, field
from typing import List, Dict, Tuple

SPRINT_HOURS = 9 * 8  # 9 días * 8 h por día

@dataclass
class Task:
    id: int
    name: str
    effort: int
    dependencies: List[int] = field(default_factory=list)

@dataclass
class Developer:
    id: int
    name: str
    capacity: int = SPRINT_HOURS

TASKS: List[Task] = [
    Task(1, "Análisis de requisitos", 16, []),
    Task(2, "Diseño de base de datos", 12, [1]),
    Task(3, "Backend API", 32, [2]),
    Task(4, "Frontend UI", 28, [2]),
    Task(5, "Pruebas unitarias", 14, [3, 4]),
    Task(6, "Despliegue", 8, [5]),
    Task(7, "Documentación técnica", 10, [3, 4]),         # Después de desarrollo
    Task(8, "Revisión de código", 8, [3, 4]),             # Después de desarrollo
    Task(9, "Integración continua", 10, [3, 4]),          # Después de desarrollo
    Task(10, "Pruebas de integración", 12, [9]),          # Después de integración continua
    Task(11, "Pruebas de aceptación", 10, [5, 10]),       # Después de unitarias e integración
    Task(12, "Capacitación de usuarios", 6, [11]),        # Después de aceptación
    Task(13, "Soporte post-despliegue", 8, [6]), 
]

DEVELOPERS: List[Developer] = [
    Developer(1, "Dev A"),
    Developer(2, "Dev B"),
    Developer(3, "Dev C"),
    # Developer(4, "Dev D"),
    # Developer(5, "Dev E"),
    # Developer(6, "Dev F"),
    # Developer(7, "Dev G"),
]

Chromosome = List[int]

def init_population(pop_size: int) -> List[Chromosome]:
    dev_ids = [dev.id for dev in DEVELOPERS]
    population = set()
    while len(population) < pop_size:
        chrom = tuple(random.choices(dev_ids, k=len(TASKS)))
        population.add(chrom)
    return [list(chrom) for chrom in population]

def topological_sort(tasks: List[Task]) -> List[Task]:
    indeg = {t.id: 0 for t in tasks}
    graph = defaultdict(list)
    for t in tasks:
        for dep in t.dependencies:
            indeg[t.id] += 1
            graph[dep].append(t.id)
    queue = [t.id for t in tasks if indeg[t.id] == 0]
    order = []
    while queue:
        current = queue.pop(0)
        order.append(current)
        for neighbor in graph[current]:
            indeg[neighbor] -= 1
            if indeg[neighbor] == 0:
                queue.append(neighbor)
    if len(order) != len(tasks):
        raise ValueError("Ciclo detectado en dependencias")
    id_to_task = {t.id: t for t in tasks}
    return [id_to_task[i] for i in order]

ORDERED_TASKS = topological_sort(TASKS)

def evaluate(chrom: Chromosome) -> Tuple[float, Dict]:
    dev_timeline: Dict[int, int] = {dev.id: 0 for dev in DEVELOPERS}
    task_start: Dict[int, int] = {}
    task_finish: Dict[int, int] = {}
    penalty = 0

    for task, dev_id in zip(ORDERED_TASKS, chrom):
        dep_finish = max(task_finish.get(dep, 0) for dep in task.dependencies) if task.dependencies else 0
        start_time = max(dev_timeline[dev_id], dep_finish)
        finish_time = start_time + task.effort
        task_start[task.id] = start_time
        task_finish[task.id] = finish_time
        dev_timeline[dev_id] = finish_time

        # Penalización si supera la capacidad del sprint
        if finish_time > SPRINT_HOURS:
            penalty += (finish_time - SPRINT_HOURS) * 2  # Penalización menos agresiva

    makespan = max(task_finish.values())
    loads = [sum(task.effort for task, dev in zip(ORDERED_TASKS, chrom) if dev == d.id) for d in DEVELOPERS]
    mean_load = sum(loads) / len(loads)
    load_variance = sum((l - mean_load) ** 2 for l in loads) / len(loads)

    # Fitness ajustado: más peso a makespan y penalización, menos a varianza
    fitness = makespan * 0.7 + load_variance * 0.3 + penalty * 5
    details = {
        "makespan": makespan,
        "load_variance": load_variance,
        "penalty": penalty,
        "task_start": task_start,
        "task_finish": task_finish,
    }
    return fitness, details

def tournament_selection(pop: List[Chromosome], k: int = 4) -> Chromosome:
    contenders = random.sample(pop, k)
    return min(contenders, key=lambda c: evaluate(c)[0])

def crossover(parent1: Chromosome, parent2: Chromosome) -> Tuple[Chromosome, Chromosome]:
    # Crossover de dos puntos
    if len(parent1) < 3:
        return parent1[:], parent2[:]
    p1, p2 = sorted(random.sample(range(1, len(parent1)), 2))
    child1 = parent1[:p1] + parent2[p1:p2] + parent1[p2:]
    child2 = parent2[:p1] + parent1[p1:p2] + parent2[p2:]
    return child1, child2

def mutate(chrom: Chromosome, rate: float = 0.25) -> None:
    dev_ids = [dev.id for dev in DEVELOPERS]
    for i in range(len(chrom)):
        if random.random() < rate:
            # Evita mutar al mismo desarrollador
            choices = [d for d in dev_ids if d != chrom[i]]
            chrom[i] = random.choice(choices)

def genetic_algorithm(
        pop_size: int = 500,
        generations: int = 300,
        cx_prob: float = 0.85,
        mut_rate: float = 0.5):
    pop = init_population(pop_size)
    best_chrom, best_fit, best_det = None, math.inf, None

    for gen in range(generations):
        # Evaluar población y actualizar mejor global
        fits = []
        for chrom in pop:
            fit, det = evaluate(chrom)
            fits.append((fit, chrom, det))
            if fit < best_fit:
                best_chrom, best_fit, best_det = chrom[:], fit, det

        # Elitismo: solo el mejor global
        new_pop = [best_chrom[:]]

        # Generar el resto de la población
        while len(new_pop) < pop_size:
            p1 = tournament_selection(pop, k=4)
            p2 = tournament_selection(pop, k=4)
            if True: #random.random() < cx_prob
                c1, c2 = crossover(p1, p2)
            else:     
                c1, c2 = p1[:], p2[:]   
            mutate(c1, mut_rate)
            mutate(c2, mut_rate)
            new_pop.append(c1)
            if len(new_pop) < pop_size:
                new_pop.append(c2)

        pop = new_pop[:pop_size]

        if (gen + 1) % 5 == 0 or gen == 0:
            print(f"Gen {gen+1}: mejor fitness {best_fit:.2f} (makespan {best_det['makespan']} h)")

    return best_chrom, best_det

def summarise(best_chrom: Chromosome, details: Dict) -> None:
    print("\n=== Cronograma Óptimo ===")
    dev_map = {dev.id: dev.name for dev in DEVELOPERS}
    for task, dev_id in zip(ORDERED_TASKS, best_chrom):
        start = details['task_start'][task.id]
        finish = details['task_finish'][task.id]
        print(f"{task.name:<30} -> {dev_map[dev_id]:<6} {start:>3} h - {finish:>3} h")

    status = "VERDE" if details['makespan'] <= SPRINT_HOURS else \
             "AMARILLO" if details['makespan'] <= SPRINT_HOURS * 1.1 else "ROJO"

    total_effort = sum(task.effort for task in TASKS)
    total_capacity = len(DEVELOPERS) * SPRINT_HOURS
    avg_efficiency = total_effort / total_capacity * 100 if total_capacity > 0 else 0

    print(f"\nDuración del sprint: {details['makespan']} h ({status})")
    print(f"Esfuerzo total: {total_effort} h")
    print(f"Eficiencia promedio: {avg_efficiency:.1f}%")

    print("\nCarga de trabajo:")
    dev_loads = defaultdict(int)
    for task, dev_id in zip(ORDERED_TASKS, best_chrom):
        dev_loads[dev_id] += task.effort

    for dev_id, load in dev_loads.items():
        utilization = load / SPRINT_HOURS * 100
        print(f"{dev_map[dev_id]}: {load} h ({utilization:.1f}%)")

def main():
    global SPRINT_HOURS
    import argparse
    parser = argparse.ArgumentParser(description="Asignación óptima de tareas con GA")
    parser.add_argument('--population', type=int, default=200, help='Tamaño de la población')
    parser.add_argument('--generations', type=int, default=300, help='Número de generaciones')
    parser.add_argument('--mutation', type=float, default=0.25, help='Tasa de mutación')
    parser.add_argument('--sprint', type=int, default=SPRINT_HOURS, help='Horas disponibles en el sprint')
    args = parser.parse_args()

    original_sprint = SPRINT_HOURS
    if args.sprint != original_sprint:
        SPRINT_HOURS = args.sprint
        for dev in DEVELOPERS:
            dev.capacity = SPRINT_HOURS

    best_chrom, details = genetic_algorithm(
        pop_size=args.population,
        generations=args.generations,
        mut_rate=args.mutation
    )

    summarise(best_chrom, details)

    dev_map = {dev.id: dev.name for dev in DEVELOPERS}
    result = {
        "assignment": {task.id: dev_map[dev_id] for task, dev_id in zip(ORDERED_TASKS, best_chrom)},
        "details": details,
    }
    with open("best_schedule.json", "w", encoding="utf-8") as fp:
        json.dump(result, fp, indent=2, ensure_ascii=False)
    print("\nCronograma exportado a best_schedule.json")

if __name__ == '__main__':
    main()