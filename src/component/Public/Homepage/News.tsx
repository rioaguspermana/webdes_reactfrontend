import { Link } from "react-router-dom";
import { cleanFileUrl } from "@/@utils/cleanFileUrl";
import { ArrowRightIcon } from "flowbite-react";

const news: HomeSection = {
    title: "Berita Desa",
    subtitle: "Menyajikan informasi terbaru tentang peristiwa, berita terkini, dan artikel-artikel jurnalistik dari Desa Sejahtera."
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
]

function NewsComponent() {
    return (
        <div className="w-full">
            <div className="bg-white py-16 sm:py-48 dark:bg-green-700">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-xl lg:text-4xl font-semibold tracking-tight text-pretty text-green-900 sm:text-5xl dark:text-white">
                            {news.title}
                        </h2>
                        <div className="my-2 text-gray-600 dark:text-gray-300">
                            <div className="text-base lg:text-xl">{news.subtitle}</div>
                        </div>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post) => (
                            <article key={post.id} className="flex flex-col items-start justify-between">
                                <div className="relative w-full">
                                    <img
                                        alt={post.title}
                                        src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, post.imageUrl)}
                                        className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2 dark:bg-gray-800"
                                    />
                                    <div className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10 dark:inset-ring-white/10" />
                                </div>
                                <div className="flex max-w-xl grow flex-col justify-between">
                                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                                        <time dateTime={post.datetime} className="text-gray-500 dark:text-gray-400">
                                            {post.date}
                                        </time>
                                        <a
                                            href={post.category.href}
                                            className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-800"
                                        >
                                            {post.category.title}
                                        </a>
                                    </div>
                                    <div className="group relative grow">
                                        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                                            <a href={post.href}>
                                                <span className="absolute inset-0" />
                                                {post.title}
                                            </a>
                                        </h3>
                                        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-400">{post.description}</p>
                                    </div>
                                    <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                                        <img
                                            alt={post.author.role}
                                            src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, post.author.imageUrl)}
                                            className="size-10 rounded-full bg-gray-100 dark:bg-gray-800"
                                        />
                                        <div className="text-sm/6">
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                <a href={post.author.href}>
                                                    <span className="absolute inset-0" />
                                                    {post.author.name}
                                                </a>
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">{post.author.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="mt-10 lg:mt-14 flex items-center justify-center gap-x-6 lg:justify-end">
                        <Link to="/infografis/apb" className="font-semibold text-blue-700 dark:text-blue-200 hover:underline">
                            <div className="flex items-center space-x-2">
                                <div>Lihat Berita Lainnya{' '}</div>
                                <ArrowRightIcon className="size-5" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsComponent;