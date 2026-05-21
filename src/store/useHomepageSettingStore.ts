import { HomepageSetting } from '@/@types/homepage_setting';
import api from '@/@utils/api';
import axios from 'axios';
import { create } from 'zustand';

interface HomepageState {
    homepageSetting: HomepageSetting | null;
    isLoading: boolean;
    isSaving: boolean;
    error: string | null;

    // Actions
    fetchPublicHomepageSetting: () => Promise<void>;
    fetchHomepageSetting: () => Promise<void>;
    updateFieldDinamic: (key: keyof Omit<HomepageSetting, 'id' | 'sambutan_kepdes_image'>, value: string) => Promise<void>;
    uploadImage: (file: File) => Promise<string | null>;
}

export const useHomepageStore = create<HomepageState>((set) => ({
    homepageSetting: null,
    isLoading: false,
    isSaving: false,
    error: null,

    // 1. AMBIL SELURUH DATA HOMEPAGE (GET)
    fetchPublicHomepageSetting: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<HomepageSetting>('/api/homepage-setting');
            set({ homepageSetting: response.data });
        } catch (err: any) {
            set({ error: err.response?.data?.message || 'Gagal memuat data pengaturan halaman utama' });
        } finally {
            set({ isLoading: false });
        }
    },

    // 1. AMBIL SELURUH DATA HOMEPAGE (GET)
    fetchHomepageSetting: async () => {
        set({ isLoading: true, error: null });
        try {
            // Pastikan backend Golang Anda menyediakan endpoint GET /homepage untuk membaca id = '1'
            const response = await api.get<HomepageSetting>('/api/backoffice/homepage-setting');
            set({ homepageSetting: response.data });
        } catch (err: any) {
            set({ error: err.response?.data?.message || 'Gagal memuat data pengaturan halaman utama' });
        } finally {
            set({ isLoading: false });
        }
    },

    // 2. UPDATE TEXT DINAMIS SATUAN (INLINE LIVE EDIT)
    // 'keyof' memastikan parameter key yang dikirim wajib sesuai dengan property teks yang ada di interface
    updateFieldDinamic: async (key, value) => {
        set({ isSaving: true });
        try {
            const response = await api.post<{ success: boolean; message: string }>('/api/backoffice/homepage-setting/update-field', {
                key,
                value,
            });

            if (response.data.success) {
                // Optimistic Update: Langsung ubah datanya di lokal state React agar UI terasa sangat instan
                set((state) => {
                    if (!state.homepageSetting) return state;
                    return {
                        homepageSetting: {
                            ...state.homepageSetting,
                            [key]: value,
                        },
                    };
                });
            }
        } catch (err: any) {
            alert(err.response?.data?.message || 'Gagal menyimpan perubahan teks');
            throw err;
        } finally {
            set({ isSaving: false });
        }
    },

    // 3. UPLOAD GAMBAR SAMBUTAN KEPDES (MULTIPART FORM-DATA)
    uploadImage: async (file: File) => {
        set({ isSaving: true });
        const formData = new FormData();
        formData.append('sambutan_kepdes_image', file);

        try {
            const response = await api.post<{ success: boolean; message: string; image_url: string }>(
                '/api/backoffice/homepage-setting/update-image',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            if (response.data.success) {
                const newPath = response.data.image_url;

                // Perbarui lokal state untuk path gambar Kepala Desa yang baru
                set((state) => {
                    if (!state.homepageSetting) return state;
                    return {
                        homepageSetting: {
                            ...state.homepageSetting,
                            sambutan_kepdes_image: newPath,
                        },
                    };
                });
                return newPath;
            }
            return null;
        } catch (err: any) {
            alert(err.response?.data?.message || 'Gagal mengunggah foto Kepala Desa');
            return null;
        } finally {
            set({ isSaving: false });
        }
    },
}));
