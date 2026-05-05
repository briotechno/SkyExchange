import { create } from 'zustand';

export const useRacingStore = create((set) => ({
  selectedEid: null,
  setSelectedEid: (eid) => set({ selectedEid: eid }),
  clearSelectedEid: () => set({ selectedEid: null }),
}));
