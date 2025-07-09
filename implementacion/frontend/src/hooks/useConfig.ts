import { useEffect } from 'react';
import { useConfigStore } from '../stores/configStore';
import type { GeneticConfig } from '../services';

export function useConfig(initialConfig?: GeneticConfig) {
  const { config, isLoaded, actions } = useConfigStore();

  useEffect(() => {
    // Si se provee una configuración inicial y no hemos cargado desde el storage,
    // la usamos para inicializar el estado.
    if (initialConfig && !isLoaded) {
      actions.setConfig(initialConfig);
    }
  }, [initialConfig, isLoaded, actions]);

  return {
    config,
    updateConfig: actions.setConfig,
    resetConfig: actions.resetConfig,
    isLoaded
  };
} 