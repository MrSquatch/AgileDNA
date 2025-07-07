import React from 'react';
import { developers } from '../tasks/data';
import type { Developer } from '../../services';

export function DevsSection() {
  const getSkillColor = (level: number) => {
    if (level >= 4) return 'text-green-400';
    if (level >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Desarrolladores</h2>
        <div className="text-sm text-zinc-400">
          {developers.length} desarrolladores disponibles
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-zinc-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Estadísticas del Equipo</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {developers.length}
            </div>
            <div className="text-sm text-zinc-400">Desarrolladores</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              ${developers.reduce((sum, dev) => sum + dev.cost_per_hour, 0)}
            </div>
            <div className="text-sm text-zinc-400">Costo total/hora</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {developers.reduce((sum, dev) => sum + dev.capacity, 0)}
            </div>
            <div className="text-sm text-zinc-400">Capacidad total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {Math.round(developers.reduce((sum, dev) => sum + dev.cost_per_hour, 0) / developers.length)}
            </div>
            <div className="text-sm text-zinc-400">Costo promedio/hora</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((developer) => (
          <div key={developer.id} className="bg-zinc-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{developer.name}</h3>
              <div className="text-right">
                <div className="text-sm text-zinc-400">Costo/hora</div>
                <div className="text-lg font-bold text-green-400">${developer.cost_per_hour}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Capacidad</span>
                <span className="text-sm text-zinc-400">{developer.capacity} horas</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(developer.capacity / 40) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Habilidades</h4>
              <div className="space-y-2">
                {Object.entries(developer.skill_levels).map(([skill, level]) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{skill}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getSkillColor(level)}`}>
                        Nivel {level}
                      </span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            className={`w-2 h-2 rounded-full ${
                              star <= level ? 'bg-yellow-400' : 'bg-zinc-600'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 