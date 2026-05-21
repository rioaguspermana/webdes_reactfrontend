export interface TourismDestination {
    id: number;
    nama: string;
    href: string;
    category: string;
    deskripsi: string;
    lokasi: string;
    imageUrl: string;
    hargaTiket: string;
}

export const tourism: HomeSection = {
    title: "Pesona Wisata Desa",
    subtitle: "Temukan keindahan alam tersembunyi, warisan budaya yang luhur, dan keramahan masyarakat desa kami yang tak terlupakan."
}

export const dataWisata: TourismDestination[] = [
    {
        id: 1,
        nama: "Curug Indah Pesona",
        href: '#',
        category: "Alam",
        deskripsi: "Nikmati kesegaran air terjun alami tersembunyi di kelilingi hutan pinus desa yang asri dan menyejukkan pikiran.",
        lokasi: "Dusun Utara, RT 02",
        imageUrl: "wisata_1.png",
        hargaTiket: "Rp 10.000",
    },
    {
        id: 2,
        nama: "Ekowisata Sawah Hijau",
        href: '#',
        category: "Edukasi",
        deskripsi: "Belajar menanam padi organik langsung bersama petani lokal sembari menikmati sunset indah di tengah hamparan sawah.",
        lokasi: "Dusun Utara",
        imageUrl: "wisata_2.png",
        hargaTiket: "Gratis",
    },
    {
        id: 3,
        nama: "Kampung Adat & Kerajinan",
        href: '#',
        category: "Budaya",
        deskripsi: "Melihat langsung proses pembuatan caping khas desa dan arsitektur rumah panggung kuno.",
        lokasi: "Dusun Selatan",
        imageUrl: "wisata_3.png",
        hargaTiket: "Gratis",
    },
];