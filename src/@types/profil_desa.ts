export interface ProfilDesa {
    id: string;
    nama_desa: string;
    alamat_lengkap: string;
    kelurahan: string;
    kecamatan: string;
    kabupaten_kota: string;
    provinsi: string;
    kode_pos: string;
    kode_wilayah: string;
    email: string;
    nomor_telepon: string;
    logo_desa: string;
    deskripsi_singkat: string;
}

export interface ProfileDesaState {
    // 1. State
    profilDesa: ProfilDesa | null;
    isLoading: boolean;
    error: string | null;

    // 2. Actions
    fetchProfilDesa: () => Promise<void>;
    updateProfilDesa: (dataBaru: Partial<ProfilDesa>) => Promise<void>;
    clearProfileStore: () => void;
}