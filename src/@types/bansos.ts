export interface AlokasiBansos {
    name: string;
    total_kk: number;
    anggaran_per_bulan: string;
}

export interface DusunBansos {
    name: string;
    penerima: number;
    non_penerima: number;
}

export interface UsulanBansos {
    status: string;
    jumlah: number;
}
