import { create } from 'zustand';
import type { ProfileDesaState } from '@/@types/profil_desa';

export const useProfileStore = create<ProfileDesaState>((set) => ({
    profilDesa: null,
    isLoading: false,
    error: null,

    fetchProfilDesa: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/profil-desa');
            const data = await response.json();

            set({ profilDesa: data, isLoading: false });
        } catch (err) {
            set({ error: 'Gagal mengambil data desa', isLoading: false });
        }
    },

    updateProfilDesa: async (dataBaru) => {
        set((state) => ({
            profilDesa: state.profilDesa ? { ...state.profilDesa, ...dataBaru } : null
        }));
    },

    clearProfileStore: () => set({ profilDesa: null, error: null }),
}));