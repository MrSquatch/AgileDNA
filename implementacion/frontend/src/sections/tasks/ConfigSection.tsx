import React, { useState } from 'react';
import { geneticConfig } from './data';
import { useConfig } from '../../hooks/useConfig';

export function ConfigSection() {
  const { config, updateConfig, resetConfig, isLoaded } = useConfig(geneticConfig);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [tempConfig, setTempConfig] = useState(config);

  // Actualizar tempConfig cuando config cambie
  React.useEffect(() => {
    setTempConfig(config);
  }, [config]);

  const handleConfigChange = (section: string, key: string, value: number) => {
    setTempConfig(prev => {
      if (section === 'weights') {
        return {
          ...prev,
          weights: {
            ...prev.weights,
            [key]: value
          }
        };
      } else {
        return {
          ...prev,
          [section]: value
        };
      }
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    updateConfig(tempConfig);
    setIsEditing(false);
    setHasChanges(false);
    // Opcional: Mostrar mensaje de éxito
    alert('Configuración guardada exitosamente');
  };

  const handleCancel = () => {
    setTempConfig(config);
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleReset = () => {
    resetConfig();
    setIsEditing(false);
    setHasChanges(false);
    alert('Configuración restablecida a valores por defecto');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Roja': return 'bg-red-500';
      case 'Amarillo': return 'bg-yellow-500';
      case 'Verde': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Configuración del Algoritmo Genético</h2>
        <div className="flex space-x-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Editar Configuración
              </button>
              <button
                onClick={handleReset}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Restablecer
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  hasChanges 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parámetros del algoritmo */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Parámetros del Algoritmo</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Población</label>
              {isEditing ? (
                                 <input
                   type="number"
                   min="50"
                   max="1000"
                   value={tempConfig.population}
                   onChange={(e) => handleConfigChange('population', 'population', parseInt(e.target.value))}
                   className="bg-zinc-700 text-white px-3 py-1 rounded text-sm w-20"
                 />
               ) : (
                 <span className="font-medium">{tempConfig.population}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Generaciones</label>
              {isEditing ? (
                <input
                  type="number"
                  min="100"
                  max="2000"
                                     value={tempConfig.generations}
                   onChange={(e) => handleConfigChange('generations', 'generations', parseInt(e.target.value))}
                   className="bg-zinc-700 text-white px-3 py-1 rounded text-sm w-20"
                 />
               ) : (
                 <span className="font-medium">{tempConfig.generations}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Tasa de Mutación</label>
              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                                     value={tempConfig.mutation}
                   onChange={(e) => handleConfigChange('mutation', 'mutation', parseFloat(e.target.value))}
                   className="bg-zinc-700 text-white px-3 py-1 rounded text-sm w-20"
                 />
               ) : (
                 <span className="font-medium">{(tempConfig.mutation * 100).toFixed(1)}%</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Tasa de Cruce</label>
              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                                     value={tempConfig.crossover}
                   onChange={(e) => handleConfigChange('crossover', 'crossover', parseFloat(e.target.value))}
                   className="bg-zinc-700 text-white px-3 py-1 rounded text-sm w-20"
                 />
               ) : (
                 <span className="font-medium">{(tempConfig.crossover * 100).toFixed(1)}%</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Tamaño del Torneo</label>
              {isEditing ? (
                <input
                  type="number"
                  min="2"
                  max="10"
                                     value={tempConfig.tournament}
                   onChange={(e) => handleConfigChange('tournament', 'tournament', parseInt(e.target.value))}
                   className="bg-zinc-700 text-white px-3 py-1 rounded text-sm w-20"
                 />
               ) : (
                 <span className="font-medium">{tempConfig.tournament}</span>
              )}
            </div>
          </div>
        </div>

        {/* Pesos de la función objetivo */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Pesos de la Función Objetivo</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Makespan</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-zinc-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                                         style={{ width: `${tempConfig.weights.makespan * 100}%` }}
                   ></div>
                 </div>
                 {isEditing ? (
                   <input
                     type="number"
                     min="0"
                     max="1"
                     step="0.05"
                     value={tempConfig.weights.makespan}
                     onChange={(e) => handleConfigChange('weights', 'makespan', parseFloat(e.target.value))}
                     className="bg-zinc-700 text-white px-2 py-1 rounded text-xs w-16"
                   />
                 ) : (
                   <span className="font-medium text-sm">{(tempConfig.weights.makespan * 100).toFixed(0)}%</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Varianza de Carga</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-zinc-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                                         style={{ width: `${tempConfig.weights.variance * 100}%` }}
                   ></div>
                 </div>
                 {isEditing ? (
                   <input
                     type="number"
                     min="0"
                     max="1"
                     step="0.05"
                     value={tempConfig.weights.variance}
                     onChange={(e) => handleConfigChange('weights', 'variance', parseFloat(e.target.value))}
                     className="bg-zinc-700 text-white px-2 py-1 rounded text-xs w-16"
                   />
                 ) : (
                   <span className="font-medium text-sm">{(tempConfig.weights.variance * 100).toFixed(0)}%</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Coincidencia de Habilidades</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-zinc-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                                         style={{ width: `${tempConfig.weights.skill * 100}%` }}
                   ></div>
                 </div>
                 {isEditing ? (
                   <input
                     type="number"
                     min="0"
                     max="1"
                     step="0.05"
                     value={tempConfig.weights.skill}
                     onChange={(e) => handleConfigChange('weights', 'skill', parseFloat(e.target.value))}
                     className="bg-zinc-700 text-white px-2 py-1 rounded text-xs w-16"
                   />
                 ) : (
                   <span className="font-medium text-sm">{(tempConfig.weights.skill * 100).toFixed(0)}%</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Costo</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-zinc-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                                         style={{ width: `${tempConfig.weights.cost * 100}%` }}
                   ></div>
                 </div>
                 {isEditing ? (
                   <input
                     type="number"
                     min="0"
                     max="1"
                     step="0.05"
                     value={tempConfig.weights.cost}
                     onChange={(e) => handleConfigChange('weights', 'cost', parseFloat(e.target.value))}
                     className="bg-zinc-700 text-white px-2 py-1 rounded text-xs w-16"
                   />
                 ) : (
                   <span className="font-medium text-sm">{(tempConfig.weights.cost * 100).toFixed(0)}%</span>
                )}
              </div>
            </div>
          </div>
          
                     {/* Validación de pesos */}
           {isEditing && (
             <div className="mt-4 p-3 rounded bg-zinc-700">
               <div className="text-xs text-zinc-400 mb-2">Suma total de pesos: {(tempConfig.weights.makespan + tempConfig.weights.variance + tempConfig.weights.skill + tempConfig.weights.cost).toFixed(2)}</div>
               {(tempConfig.weights.makespan + tempConfig.weights.variance + tempConfig.weights.skill + tempConfig.weights.cost) !== 1 && (
                 <div className="text-xs text-yellow-400">
                   ⚠️ La suma de pesos debe ser 1.0 para una optimización correcta
                 </div>
               )}
             </div>
           )}
        </div>
      </div>

      {/* Descripción de los objetivos */}
      <div className="bg-zinc-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Objetivos de Optimización</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-sm">Makespan</h4>
                <p className="text-xs text-zinc-400">Minimizar el tiempo total de ejecución del proyecto</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-sm">Varianza de Carga</h4>
                <p className="text-xs text-zinc-400">Distribuir la carga de trabajo de manera equilibrada</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-sm">Coincidencia de Habilidades</h4>
                <p className="text-xs text-zinc-400">Asignar tareas a desarrolladores con habilidades apropiadas</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-sm">Costo</h4>
                <p className="text-xs text-zinc-400">Minimizar el costo total del proyecto</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-zinc-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Información Adicional</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-400">
          <div>
            <h4 className="font-medium text-white mb-2">Parámetros del Algoritmo</h4>
            <ul className="space-y-1 text-xs">
              <li>• <strong>Población:</strong> Número de soluciones candidatas en cada generación</li>
              <li>• <strong>Generaciones:</strong> Número de iteraciones del algoritmo</li>
              <li>• <strong>Mutación:</strong> Probabilidad de cambiar aleatoriamente un gen</li>
              <li>• <strong>Cruce:</strong> Probabilidad de combinar dos soluciones padre</li>
              <li>• <strong>Torneo:</strong> Número de candidatos en la selección por torneo</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Pesos de la Función Objetivo</h4>
            <ul className="space-y-1 text-xs">
              <li>• <strong>Makespan:</strong> Tiempo total del proyecto (50% por defecto)</li>
              <li>• <strong>Varianza:</strong> Distribución equilibrada de carga (25% por defecto)</li>
              <li>• <strong>Habilidades:</strong> Coincidencia de competencias (20% por defecto)</li>
              <li>• <strong>Costo:</strong> Minimización de costos (5% por defecto)</li>
              <li>• <strong>Nota:</strong> La suma de pesos debe ser 1.0</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 