export interface Task {
  id: number;
  name: string;
  effort: number;
  complexity: number;
  dependencies: number[];
  skills_required: Record<string, number>;
  priority: string;
}

export interface Developer {
  id: number;
  name: string;
  capacity: number;
  skill_levels: Record<string, number>;
  cost_per_hour: number;
}

export interface GeneticConfig {
  population: number;
  generations: number;
  mutation: number;
  crossover: number;
  tournament: number;
  weights: {
    makespan: number;
    variance: number;
    skill: number;
    cost: number;
  };
}

export interface TaskAssignment {
  id: number;
  name: string;
  developer: string;
  start: number;
  finish: number;
  priority: string;
}

export interface AssignmentResult {
  assignment: Record<string, TaskAssignment>;
  details: {
    makespan: number;
    cost_total: number;
    load_variance: number;
    penalty_skill: number;
    penalty_capacity: number;
    invalid: boolean;
    task_start: Record<string, number>;
    task_finish: Record<string, number>;
    dev_effort: Record<string, number>;
  };
  sprints: Record<string, TaskAssignment[]>;
  weights: {
    makespan: number;
    variance: number;
    skill: number;
    cost: number;
  };
}

export interface OptimizationRequest {
  tasks: Task[];
  developers: Developer[];
  config: GeneticConfig;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    // Cambiar esta URL por la URL de tu API externa
    this.baseUrl = 'http://127.0.0.1:5000/optimize';
  }

  async optimizeAssignment(request: OptimizationRequest): Promise<AssignmentResult> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error calling optimization API:', error);
      throw error;
    }
  }

  // Método para simular la respuesta cuando la API no está disponible
  async simulateOptimization(request: OptimizationRequest): Promise<AssignmentResult> {
    // Simular delay de la API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Retornar datos de ejemplo basados en la estructura que proporcionaste
    return {
      assignment: {
        "1": {
          "developer": "Heidi",
          "finish": 4,
          "id": 1,
          "name": "Setup Repo",
          "priority": "Roja",
          "start": 0
        },
        "2": {
          "developer": "Bob",
          "finish": 10,
          "id": 2,
          "name": "Init CI/CD",
          "priority": "Amarillo",
          "start": 4
        },
        "3": {
          "developer": "Charlie",
          "finish": 5,
          "id": 3,
          "name": "Design DB Schema",
          "priority": "Roja",
          "start": 0
        },
        "4": {
          "developer": "Judy",
          "finish": 16,
          "id": 4,
          "name": "Create API Skeleton",
          "priority": "Roja",
          "start": 10
        },
        "5": {
          "developer": "Heidi",
          "finish": 7,
          "id": 5,
          "name": "Frontend Layout",
          "priority": "Verde",
          "start": 4
        },
        "6": {
          "developer": "Alice",
          "finish": 24,
          "id": 6,
          "name": "Implement Auth API",
          "priority": "Roja",
          "start": 16
        },
        "7": {
          "developer": "Grace",
          "finish": 11,
          "id": 7,
          "name": "User Registration UI",
          "priority": "Amarillo",
          "start": 7
        },
        "8": {
          "developer": "Charlie",
          "finish": 14,
          "id": 8,
          "name": "Style Login Page",
          "priority": "Verde",
          "start": 11
        },
        "9": {
          "developer": "Eve",
          "finish": 29,
          "id": 9,
          "name": "Connect Frontend to API",
          "priority": "Amarillo",
          "start": 24
        },
        "10": {
          "developer": "Ivan",
          "finish": 35,
          "id": 10,
          "name": "Session Management",
          "priority": "Roja",
          "start": 29
        },
        "11": {
          "developer": "Charlie",
          "finish": 9,
          "id": 11,
          "name": "Database Seeding",
          "priority": "Amarillo",
          "start": 5
        },
        "12": {
          "developer": "Frank",
          "finish": 29,
          "id": 12,
          "name": "Testing Suite",
          "priority": "Amarillo",
          "start": 24
        },
        "13": {
          "developer": "Ivan",
          "finish": 29,
          "id": 13,
          "name": "Email Notifications",
          "priority": "Verde",
          "start": 24
        },
        "14": {
          "developer": "Dana",
          "finish": 36,
          "id": 14,
          "name": "Admin Panel",
          "priority": "Roja",
          "start": 29
        },
        "15": {
          "developer": "Eve",
          "finish": 35,
          "id": 15,
          "name": "User Dashboard",
          "priority": "Amarillo",
          "start": 29
        },
        "16": {
          "developer": "Judy",
          "finish": 44,
          "id": 16,
          "name": "Data Analytics Module",
          "priority": "Verde",
          "start": 36
        },
        "17": {
          "developer": "Bob",
          "finish": 40,
          "id": 17,
          "name": "Settings Page",
          "priority": "Verde",
          "start": 36
        },
        "18": {
          "developer": "Dana",
          "finish": 40,
          "id": 18,
          "name": "Notifications Panel",
          "priority": "Verde",
          "start": 36
        },
        "19": {
          "developer": "Grace",
          "finish": 37,
          "id": 19,
          "name": "Log Out Feature",
          "priority": "Verde",
          "start": 35
        },
        "20": {
          "developer": "Frank",
          "finish": 50,
          "id": 20,
          "name": "System Monitoring",
          "priority": "Amarillo",
          "start": 44
        }
      },
      details: {
        cost_total: 2694.0,
        dev_effort: {
          "1": 8,
          "2": 10,
          "3": 12,
          "4": 11,
          "5": 11,
          "6": 11,
          "7": 6,
          "8": 7,
          "9": 11,
          "10": 14
        },
        invalid: false,
        load_variance: 5.29,
        makespan: 50,
        penalty_capacity: 0.0,
        penalty_skill: 18.0,
        task_finish: {
          "1": 4,
          "2": 10,
          "3": 5,
          "4": 16,
          "5": 7,
          "6": 24,
          "7": 11,
          "8": 14,
          "9": 29,
          "10": 35,
          "11": 9,
          "12": 29,
          "13": 29,
          "14": 36,
          "15": 35,
          "16": 44,
          "17": 40,
          "18": 40,
          "19": 37,
          "20": 50
        },
        task_start: {
          "1": 0,
          "2": 4,
          "3": 0,
          "4": 10,
          "5": 4,
          "6": 16,
          "7": 7,
          "8": 11,
          "9": 24,
          "10": 29,
          "11": 5,
          "12": 24,
          "13": 24,
          "14": 29,
          "15": 29,
          "16": 36,
          "17": 36,
          "18": 36,
          "19": 35,
          "20": 44
        }
      },
      sprints: {
        "1": [
          {
            "developer": "Heidi",
            "finish": 4,
            "id": 1,
            "name": "Setup Repo",
            "priority": "Roja",
            "start": 0
          },
          {
            "developer": "Charlie",
            "finish": 5,
            "id": 3,
            "name": "Design DB Schema",
            "priority": "Roja",
            "start": 0
          },
          {
            "developer": "Judy",
            "finish": 16,
            "id": 4,
            "name": "Create API Skeleton",
            "priority": "Roja",
            "start": 10
          },
          {
            "developer": "Alice",
            "finish": 24,
            "id": 6,
            "name": "Implement Auth API",
            "priority": "Roja",
            "start": 16
          },
          {
            "developer": "Bob",
            "finish": 10,
            "id": 2,
            "name": "Init CI/CD",
            "priority": "Amarillo",
            "start": 4
          },
          {
            "developer": "Charlie",
            "finish": 9,
            "id": 11,
            "name": "Database Seeding",
            "priority": "Amarillo",
            "start": 5
          },
          {
            "developer": "Grace",
            "finish": 11,
            "id": 7,
            "name": "User Registration UI",
            "priority": "Amarillo",
            "start": 7
          },
          {
            "developer": "Heidi",
            "finish": 7,
            "id": 5,
            "name": "Frontend Layout",
            "priority": "Verde",
            "start": 4
          },
          {
            "developer": "Charlie",
            "finish": 14,
            "id": 8,
            "name": "Style Login Page",
            "priority": "Verde",
            "start": 11
          }
        ],
        "2": [
          {
            "developer": "Ivan",
            "finish": 35,
            "id": 10,
            "name": "Session Management",
            "priority": "Roja",
            "start": 29
          },
          {
            "developer": "Dana",
            "finish": 36,
            "id": 14,
            "name": "Admin Panel",
            "priority": "Roja",
            "start": 29
          },
          {
            "developer": "Eve",
            "finish": 29,
            "id": 9,
            "name": "Connect Frontend to API",
            "priority": "Amarillo",
            "start": 24
          },
          {
            "developer": "Frank",
            "finish": 29,
            "id": 12,
            "name": "Testing Suite",
            "priority": "Amarillo",
            "start": 24
          },
          {
            "developer": "Eve",
            "finish": 35,
            "id": 15,
            "name": "User Dashboard",
            "priority": "Amarillo",
            "start": 29
          },
          {
            "developer": "Ivan",
            "finish": 29,
            "id": 13,
            "name": "Email Notifications",
            "priority": "Verde",
            "start": 24
          },
          {
            "developer": "Grace",
            "finish": 37,
            "id": 19,
            "name": "Log Out Feature",
            "priority": "Verde",
            "start": 35
          }
        ],
        "3": [
          {
            "developer": "Frank",
            "finish": 50,
            "id": 20,
            "name": "System Monitoring",
            "priority": "Amarillo",
            "start": 44
          },
          {
            "developer": "Bob",
            "finish": 40,
            "id": 17,
            "name": "Settings Page",
            "priority": "Verde",
            "start": 36
          },
          {
            "developer": "Dana",
            "finish": 40,
            "id": 18,
            "name": "Notifications Panel",
            "priority": "Verde",
            "start": 36
          },
          {
            "developer": "Judy",
            "finish": 44,
            "id": 16,
            "name": "Data Analytics Module",
            "priority": "Verde",
            "start": 36
          }
        ]
      },
      weights: {
        cost: 0.05,
        makespan: 0.5,
        skill: 0.2,
        variance: 0.25
      }
    };
  }
}

export const apiService = new ApiService(); 