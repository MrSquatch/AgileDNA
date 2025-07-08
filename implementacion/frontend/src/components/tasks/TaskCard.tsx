import React from "react";
import type { TaskData } from "../../types/task";

interface TaskCardProps {
  title: string;
  description: string;
  className?: string;
  task?: TaskData;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Roja': return 'bg-red-500 text-white';
    case 'Amarillo': return 'bg-yellow-500 text-black';
    case 'Verde': return 'bg-green-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const getComplexityColor = (complexity: number) => {
  if (complexity >= 5) return 'text-red-400';
  if (complexity >= 4) return 'text-orange-400';
  if (complexity >= 3) return 'text-yellow-400';
  return 'text-green-400';
};

const getEffortColor = (effort: number) => {
  if (effort >= 8) return 'text-red-400';
  if (effort >= 6) return 'text-orange-400';
  if (effort >= 4) return 'text-yellow-400';
  return 'text-green-400';
};

export const TaskCard: React.FC<TaskCardProps> = ({ title, description, className = "", task }) => (
  <div className={`bg-zinc-700 rounded-lg p-4 shadow text-left transition-all duration-150 cursor-grab hover:scale-[1.02] hover:shadow-lg hover:bg-zinc-600 border-l-4 ${task?.priority === 'Roja' ? 'border-l-red-500' : task?.priority === 'Amarillo' ? 'border-l-yellow-500' : 'border-l-green-500'} ${className}`}>
    {/* Header con título y prioridad */}
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h3 className="font-semibold text-sm text-white mb-1">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task?.priority || 'Verde')}`}>
            {task?.priority || 'Verde'}
          </span>
          <span className="text-xs text-zinc-400">ID: {task?.id}</span>
        </div>
      </div>
    </div>

    {/* Métricas principales */}
    <div className="grid grid-cols-2 gap-3 mb-3">
      <div className="bg-zinc-800 rounded p-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">Esfuerzo</span>
          <div className="flex items-center space-x-1">
            <span className={`text-xs font-bold ${getEffortColor(task?.effort || 0)}`}>
              {task?.effort || 0}h
            </span>
            <div className="flex space-x-0.5">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-1 h-1 rounded-full ${
                    (task?.effort || 0) >= level * 2 ? 'bg-current' : 'bg-zinc-600'
                  } ${getEffortColor(task?.effort || 0)}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-800 rounded p-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">Complejidad</span>
          <div className="flex items-center space-x-1">
            <span className={`text-xs font-bold ${getComplexityColor(task?.complexity || 0)}`}>
              {task?.complexity || 0}/5
            </span>
            <div className="flex space-x-0.5">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-1 h-1 rounded-full ${
                    (task?.complexity || 0) >= level ? 'bg-current' : 'bg-zinc-600'
                  } ${getComplexityColor(task?.complexity || 0)}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Habilidades requeridas */}
    {task?.skills_required && Object.keys(task.skills_required).length > 0 && (
      <div className="mb-3">
        <div className="text-xs text-zinc-400 mb-2">Habilidades requeridas:</div>
        <div className="flex flex-wrap gap-1">
          {Object.entries(task.skills_required).map(([skill, level]) => (
            <span
              key={skill}
              className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-medium"
              title={`${skill}: Nivel ${level}`}
            >
              {skill}: {level}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Dependencias */}
    {task?.dependencies && task.dependencies.length > 0 && (
      <div className="mb-3">
        <div className="text-xs text-zinc-400 mb-2">Dependencias:</div>
        <div className="flex flex-wrap gap-1">
          {task.dependencies.map((depId) => (
            <span
              key={depId}
              className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full font-medium"
            >
              T{depId}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
); 