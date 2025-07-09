import React, { useState } from 'react';
import { apiService, type AssignmentResult, type Task, type Developer, type GeneticConfig } from '../../services';
import { tasks, developers, geneticConfig } from './data';
import { useConfig } from '../../hooks/useConfig';

export function GeneticResults() {
  const { config } = useConfig(geneticConfig);
  const [result, setResult] = useState<AssignmentResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const runOptimization = async () => {
    setIsOptimizing(true);
    setProgress(0);
    setError(null);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 99));
    }, 50);
    
    try {
      // Preparar los datos para enviar a la API
      const request = {
        tasks,
        developers,
        config: config
      };

      // Intentar llamar a la API real primero
      let optimizationResult: AssignmentResult;
      try {
        optimizationResult = await apiService.optimizeAssignment(request);
      } catch (apiError) {
        console.log('API no disponible, usando simulación...');
        // Si la API no está disponible, usar simulación
        optimizationResult = await apiService.simulateOptimization(request);
      }
      
      setResult(optimizationResult);
    } catch (error) {
      console.error('Optimization failed:', error);
      setError('Error al ejecutar la optimización. Por favor, inténtalo de nuevo.');
    } finally {
      clearInterval(progressInterval);
      setProgress(100);
      setIsOptimizing(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Roja': return 'bg-red-500';
      case 'Amarillo': return 'bg-yellow-500';
      case 'Verde': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (isOptimizing) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold mb-2">Optimizando asignación de tareas...</h3>
            <p className="text-sm text-zinc-400">Ejecutando algoritmo genético</p>
          </div>
          <div className="w-full bg-zinc-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-sm text-zinc-400">
            {progress}% completado
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Error en la optimización</h3>
          <p className="text-sm text-zinc-400 mb-6">{error}</p>
          <button
            onClick={runOptimization}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Optimización de Asignación de Tareas</h3>
          <p className="text-sm text-zinc-400 mb-6">
            Ejecuta el algoritmo genético para optimizar la asignación de tareas a desarrolladores
          </p>
          <button
            onClick={runOptimization}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Ejecutar Optimización
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-zinc-400 mb-1">Makespan</h4>
          <p className="text-2xl font-bold">{result.details.makespan} horas</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-zinc-400 mb-1">Costo Total</h4>
          <p className="text-2xl font-bold">${result.details.cost_total.toFixed(0)}</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-zinc-400 mb-1">Varianza de Carga</h4>
          <p className="text-2xl font-bold">{result.details.load_variance.toFixed(2)}</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-zinc-400 mb-1">Penalización Habilidades</h4>
          <p className="text-2xl font-bold">{result.details.penalty_skill}</p>
        </div>
      </div>

      {/* Task Assignments */}
      <div className="bg-zinc-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Asignaciones de Tareas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(result.assignment).map((task) => (
            <div key={task.id} className="bg-zinc-700 p-4 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm">{task.name}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <div className="space-y-1 text-xs text-zinc-400">
                <p><span className="font-medium">Desarrollador:</span> {task.developer}</p>
                <p><span className="font-medium">Inicio:</span> hora {task.start}</p>
                <p><span className="font-medium">Fin:</span> hora {task.finish}</p>
                <p><span className="font-medium">Duración:</span> {task.finish - task.start} horas</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sprints */}
      <div className="bg-zinc-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Sprints</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(result.sprints).map(([sprintNum, tasks]) => (
            <div key={sprintNum} className="bg-zinc-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Sprint {sprintNum}</h4>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-zinc-600 p-2 rounded text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{task.name}</span>
                      <span className={`px-1 py-0.5 rounded text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-zinc-400">{task.developer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer Load */}
      <div className="bg-zinc-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Carga de Desarrolladores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(result.details.dev_effort).map(([devId, effort]) => {
            const developer = developers.find(d => d.id.toString() === devId);
            const capacity = developer?.capacity || 0;
            const percentage = (effort / capacity) * 100;
            
            return (
              <div key={devId} className="bg-zinc-700 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{developer?.name || `Dev ${devId}`}</h4>
                  <span className="text-sm text-zinc-400">{effort}/{capacity}</span>
                </div>
                <div className="w-full bg-zinc-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  {percentage.toFixed(1)}% de capacidad
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Re-run button */}
      <div className="text-center">
        <button
          onClick={runOptimization}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Ejecutar Nueva Optimización
        </button>
      </div>
    </div>
  );
} 