import { classMerge } from "@/@utils/classMerge";
import { cleanFileUrl } from "@/@utils/cleanFileUrl";
import { ArrowRightIcon } from "flowbite-react";
import { Link } from "react-router-dom";

const potential: HomeSection = {
    title: "Galeri Desa",
    subtitle: "Menampilkan kegiatan-kegiatan yang berlangsung di Desa."
}

const posts = [
    {
        id: 1,
        title: 'Pelaksanaan Posyandu 6 Standar Pelayanan Minimal (SPM), Serentak di Indonesia',
        href: '#',
        description: 'Kegiatan Posyandu Serentak dengan penerapan 6 Standar Pelayanan Minimal (SPM) bidang kesehatan. Kegiatan ini merupakan bagian dari upaya pemerintah untuk memastikan layanan dasar kesehatan masyarakat berjalan optimal dan merata hingga tingkat desa.',
        imageUrl: 'news_1.png',
        date: 'Mar 16, 2025',
        datetime: '2025-03-16',
        category: { title: 'Masyarakat', href: '#' },
        author: {
            name: 'Hasan Basri',
            role: 'Staff Umum',
            href: '#',
            imageUrl: 'sotk_10.png',
        },
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
        title: 'Kegiatan Gotong Royong.',
        href: '#',
        description: 'Kegiatan gotong royong dalam pembersihan saluran air untuk mencegah tersumbatnya air, yang dapat membuat nyamuk untuk berkembang biak dan agar lingkungan tetap bersih dan bebas sampah berserakan.',
        imageUrl: 'news_7.png',
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
]

function GaleryComponent() {
    return (
        <div className="w-full">
            <div className="bg-white py-16 sm:py-24 dark:bg-green-700">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                            <div className="max-w-xl text-center lg:text-left">
                                <h2 className="text-xl lg:text-4xl font-semibold tracking-tight text-pretty text-green-900 sm:text-5xl dark:text-white">
                                    {potential.title}
                                </h2>
                                <div className="my-2 text-gray-600 dark:text-gray-300">
                                    <div className="text-base lg:text-xl">{potential.subtitle}</div>
                                </div>
                            </div>
                            <section className="grid grid-cols-1 lg:gap-x-8 lg:gap-y-16">
                                <div className="w-full pt-18 lg:pt-8 lg:row-span-2 lg:-mr-16 xl:mr-auto">
                                    <div className="w-full grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 xl:gap-8">
                                        {posts.map((post, i) => (
                                            <div
                                                key={post.id}
                                                className={classMerge(
                                                    i % 2 ? "-mt-8 " : "",
                                                    "h-60 lg:h-80 w-full overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 dark:shadow-none dark:outline-white/10"
                                                )}
                                            >
                                                <img
                                                    alt={post.title}
                                                    src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, post.imageUrl)}
                                                    className="block size-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-0 flex items-center justify-center gap-x-6 lg:justify-end">
                        <Link to="/galeri" className="font-semibold text-blue-700 dark:text-blue-200 hover:underline">
                            <div className="flex items-center space-x-2">
                                <div>Lihat Gambar Lainnya{' '}</div>
                                <ArrowRightIcon className="size-5" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default GaleryComponent;