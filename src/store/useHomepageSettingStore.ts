import { HomepageSetting } from '@/@types/homepage_setting';
import axios from 'axios';
import { create } from 'zustand';
import auth from '@/@utils/auth_req';

interface HomepageState {
    homepageSetting: HomepageSetting | null;
    isLoading: boolean;
    isSaving: boolean;
    error: string | null;
    isManagerOpen: boolean;

    // Actions
    openManager: () => void;
    closeManager: () => void;
    fetchPublicHomepageSetting: () => Promise<void>;
    fetchHomepageSetting: () => Promise<void>;
    updateFieldDinamic: (key: keyof Omit<HomepageSetting, 'id' | 'sambutan_kepdes_image'>, value: string) => Promise<void>;
    uploadImage: (file: File) => Promise<string | null>;
}

export const useHomepageStore = create<HomepageState>((set) => ({
    isManagerOpen: false,
    homepageSetting: null,
    isLoading: false,
    isSaving: false,
    error: null,

    openManager: () => set({ isManagerOpen: true }),
    closeManager: () => set({ isManagerOpen: false }),
    // 1. AMBIL SELURUH DATA HOMEPAGE (GET)
    fetchPublicHomepageSetting: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<ApiResponse<HomepageSetting>>('/api/homepage-setting');
            set({ homepageSetting: response.data.data });
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
            const response = await auth.get<ApiResponse<HomepageSetting>>('/api/backoffice/homepage-setting');
            set({ homepageSetting: response.data.data });
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
            const response = await auth.post<{ success: boolean; message: string }>('/api/backoffice/homepage-setting/update-field', {
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
            // PERBAIKAN: Ubah properti tipe data dari image_url menjadi image agar cocok dengan backend Go
            const response = await auth.post<{ success: boolean; message: string; image: string }>(
                '/api/backoffice/homepage-setting/update-image',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            if (response.data.success) {
                const newPath = response.data.image; // PERBAIKAN: Ambil properti response.data.image

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

            // Lempar pesan kegagalan dari backend jika success bernilai false
            throw new Error(response.data.message || 'Gagal mengunggah foto');
        } catch (err: any) {
            // PONDASI PERBAIKAN: Gunakan throw err agar error ditangkap oleh blok catch di fungsi pemanggil
            throw err;
        } finally {
            set({ isSaving: false });
        }
    },
}));
