export interface DokumenPpid {
    id: string;
    judul: string;
    nomor_dokumen?: string;
    tahun: number;
    ukuran_file: string;
    format: 'PDF' | 'XLS' | 'DOC';
    download_url: string;
}

export interface KategoriPpid {
    nama_kategori: string;
    deskripsi: string;
    icon: string;
    list_dokumen: DokumenPpid[];
}
