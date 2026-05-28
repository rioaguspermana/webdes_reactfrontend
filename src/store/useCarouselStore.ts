import { CarouselItem } from '@/@types/carousel';
import auth from '@/@utils/auth_req';
import axios from 'axios';
import { create } from 'zustand';

interface CarouselState {
    carousels: CarouselItem[];
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;

    // Actions
    fetchPublicCarousels: () => Promise<void>;
    fetchCarousels: () => Promise<void>;
    createCarousel: (formData: FormData) => Promise<void>;
    updateCarousel: (id: string, formData: FormData) => Promise<void>;
    deleteCarousel: (id: string) => Promise<void>;
}

export const useCarouselStore = create<CarouselState>((set, get) => ({
    carousels: [],
    isLoading: false,
    error: null,
    successMessage: null,

    // GET ALL DATA
    fetchPublicCarousels: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<ApiResponse<CarouselItem[]>>('/api/carousel');
            if (response.data.success) {
                set({ carousels: response.data.data || [] });
            }
        } catch (err: any) {
            set({ error: err.response?.data?.message || 'Gagal memuat banner' });
        } finally {
            set({ isLoading: false });
        }
    },

    // GET ALL DATA
    fetchCarousels: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await auth.get<ApiResponse<CarouselItem[]>>('/api/backoffice/carousel/get-all');
            if (response.data.success) {
                set({ carousels: response.data.data || [] });
            }
        } catch (err: any) {
            set({ error: err.response?.data?.message || 'Gagal memuat banner' });
        } finally {
            set({ isLoading: false });
        }
    },

    // CREATE DATA
    createCarousel: async (formData: FormData) => {
        set({ isLoading: true, error: null });
        try {
            await auth.post<ApiResponse<CarouselItem>>('/api/backoffice/carousel/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Panggil fetch ulang agar state global langsung ter-update otomatis
            await get().fetchCarousels();
        } catch (err: any) {
            set({ error: err.response?.data?.message || 'Gagal menambahkan banner' });
            throw err;
        } finally {
            set({ isLoading: false });
        }
    },

    // UPDATE DATA
    updateCarousel: async (id: string, formData: FormData) => {
        set({ isLoading: true, error: null });
        try {
            await auth.put<ApiResponse<CarouselItem>>(`/api/backoffice/carousel/update/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            await get().fetchCarousels();
        } catch (err: any) {
            set({ error: err.response?.data?.message || 'Gagal memperbarui banner' });
            throw err;
        } finally {
            set({ isLoading: false });
        }
    },

    // DELETE DATA
    deleteCarousel: async (id: string) => {
        try {
            await auth.delete<ApiResponse<null>>(`/api/backoffice/carousel/delete/${id}`);
            // Optimistic update: langsung saring di lokal state supaya UI terasa sangat instan
            set((state) => ({
                carousels: state.carousels.filter((item) => item.id !== Number(id))
            }));
        } catch (err: any) {
            set({ error: err.response?.data?.message || 'Gagal menghapus banner' });
            throw err;
        }
    }
}));
