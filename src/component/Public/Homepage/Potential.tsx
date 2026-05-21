import { Link } from "react-router-dom";
import { cleanFileUrl } from "@/@utils/cleanFileUrl";
import { ArrowRightIcon } from "flowbite-react";

const potential: HomeSection = {
    title: "Potensi Desa",
    subtitle: "Informasi tentang potensi dan kemajuan Desa di berbagai bidang seperti ekonomi, pariwisata, pertanian, industri kreatif, dan kelestarian lingkungan"
}

const posts = [
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
]

function PotentialComponent() {
    return (
        <div className="w-full">
            <div className="bg-white py-16 sm:py-48 dark:bg-green-700">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-xl lg:text-4xl font-semibold tracking-tight text-pretty text-green-900 sm:text-5xl dark:text-white">
                            {potential.title}
                        </h2>
                        <div className="my-2 text-gray-600 dark:text-gray-300">
                            <div className="text-base lg:text-xl">{potential.subtitle}</div>
                        </div>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80 dark:bg-gray-800"
                            >
                                <img
                                    alt={post.title}
                                    src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, post.imageUrl)}
                                    className="absolute inset-0 -z-10 size-full object-cover"
                                />
                                <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40 dark:from-black/80 dark:via-black/40" />
                                <div className="absolute inset-0 -z-10 rounded-2xl inset-ring inset-ring-gray-900/10 dark:inset-ring-white/10" />

                                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
                                    <time dateTime={post.datetime} className="mr-8">
                                        {post.date}
                                    </time>
                                    <div className="-ml-4 flex items-center gap-x-4">
                                        <svg viewBox="0 0 2 2" className="-ml-0.5 size-0.5 flex-none fill-white/50 dark:fill-gray-300/50">
                                            <circle r={1} cx={1} cy={1} />
                                        </svg>
                                        <div className="flex gap-x-2.5">
                                            <img
                                                alt={post.author.role}
                                                src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, post.author.imageUrl)}
                                                className="size-6 flex-none rounded-full bg-white/10 dark:bg-gray-800/10"
                                            />
                                            {post.author.name}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="mt-3 text-lg/6 font-semibold text-white">
                                    <a href={post.href}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </a>
                                </h3>
                            </article>
                        ))}
                    </div>
                    <div className="mt-10 lg:mt-14 flex items-center justify-center gap-x-6 lg:justify-end">
                        <Link to="/potensi" className="font-semibold text-blue-700 dark:text-blue-200 hover:underline">
                            <div className="flex items-center space-x-2">
                                <div>Lihat Potensi Lainnya{' '}</div>
                                <ArrowRightIcon className="size-5" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PotentialComponent;