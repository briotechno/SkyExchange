import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBettingStore = create(
  persist(
    (set) => ({
      stakes: [
        { label: '100', value: 100 },
        { label: '500', value: 500 },
        { label: '1,000', value: 1000 },
        { label: '5,000', value: 5000 },
        { label: '10,000', value: 10000 },
        { label: '25,000', value: 25000 },
      ],
      setStakes: (newStakes) => set({ stakes: newStakes }),
    }),
    {
      name: 'betting-storage',
    }
  )
);
