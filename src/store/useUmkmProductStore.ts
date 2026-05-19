import { create } from 'zustand';
import axios from 'axios';
import type { UmkmProduct, PaginatedProductResponse } from '@/@types/umkm';

interface ProductState {
    products: UmkmProduct[];
    currentPage: number;
    totalPages: number;
    search: string;
    isLoading: boolean;
    error: string | null;

    // Actions
    setSearch: (query: string) => void;
    setCurrentPage: (page: number) => void;
    fetchProducts: () => Promise<void>;
}

export const useUmkmProductStore = create<ProductState>((set, get) => ({
    products: [],
    currentPage: 1,
    totalPages: 1,
    search: '',
    isLoading: false,
    error: null,

    setSearch: (query) => {
        // Reset halaman kembali ke 1 setiap kali user mengetik pencarian baru
        set({ search: query, currentPage: 1 });
        get().fetchProducts(); // Pemicu fetch otomatis
    },

    setCurrentPage: (page) => {
        set({ currentPage: page });
        get().fetchProducts(); // Pemicu fetch saat ganti angka halaman
    },

    fetchProducts: async () => {
        const { currentPage, search } = get();
        set({ isLoading: true, error: null });

        try {
            // Menembak API Go dengan menyertakan query params ?page=...&limit=...&search=...
            const response = await axios.get<PaginatedProductResponse>('/api/umkm-product', {
                params: {
                    page: currentPage,
                    limit: 6, // Jumlah item per halaman, sesuaikan kebutuhan
                    search: search
                }
            });

            set({
                products: response.data.data,
                totalPages: response.data.pagination.total_pages,
                isLoading: false
            });
        } catch (err) {
            set({ error: 'Gagal memuat data produk dari server Go', isLoading: false });
        }
    }
}));
