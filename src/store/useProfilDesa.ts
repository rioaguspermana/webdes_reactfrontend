import { create } from 'zustand';
import axios from 'axios';
import { ProfilDesa } from '@/@types/profil_desa';
import auth from '@/@utils/auth_req';

export interface ProfileDesaState {
    // 1. State
    profilDesa: ProfilDesa | null;
    isLoading: boolean;
    isSaving: boolean;
    error: string | null;
    successMessage: string | null;

    // 2. Actions
    fetchPublicProfilDesa: () => Promise<void>;
    fetchProfilDesa: () => Promise<void>;
    updateProfilDesa: (dataBaru: ProfilDesa, imageFile: File | null) => Promise<boolean>;
}

export const useProfileStore = create<ProfileDesaState>((set) => ({
    profilDesa: null,
    isLoading: false,
    isSaving: false,
    error: null,
    successMessage: null,

    fetchPublicProfilDesa: async () => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
            const response = await axios.get<ApiResponse<ProfilDesa>>('/api/profil-desa');
            set({ profilDesa: response.data.data, isLoading: false });
        } catch (err: any) {
            set({ error: err.response?.data?.message || 'Gagal memuat data desa', isLoading: false });
        }
    },

    fetchProfilDesa: async () => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
            const response = await auth.get<ApiResponse<ProfilDesa>>('/api/backoffice/profil-desa');
            set({ profilDesa: response.data.data, isLoading: false });
        } catch (err: any) {
            set({ error: err.response?.data?.message || 'Gagal memuat data desa', isLoading: false });
        }
    },

    // Ganti fungsi updateProfilDesa di store Anda dengan kode ini:
    updateProfilDesa: async (updatedData: ProfilDesa, imageFile: File | null) => {
        set({ isSaving: true, error: null, successMessage: null });

        try {
            // 1. Inisialisasi FormData bawaan browser
            const formData = new FormData();

            // 2. Bungkus semua data teks snake_case dari Form masuk ke FormData
            formData.append('id', updatedData.id);
            formData.append('nama_desa', updatedData.nama_desa);
            formData.append('alamat_lengkap', updatedData.alamat_lengkap);
            formData.append('kelurahan', updatedData.kelurahan);
            formData.append('kecamatan', updatedData.kecamatan);
            formData.append('kabupaten_kota', updatedData.kabupaten_kota);
            formData.append('provinsi', updatedData.provinsi);
            formData.append('kode_pos', updatedData.kode_pos);
            formData.append('kode_wilayah', updatedData.kode_wilayah);
            formData.append('email', updatedData.email);
            formData.append('nomor_telepon', updatedData.nomor_telepon);
            formData.append('deskripsi_singkat', updatedData.deskripsi_singkat);

            // 3. 🔥 Jika admin memilih gambar baru, masukkan file biner aslinya ke key 'logo_desa'
            if (imageFile) {
                formData.append('logo_desa', imageFile);
            } else {
                // Jika tidak ganti gambar, kirimkan nama file/URL lamanya agar tidak kosong di Go
                formData.append('logo_desa', updatedData.logo_desa);
            }

            // 4. Kirim ke API Go dengan header 'multipart/form-data'
            const response = await auth.put('/api/backoffice/profil-desa', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            set({
                profilDesa: { ...response.data.data },
                isSaving: false,
                successMessage: 'Profil desa berhasil diperbarui!'
            });

            return true;
        } catch (err: any) {
            set({ error: err.response?.data?.message || 'Gagal menyimpan data', isSaving: false });
            return false;
        }
    },
}));
