import { useState, useEffect } from 'react';
import type { GeneticConfig } from '../services';

const CONFIG_STORAGE_KEY = 'genetic-algorithm-config';

export function useConfig(initialConfig: GeneticConfig) {
  const [config, setConfig] = useState<GeneticConfig>(initialConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar configuración desde localStorage al inicializar
  useEffect(() => {
    const savedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.warn('Error al cargar configuración guardada:', error);
        // Usar configuración por defecto si hay error
        setConfig(initialConfig);
      }
    }
    setIsLoaded(true);
  }, [initialConfig]);

  // Función para actualizar configuración
  const updateConfig = (newConfig: GeneticConfig) => {
    setConfig(newConfig);
    // Guardar en localStorage
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
  };

  // Función para resetear a configuración por defecto
  const resetConfig = () => {
    setConfig(initialConfig);
    localStorage.removeItem(CONFIG_STORAGE_KEY);
  };

  return {
    config,
    updateConfig,
    resetConfig,
    isLoaded
  };
} 