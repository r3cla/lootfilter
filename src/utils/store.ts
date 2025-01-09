import { create } from 'zustand';
import { FilterRule } from './types';

type State = {
  resetRules: () => void;
  rules: FilterRule[];
  addRule: (rule: Omit<FilterRule, 'id'>) => void;
  updateRule: (id: string, rule: Partial<FilterRule>) => void;
  deleteRule: (id: string) => void;
  reorderRules: (oldIndex: number, newIndex: number) => void;
};

export const useStore = create<State>((set) => ({
  resetRules: () => set({ rules: [] }),
  rules: [],
  addRule: (rule) =>
    set((state) => ({
      rules: [...state.rules, { ...rule, id: Math.random().toString(36).substr(2, 9) }],
    })),
  updateRule: (id, rule) =>
    set((state) => ({
      rules: state.rules.map((r) => (r.id === id ? { ...r, ...rule } : r)),
    })),
  deleteRule: (id) =>
    set((state) => ({
      rules: state.rules.filter((r) => r.id !== id),
    })),
  reorderRules: (oldIndex, newIndex) =>
    set((state) => {
      const rules = [...state.rules];
      const [removed] = rules.splice(oldIndex, 1);
      rules.splice(newIndex, 0, removed);
      return { rules };
    }),
}));
