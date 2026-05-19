import { useState, useMemo } from 'react';
import { Card, TextInput } from 'flowbite-react';
import type { BeritaItem } from '@/@types/news';
import { cleanFileUrl } from '@/@utils/cleanFileUrl';
import HeaderComponent from '@/component/Public/Header';
import FooterComponent from '@/component/Public/Footer';

// 1. Data simulasi (Mock Data) sesuai dengan struktur data yang Anda minta
const mockBerita: BeritaItem[] = [
    {
        id: 1,
        title: 'Pelaksanaan Posyandu 6 Standar Pelayanan Minimal (SPM), Serentak di Indonesia',
        href: '#',
        description: 'Kegiatan Posyandu Serentak dengan penerapan 6 Standar Pelayanan Minimal (SPM) bidang kesehatan. Kegiatan ini merupakan bagian dari upaya pemerintah untuk memastikan layanan dasar kesehatan masyarakat berjalan optimal dan merata hingga tingkat desa.',
        imageUrl: 'news_1.png', // Contoh gambar asli, ganti dengan 'news_1.png' di proyek Anda
        date: 'Mar 16, 2025',
        datetime: '2025-03-16',
        category: { title: 'Masyarakat', href: '#' },
        author: {
            name: 'Hasan Basri',
            role: 'Staff Umum',
            href: '#',
            imageUrl: 'sotk_10.png',
        },
        is_headline: true // Ditandai sebagai berita utama agar layout terlihat menarik
    },
    {
        id: 2,
        title: 'Sosialisasi Pencegahan Stunting di Desa Sejahtera',
        href: '#',
        description: 'Pemerintah Desa Sejahtera bersama kader Posyandu dan Puskesmas setempat mengadakan kegiatan sosialisasi pencegahan stunting di balai desa. Acara ini dihadiri oleh perangkat desa, tokoh masyarakat, ibu hamil, serta para orang tua balita.',
        imageUrl: 'news_2.png',
        date: 'Mar 10, 2026',
        datetime: '2026-03-10',
        category: { title: 'Masyarakat', href: '#' },
        author: {
            name: 'Hasan Basri',
            role: 'Staff Umum',
            href: '#',
            imageUrl: 'sotk_10.png',
        },
    },
    {
        id: 3,
        title: 'Pelatihan Tata Kelola Bisnis dan Pemasaran Destinasi Wisata Berkelanjutan.',
        href: '#',
        description: 'Kegiatan ini merupakan bagian dari program Pengabdian kepada Masyarakat, Pelatihan ini bertujuan untuk memberikan pemahaman dan keterampilan kepada para pelaku wisata desa agar mampu mengelola destinasi wisata dengan prinsip keberlanjutan serta memasarkan potensi wisata secara lebih profesional.',
        imageUrl: 'news_3.png',
        date: 'Feb 12, 2026',
        datetime: '2026-02-12',
        category: { title: 'Masyarakat', href: '#' },
        author: {
            name: 'Hasan Basri',
            role: 'Staff Umum',
            href: '#',
            imageUrl: 'sotk_10.png',
        },
    },
    {
        id: 4,
        title: 'Pemberdayaan UMKM Desa Melalui Pelatihan Digital Marketing Terpadu',
        href: '#',
        description: 'Pemerintah desa memfasilitasi puluhan pelaku UMKM lokal untuk melek digital melalui pelatihan optimasi toko online dan pemasaran media sosial demi mendongkrak ekonomi desa.',
        imageUrl: 'news_4.png',
        date: 'Apr 02, 2026',
        datetime: '2026-04-02',
        category: { title: 'Ekonomi', href: '#' },
        author: {
            name: 'Hasan Basri',
            role: 'Staff Umum',
            href: '#',
            imageUrl: 'sotk_10.png',
        },
        is_headline: false
    },
];

function News() {
    const [search, setSearch] = useState('');
    const [selectedKategori, setSelectedKategori] = useState<string>('Semua');

    const daftarKategori = ['Semua', 'Masyarakat', 'Ekonomi', 'Pengumuman', 'Pembangunan'];

    // Filter berita berdasarkan input pencarian dan tombol kategori aktif
    const filteredBerita = useMemo(() => {
        return mockBerita.filter((item) => {
            const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase());
            const matchKategori = selectedKategori === 'Semua' || item.category.title === selectedKategori;
            return matchSearch && matchKategori;
        });
    }, [search, selectedKategori]);

    const headlineNews = useMemo(() => mockBerita.find(b => b.is_headline), []);

    return (
        <div>
            <HeaderComponent is_homepage={false} />
            <div className="mt-24 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 dark:bg-green-700 transition-colors duration-200">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* === HEADER HALAMAN === */}
                    <div className="text-center border-b border-gray-200 dark:border-green-800 pb-6">
                        <h1 className="text-3xl font-extrabold tracking-tight text-green-900 dark:text-white sm:text-4xl">
                            Kabar & Informasi Desa
                        </h1>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Berita resmi mengenai program kerja, kesehatan masyarakat, dan pengumuman desa.
                        </p>
                    </div>

                    {/* === SECTION 1: BERITA HEADLINE === */}
                    {headlineNews && search === '' && selectedKategori === 'Semua' && (
                        <div className="bg-white dark:bg-green-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2">
                            <div className="h-64 md:h-full min-h-62.5">
                                <img
                                    src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, headlineNews.imageUrl)}
                                    alt={headlineNews.title}
                                    className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6 flex flex-col justify-between space-y-4">
                                <div className="space-y-3">
                                    <span className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        📌 {headlineNews.category.title}
                                    </span>
                                    <h2 className="text-xl font-semibold text-green-900 dark:text-white leading-snug">
                                        <a href={headlineNews.href} className="hover:text-green-700 dark:hover:text-green-300">
                                            {headlineNews.title}
                                        </a>
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-200 line-clamp-4 text-justify leading-relaxed">
                                        {headlineNews.description}
                                    </p>
                                </div>

                                {/* Data Penulis & Tanggal sesuai struktur Anda */}
                                <div className="flex items-center justify-between border-t pt-4 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, headlineNews.author.imageUrl)}
                                            alt={headlineNews.author.name}
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                        <div className="text-left">
                                            <p className="text-xs font-semibold text-gray-900 dark:text-white">{headlineNews.author.name}</p>
                                            <p className="text-[10px] text-gray-400">{headlineNews.author.role}</p>
                                        </div>
                                    </div>
                                    <time dateTime={headlineNews.datetime} className="text-xs text-gray-400">
                                        {headlineNews.date}
                                    </time>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === SECTION 2: SEARCH & FILTER BAR === */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-green-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-green-900">
                        <div className="flex flex-wrap gap-2 w-full md:w-auto">
                            {daftarKategori.map((kat) => (
                                <button
                                    key={kat}
                                    type="button"
                                    onClick={() => setSelectedKategori(kat)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedKategori === kat
                                        ? 'bg-green-800 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-green-200 dark:bg-green-700 dark:text-gray-200 dark:hover:bg-green-600'
                                        }`}
                                >
                                    {kat}
                                </button>
                            ))}
                        </div>
                        <div className="w-full md:w-64">
                            <TextInput
                                id="search-news"
                                type="text"
                                placeholder="Cari berita desa..."
                                value={search}
                                color='success'
                                onChange={(e) => setSearch(e.target.value)}
                                sizing="sm"
                            />
                        </div>
                    </div>

                    {/* === SECTION 3: GRID BERITA REGULER === */}
                    {filteredBerita.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredBerita
                                .filter((b) => (search !== '' || selectedKategori !== 'Semua' ? true : !b.is_headline))
                                .map((berita) => (
                                    <Card
                                        key={berita.id}
                                        imgAlt={berita.title}
                                        imgSrc={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, berita.imageUrl)}
                                        className="flex flex-col h-full bg-white dark:bg-green-800 border-green-100 dark:border-green-900"
                                    >
                                        <div className="space-y-2 grow">
                                            <span className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-800 dark:bg-green-700 dark:text-gray-300 px-2 py-0.5 rounded font-semibold">
                                                {berita.category.title}
                                            </span>
                                            <h3 className="text-base font-semibold text-green-900 dark:text-white line-clamp-2 leading-snug">
                                                <a href={berita.href} className="hover:text-green-700 dark:hover:text-green-300">
                                                    {berita.title}
                                                </a>
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-300 line-clamp-3 text-justify">
                                                {berita.description}
                                            </p>
                                        </div>

                                        {/* Render metadata penulis di dalam kartu berita */}
                                        <div className="border-t pt-3 mt-4 dark:border-green-700 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, berita.author.imageUrl)}
                                                    alt={berita.author.name}
                                                    className="h-7 w-7 rounded-full object-cover"
                                                />
                                                <div className="text-left">
                                                    <p className="text-[10px] font-semibold text-gray-900 dark:text-white leading-tight">{berita.author.name}</p>
                                                    <p className="text-[9px] text-gray-300 leading-none">{berita.author.role}</p>
                                                </div>
                                            </div>
                                            <time dateTime={berita.datetime} className="text-[10px] text-gray-300">
                                                {berita.date}
                                            </time>
                                        </div>
                                    </Card>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400 text-sm">
                            ❌ Tidak ditemukan berita desa yang cocok.
                        </div>
                    )}

                </div>
            </div>
            <FooterComponent />
        </div>
    );
}

export default News;