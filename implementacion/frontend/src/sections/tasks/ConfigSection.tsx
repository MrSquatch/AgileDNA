import React from 'react';
import { geneticConfig } from './data';

export function ConfigSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Configuración del Algoritmo Genético</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parámetros del algoritmo */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Parámetros del Algoritmo</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Población</span>
              <span className="font-medium">{geneticConfig.population}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Generaciones</span>
              <span className="font-medium">{geneticConfig.generations}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Tasa de Mutación</span>
              <span className="font-medium">{(geneticConfig.mutation * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Tasa de Cruce</span>
              <span className="font-medium">{(geneticConfig.crossover * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Tamaño del Torneo</span>
              <span className="font-medium">{geneticConfig.tournament}</span>
            </div>
          </div>
        </div>

        {/* Pesos de la función objetivo */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Pesos de la Función Objetivo</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Makespan</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-zinc-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${geneticConfig.weights.makespan * 100}%` }}
                  ></div>
                </div>
                <span className="font-medium text-sm">{(geneticConfig.weights.makespan * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Varianza de Carga</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-zinc-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${geneticConfig.weights.variance * 100}%` }}
                  ></div>
                </div>
                <span className="font-medium text-sm">{(geneticConfig.weights.variance * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Coincidencia de Habilidades</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-zinc-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${geneticConfig.weights.skill * 100}%` }}
                  ></div>
                </div>
                <span className="font-medium text-sm">{(geneticConfig.weights.skill * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Costo</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-zinc-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${geneticConfig.weights.cost * 100}%` }}
                  ></div>
                </div>
                <span className="font-medium text-sm">{(geneticConfig.weights.cost * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
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
    </div>
  );
} 