import { Potential as PotentialTs } from "@/@types/potential";
import { cleanFileUrl } from "@/@utils/cleanFileUrl";
import FooterComponent from "@/component/Public/Footer";
import HeaderComponent from "@/component/Public/Header";

// 1. Mock Data Sesuai Struktur Struktur yang Anda Berikan
const posts: PotentialTs[] = [
    {
        id: 1,
        title: 'Budidaya Ikan dan Udang',
        href: '#',
        description: 'Dengan pengelolaan yang berkelanjutan, tambak desa bukan hanya sumber penghidupan, tetapi juga simbol harmoni antara manusia dan lingkungan, potensi yang terus menghidupi masa depan perikanan Indonesia.',
        imageUrl: 'news_4.png',
        date: 'Mar 02, 2026',
        datetime: '2026-03-02',
        category: { title: 'Potensi', href: '#' },
        author: {
            name: 'Hasan Basri',
            role: 'Staff Umum',
            href: '#',
            imageUrl: 'sotk_10.png',
        },
    },
    {
        id: 2,
        title: 'Hasil Pertanian Unggulan',
        href: '#',
        description: 'Pertanian desa yang dekat dengan pesisir tidak hanya mengandalkan hasil laut, tetapi juga memiliki komoditas unggulan dari lahan darat. Tiga tanaman utama yang menjadi andalan adalah cabai, jagung, dan singkong.',
        imageUrl: 'news_5.png',
        date: 'Feb 10, 2026',
        datetime: '2026-02-10',
        category: { title: 'Potensi', href: '#' },
        author: {
            name: 'Hasan Basri',
            role: 'Staff Umum',
            href: '#',
            imageUrl: 'sotk_10.png',
        },
    },
    {
        id: 3,
        title: 'Olahan Ikan Kerupuk: Potensi Unggulan Desa',
        href: '#',
        description: 'Desa yang berada di dekat laut memiliki kekayaan sumber daya alam yang melimpah, terutama hasil tangkapan ikan. Salah satu produk olahan yang menjadi kebanggaan masyarakat pesisir adalah kerupuk ikan.',
        imageUrl: 'news_6.png',
        date: 'Jan 12, 2026',
        datetime: '2026-01-12',
        category: { title: 'Potensi', href: '#' },
        author: {
            name: 'Hasan Basri',
            role: 'Staff Umum',
            href: '#',
            imageUrl: 'sotk_10.png',
        },
    },
];

function Potential() {
    return (
        <div>
            <HeaderComponent is_homepage={false} />
            <div className="mt-24 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 dark:bg-green-700 transition-colors duration-200">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* === BANNER HERO / SAMBUTAN UTAMA === */}
                    <div className="relative bg-green-600 rounded-2xl py-20 px-4 text-center text-white overflow-hidden">
                        {/* Gambar Latar Belakang Tipis */}
                        <div className="absolute inset-0 bg-[url('https://unsplash.com')] bg-cover bg-center opacity-10"></div>
                        <div className="relative max-w-3xl mx-auto space-y-4">
                            <span className="bg-green-800 text-green-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-green-700/50">
                                Kekayaan Wilayah Desa
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                                Sentra Komoditas & Potensi Alam
                            </h1>
                            <p className="text-sm text-green-100 max-w-xl mx-auto leading-relaxed">
                                Eksplorasi mendalam mengenai sektor agraris, kemandirian pangan, industri kreatif, serta kearifan lokal yang menggerakkan roda ekonomi desa.
                            </p>
                        </div>
                    </div>

                    {/* === KARTU UTAMA (Sama persis seperti gambar contoh) === */}
                    <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-12">
                        {/* Header */}
                        <div className="text-center space-y-3">
                            <h2 className="text-3xl font-semibold tracking-tight text-green-900 dark:text-white sm:text-4xl">
                                Potensi Desa
                            </h2>
                            <p className="max-w-3xl mx-auto text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                Informasi tentang potensi dan kemajuan Desa di berbagai bidang seperti
                                ekonomi, pariwisata, pertanian, industri kreatif, dan kelestarian lingkungan.
                            </p>
                        </div>

                        {/* Grid 3 Kartu Potensi (Fix Size & Anti-Gepeng) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <a
                                    key={post.id}
                                    href={post.href}
                                    className="group relative flex flex-col justify-end aspect-3/4 w-full rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gray-100 dark:bg-gray-800"
                                >
                                    {/* Foto Latar Belakang */}
                                    <img
                                        src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, post.imageUrl)}
                                        alt={post.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Gradasi Hitam di Bagian Bawah Gambar */}
                                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent opacity-90"></div>

                                    {/* Konten Informasi Teks Overlap */}
                                    <div className="relative p-5 space-y-3 z-10 text-left">

                                        {/* Baris Atas: Tanggal & Penulis */}
                                        <div className="flex items-center gap-2.5 text-[11px] text-gray-300 font-medium">
                                            <time dateTime={post.datetime}>{post.date}</time>
                                            <span>•</span>
                                            <div className="flex items-center gap-1.5">
                                                <img
                                                    src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, post.author.imageUrl)}
                                                    alt={post.author.name}
                                                    className="w-4 h-4 rounded-full object-cover"
                                                />
                                                <span>{post.author.name}</span>
                                            </div>
                                        </div>

                                        {/* Judul Potensi */}
                                        <h3 className="text-base font-bold text-white leading-snug group-hover:text-green-300 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        {/* Deskripsi Halus yang Muncul Saat Di-Hover */}
                                        <p className="text-[11px] text-gray-400 line-clamp-2 text-justify hidden group-hover:block transition-all duration-300">
                                            {post.description}
                                        </p>

                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white dark:bg-green-950/20 border-t py-12 px-4 dark:border-gray-800">
                        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="space-y-1">
                                <p className="text-2xl font-semibold text-green-800 dark:text-white font-mono">120 Ha</p>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Luas Lahan Tambak</p>
                            </div>
                            <div className="space-y-1 border-l dark:border-gray-800">
                                <p className="text-2xl font-semibold text-green-800 dark:text-white font-mono">45 Ton</p>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Panen Padi / Musim</p>
                            </div>
                            <div className="space-y-1 border-l dark:border-gray-800">
                                <p className="text-2xl font-semibold text-green-800 dark:text-white font-mono">3 Unit</p>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Kelompok UMKM Aktif</p>
                            </div>
                            <div className="space-y-1 border-l dark:border-gray-800">
                                <p className="text-2xl font-semibold text-green-800 dark:text-white font-mono">15 Varietas</p>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Komoditas Kebun</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}

export default Potential;