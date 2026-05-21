import { create } from 'zustand';

interface UiState {
    isManagerOpen: boolean;
    openManager: () => void;
    closeManager: () => void;
}

export const useUiStore = create<UiState>((set) => ({
    isManagerOpen: false,
    openManager: () => set({ isManagerOpen: true }),
    closeManager: () => set({ isManagerOpen: false }),
}));
