import type { Task, Developer, GeneticConfig } from '../../services';

export const tasks: Task[] = [
  { id: 1, name: "Setup Repo", effort: 4, complexity: 2, dependencies: [], skills_required: { git: 2 }, priority: "Roja" },
  { id: 2, name: "Init CI/CD", effort: 6, complexity: 3, dependencies: [1], skills_required: { git: 3, python: 2 }, priority: "Amarillo" },
  { id: 3, name: "Design DB Schema", effort: 5, complexity: 4, dependencies: [], skills_required: { sql: 4 }, priority: "Roja" },
  { id: 4, name: "Create API Skeleton", effort: 6, complexity: 4, dependencies: [2, 3], skills_required: { python: 4 }, priority: "Roja" },
  { id: 5, name: "Frontend Layout", effort: 3, complexity: 2, dependencies: [], skills_required: { html: 2 }, priority: "Verde" },
  { id: 6, name: "Implement Auth API", effort: 8, complexity: 5, dependencies: [4], skills_required: { python: 5 }, priority: "Roja" },
  { id: 7, name: "User Registration UI", effort: 4, complexity: 2, dependencies: [5], skills_required: { html: 2, css: 2 }, priority: "Amarillo" },
  { id: 8, name: "Style Login Page", effort: 3, complexity: 1, dependencies: [7], skills_required: { css: 2 }, priority: "Verde" },
  { id: 9, name: "Connect Frontend to API", effort: 5, complexity: 3, dependencies: [6, 7], skills_required: { javascript: 3 }, priority: "Amarillo" },
  { id: 10, name: "Session Management", effort: 6, complexity: 4, dependencies: [9], skills_required: { python: 4 }, priority: "Roja" },
  { id: 11, name: "Database Seeding", effort: 4, complexity: 3, dependencies: [3], skills_required: { sql: 3 }, priority: "Amarillo" },
  { id: 12, name: "Testing Suite", effort: 5, complexity: 3, dependencies: [6], skills_required: { python: 3 }, priority: "Amarillo" },
  { id: 13, name: "Email Notifications", effort: 5, complexity: 3, dependencies: [6], skills_required: { python: 3 }, priority: "Verde" },
  { id: 14, name: "Admin Panel", effort: 7, complexity: 4, dependencies: [9], skills_required: { html: 3, javascript: 4 }, priority: "Roja" },
  { id: 15, name: "User Dashboard", effort: 6, complexity: 4, dependencies: [9], skills_required: { javascript: 3 }, priority: "Amarillo" },
  { id: 16, name: "Data Analytics Module", effort: 8, complexity: 5, dependencies: [14, 15], skills_required: { python: 5, sql: 4 }, priority: "Verde" },
  { id: 17, name: "Settings Page", effort: 4, complexity: 2, dependencies: [14], skills_required: { html: 2 }, priority: "Verde" },
  { id: 18, name: "Notifications Panel", effort: 4, complexity: 2, dependencies: [14], skills_required: { html: 2, css: 2 }, priority: "Verde" },
  { id: 19, name: "Log Out Feature", effort: 2, complexity: 1, dependencies: [10], skills_required: { javascript: 2 }, priority: "Verde" },
  { id: 20, name: "System Monitoring", effort: 6, complexity: 4, dependencies: [16], skills_required: { python: 4, sql: 3 }, priority: "Amarillo" }
];

export const developers: Developer[] = [
  { id: 1, name: "Alice", capacity: 40, skill_levels: { git: 4, python: 5, sql: 3 }, cost_per_hour: 28 },
  { id: 2, name: "Bob", capacity: 36, skill_levels: { git: 3, html: 3, css: 2 }, cost_per_hour: 25 },
  { id: 3, name: "Charlie", capacity: 30, skill_levels: { python: 3, sql: 5 }, cost_per_hour: 26 },
  { id: 4, name: "Dana", capacity: 32, skill_levels: { html: 4, css: 3, javascript: 3 }, cost_per_hour: 24 },
  { id: 5, name: "Eve", capacity: 30, skill_levels: { javascript: 4, html: 2 }, cost_per_hour: 27 },
  { id: 6, name: "Frank", capacity: 28, skill_levels: { python: 4, sql: 4 }, cost_per_hour: 29 },
  { id: 7, name: "Grace", capacity: 34, skill_levels: { html: 3, css: 3 }, cost_per_hour: 23 },
  { id: 8, name: "Heidi", capacity: 36, skill_levels: { git: 2, javascript: 2, css: 2 }, cost_per_hour: 26 },
  { id: 9, name: "Ivan", capacity: 38, skill_levels: { python: 4, git: 3 }, cost_per_hour: 30 },
  { id: 10, name: "Judy", capacity: 32, skill_levels: { sql: 4, python: 5 }, cost_per_hour: 27 }
];

export const geneticConfig: GeneticConfig = {
  population: 300,
  generations: 700,
  mutation: 0.2,
  crossover: 0.8,
  tournament: 3,
  weights: {
    makespan: 0.5,
    variance: 0.25,
    skill: 0.2,
    cost: 0.05
  }
}; 