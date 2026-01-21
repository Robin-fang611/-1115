import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontType = 'default' | 'puhuiti' | 'deyihei';

interface ThemeState {
  isTextFlowEnabled: boolean;
  font: FontType;
  toggleTextFlow: () => void;
  setTextFlow: (enabled: boolean) => void;
  setFont: (font: FontType) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isTextFlowEnabled: true,
      font: 'default',
      toggleTextFlow: () => set((state) => ({ isTextFlowEnabled: !state.isTextFlowEnabled })),
      setTextFlow: (enabled) => set({ isTextFlowEnabled: enabled }),
      setFont: (font) => set({ font }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
