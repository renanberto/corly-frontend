import { create } from 'zustand';

interface UiPreferencesState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  density: 'comfortable' | 'compact';
  toggleSidebar: () => void;
  setSidebarCollapsed: (value: boolean) => void;
  setTheme: (value: 'light' | 'dark') => void;
  setDensity: (value: 'comfortable' | 'compact') => void;
}

export const uiStore = create<UiPreferencesState>((set) => ({
  sidebarCollapsed: false,
  theme: 'light',
  density: 'comfortable',
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (value) => set({ sidebarCollapsed: value }),
  setTheme: (value) => set({ theme: value }),
  setDensity: (value) => set({ density: value })
}));
