Ruta: http://127.0.0.1:5000/optimize
Método: POST   


Json válido:
{
  "tasks": [
    { "id": 1,  "name": "T1",  "effort": 4,  "complexity": 2, "dependencies": [], "skills_required": { "python": 2 } },
    { "id": 2,  "name": "T2",  "effort": 6,  "complexity": 3, "dependencies": [1], "skills_required": { "git": 2 } },
    { "id": 3,  "name": "T3",  "effort": 5,  "complexity": 3, "dependencies": [1], "skills_required": { "sql": 3 } },
    { "id": 4,  "name": "T4",  "effort": 6,  "complexity": 3, "dependencies": [2], "skills_required": { "python": 3 } },
    { "id": 5,  "name": "T5",  "effort": 3,  "complexity": 2, "dependencies": [3], "skills_required": { "html": 2 } },
    { "id": 6,  "name": "T6",  "effort": 8,  "complexity": 4, "dependencies": [], "skills_required": { "javascript": 4 } },
    { "id": 7,  "name": "T7",  "effort": 5,  "complexity": 2, "dependencies": [6], "skills_required": { "html": 3 } },
    { "id": 8,  "name": "T8",  "effort": 6,  "complexity": 3, "dependencies": [4, 5], "skills_required": { "python": 3 } },
    { "id": 9,  "name": "T9",  "effort": 4,  "complexity": 2, "dependencies": [7], "skills_required": { "css": 2 } },
    { "id": 10, "name": "T10", "effort": 7,  "complexity": 4, "dependencies": [8], "skills_required": { "sql": 4 } },
    { "id": 11, "name": "T11", "effort": 5,  "complexity": 2, "dependencies": [], "skills_required": { "git": 2 } },
    { "id": 12, "name": "T12", "effort": 4,  "complexity": 2, "dependencies": [11], "skills_required": { "python": 2 } },
    { "id": 13, "name": "T13", "effort": 6,  "complexity": 3, "dependencies": [12], "skills_required": { "sql": 3 } },
    { "id": 14, "name": "T14", "effort": 3,  "complexity": 1, "dependencies": [], "skills_required": { "html": 1 } },
    { "id": 15, "name": "T15", "effort": 4,  "complexity": 2, "dependencies": [14], "skills_required": { "css": 2 } },
    { "id": 16, "name": "T16", "effort": 5,  "complexity": 2, "dependencies": [10], "skills_required": { "python": 3 } },
    { "id": 17, "name": "T17", "effort": 6,  "complexity": 3, "dependencies": [13], "skills_required": { "sql": 4 } },
    { "id": 18, "name": "T18", "effort": 5,  "complexity": 2, "dependencies": [9], "skills_required": { "javascript": 3 } },
    { "id": 19, "name": "T19", "effort": 4,  "complexity": 2, "dependencies": [15], "skills_required": { "css": 2 } },
    { "id": 20, "name": "T20", "effort": 6,  "complexity": 3, "dependencies": [16, 17, 18, 19], "skills_required": { "python": 4 } }
  ],
  "developers": [
    {
      "id": 1,
      "name": "Alice",
      "capacity": 32,
      "skill_levels": { "python": 5, "sql": 4, "git": 3 },
      "cost_per_hour": 25
    },
    {
      "id": 2,
      "name": "Bob",
      "capacity": 30,
      "skill_levels": { "html": 4, "css": 4, "javascript": 3 },
      "cost_per_hour": 22
    },
    {
      "id": 3,
      "name": "Charlie",
      "capacity": 28,
      "skill_levels": { "python": 3, "javascript": 5, "git": 4 },
      "cost_per_hour": 23
    },
    {
      "id": 4,
      "name": "Dana",
      "capacity": 36,
      "skill_levels": { "sql": 5, "css": 3, "html": 3 },
      "cost_per_hour": 27
    },
    {
      "id": 5,
      "name": "Eve",
      "capacity": 30,
      "skill_levels": { "python": 4, "sql": 3, "javascript": 2 },
      "cost_per_hour": 24
    }
  ],
  "config": {
    "population": 100,
    "generations": 300,
    "mutation": 0.2,
    "crossover": 0.8,
    "tournament": 3,
    "weights": {
      "makespan": 0.5,
      "variance": 0.25,
      "skill": 0.2,
      "cost": 0.05
    }
  }
}



Json no válido:
{
  "tasks": [
    {
      "id": 1,
      "name": "Task A",
      "effort": 12,
      "complexity": 4,
      "dependencies": [2],
      "skills_required": { "go": 7 }
    },
    {
      "id": 2,
      "name": "Task B",
      "effort": 10,
      "complexity": 4,
      "dependencies": [1],
      "skills_required": { "go": 8 }
    }
  ],
  "developers": [
    {
      "id": 1,
      "name": "Charlie",
      "capacity": 16,
      "skill_levels": { "go": 4 },
      "cost_per_hour": 30
    }
  ],
  "config": { "generations": 100 }
}
