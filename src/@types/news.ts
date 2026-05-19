export interface NewsCategory {
    title: string;
    href: string;
}

export interface NewsAuthor {
    name: string;
    role: string;
    href: string;
    imageUrl: string;
}

export interface BeritaItem {
    id: number; // Menggunakan tipe number sesuai data Anda
    title: string;
    href: string;
    description: string;
    imageUrl: string;
    date: string;
    datetime: string;
    category: NewsCategory;
    author: NewsAuthor;
    is_headline?: boolean; // Properti opsional untuk penanda berita utama
}