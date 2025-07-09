import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { GeneticConfig } from '../services';

interface ConfigState {
  config: GeneticConfig;
  isLoaded: boolean;
  actions: {
    setConfig: (config: GeneticConfig) => void;
    resetConfig: () => void;
    setLoaded: (isLoaded: boolean) => void;
  };
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      config: {
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
      },
      isLoaded: false,
      actions: {
        setConfig: (newConfig) => set({ config: newConfig }),
        resetConfig: () =>
          set((state) => ({
            config: {
              ...state.config, // Keep existing config structure
              population: 100, // Reset values
              generations: 50,
              mutation: 0.01,
              crossover: 0.8,
              tournament: 2,
              weights: {
                makespan: 0.5,
                variance: 0.25,
                skill: 0.2,
                cost: 0.05
              }
            }
          })),
        setLoaded: (isLoaded) => set({ isLoaded })
      }
    }),
    {
      name: 'genetic-algorithm-config',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ config: state.config }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.actions.setLoaded(true);
        }
      }
    }
  )
);

export const useConfig = () => useConfigStore((state) => state.config);
export const useConfigActions = () => useConfigStore((state) => state.actions);
export const useIsConfigLoaded = () => useConfigStore((state) => state.isLoaded); 