import { Link } from "react-router-dom";
import { cleanFileUrl } from "@/@utils/cleanFileUrl";
import { ArrowRightIcon } from "flowbite-react";
import { useHomepageStore } from "@/store/useHomepageSettingStore";
import { useState, useRef, useEffect } from "react";
import { useAlertStore } from "@/store/useAlertStore";

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
    const { showAlert } = useAlertStore()
    const { homepageSetting, updateFieldDinamic } = useHomepageStore();
    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [editSubtitle, setEditSubtitle] = useState<boolean>(false);
    const [localTitle, setLocalTitle] = useState<string>(homepageSetting?.berita_title ?? '');
    const [localSubtitle, setLocalSubtitle] = useState<string>(homepageSetting?.berita_subtitle ?? '');
    const titleFormRef = useRef<HTMLDivElement>(null);
    const subtitleFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (homepageSetting) {
            setLocalTitle(homepageSetting?.berita_title ?? '');
            setLocalSubtitle(homepageSetting.berita_subtitle ?? '');
        }
    }, [homepageSetting]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent | PointerEvent) => {
            if (editTitle && titleFormRef.current && !titleFormRef.current.contains(event.target as Node)) {
                cancelField("berita_title"); // Otomatis batal edit judul
            }
            if (editSubtitle && subtitleFormRef.current && !subtitleFormRef.current.contains(event.target as Node)) {
                cancelField("berita_subtitle"); // Otomatis batal edit judul
            }
        };

        // Daftarkan event listener klik global ke dokumen peramban
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        // Bersihkan event listener saat komponen dilepas (unmount) agar tidak bocor memori
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [editTitle]);

    const saveField = async (field: 'berita_title' | 'berita_subtitle') => {
        try {
            if (field === 'berita_title') {
                await updateFieldDinamic(field, localTitle);
                setEditTitle(false)
            } else if (field === 'berita_subtitle') {
                await updateFieldDinamic(field, localSubtitle);
                setEditSubtitle(false)
            }
        } catch (err) {
            showAlert("Gagal menyimpan perubahan!", 'error', 3000);
        }
    };

    const cancelField = (field: 'berita_title' | 'berita_subtitle') => {
        if (homepageSetting) {
            if (field === 'berita_title') {
                setLocalTitle(homepageSetting?.berita_title);
                setEditTitle(false)
            } else if (field === 'berita_subtitle') {
                setLocalSubtitle(homepageSetting.berita_subtitle);
                setEditSubtitle(false)
            }
        }
    };

    return (
        <div className="w-full">
            <div className="bg-white py-16 sm:py-48 dark:bg-green-700">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="w-full lg:flex-auto text-center lg:text-left">
                        <div className="relative group/title">
                            {editTitle ? (
                                /* MODE EDIT: INPUT JUDUL */
                                <div ref={titleFormRef} className="flex items-center gap-3 w-full border-b border-indigo-500 bg-indigo-50/30 dark:bg-zinc-800/50 px-2 py-1 rounded-t">
                                    <input
                                        type="text"
                                        value={localTitle}
                                        placeholder={localTitle}
                                        onChange={(e) => setLocalTitle(e.target.value)}
                                        className="w-full text-base lg:text-4xl font-semibold text-teal-950 dark:text-white bg-transparent focus:outline-none tracking-tight"
                                        autoFocus
                                    />
                                    {/* TOMBOL AKSI INLINE */}
                                    <div className="flex gap-1 shrink-0">
                                        <button
                                            onClick={() => saveField('berita_title')}
                                            disabled={false}//isloading
                                            title="Simpan"
                                            className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => cancelField('berita_title')}
                                            title="Batal"
                                            className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* MODE LIHAT: TAMPILAN TEXT + EFEK HOVER TRANSPARAN */
                                <div
                                    onClick={() => setEditTitle(true)}
                                    className={`flex justify-self-center items-center gap-3 group rounded transition-all duration-200 ${true ? 'hover:opacity-65 hover:bg-gray-50 dark:hover:bg-zinc-800/30 cursor-text select-none' : ''}`}
                                >
                                    <h2 className="text-xl lg:text-4xl font-semibold text-teal-950 dark:text-white tracking-tight leading-tight flex-1">
                                        {localTitle}
                                    </h2>
                                    {/* IKON PENSIL DI UJUNG TEXT */}
                                    {true && (
                                        <span className="absolute lg:relative right-0 text-gray-300 dark:text-zinc-600 group-hover/title:text-indigo-500 p-1 transition-colors shrink-0 pt-2">
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="relative group/sub">
                            {editSubtitle ? (
                                /* MODE EDIT: TEXTAREA SUBJUDUL */
                                <div ref={subtitleFormRef} className="flex items-start gap-3 w-full border-b border-indigo-500 bg-indigo-50/30 dark:bg-zinc-800/50 px-2 py-1 rounded-t">
                                    <textarea
                                        value={localSubtitle}
                                        onChange={(e) => setLocalSubtitle(e.target.value)}
                                        rows={2}
                                        className="w-full my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300 bg-transparent focus:outline-none"
                                        autoFocus
                                    />
                                    {/* TOMBOL AKSI INLINE */}
                                    <div className="flex gap-1 shrink-0 pt-1">
                                        <button
                                            onClick={() => saveField('berita_subtitle')}
                                            disabled={false}//isloading
                                            title="Simpan"
                                            className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => cancelField('berita_subtitle')}
                                            title="Batal"
                                            className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* MODE LIHAT: TAMPILAN TEXT SUBJUDUL + EFEK HOVER */
                                <div
                                    onClick={() => setEditSubtitle(true)}
                                    className={`flex items-start gap-3 w-full group rounded transition-all duration-200 ${true ? 'hover:opacity-65 hover:bg-gray-50 dark:hover:bg-zinc-800/30 cursor-text select-none' : ''}`}
                                >
                                    <p className="my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300">
                                        {localSubtitle}
                                    </p>
                                    {/* IKON PENSIL DI UJUNG TEXT SUBJUDUL */}
                                    {true && (
                                        <span className="absolute right-0 lg:relative text-gray-300 dark:text-zinc-700 group-hover/sub:text-indigo-500 p-1 transition-colors shrink-0">
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative group/global">
                        <div className="absolute -inset-2 rounded-2xl flex items-center justify-center bg-transparent group-hover/global:bg-black/50 dark:group-hover/global:bg-white/5 transition-colors duration-200 z-15">
                            <Link
                                to="/backoffice/berita" // Sesuaikan dengan link halaman manajemen berita Anda
                                className="opacity-0 scale-95 group-hover/global:opacity-100 group-hover/global:scale-100 transition-all duration-200 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-lg flex items-center gap-2 border border-indigo-500/50 cursor-pointer"
                            >
                                {/* Ikon Pensil Sederhana */}
                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                                Kelola Konten Berita
                            </Link>
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
                            <Link to="/berita" className="font-semibold text-blue-700 dark:text-blue-200 hover:underline">
                                <div className="flex items-center space-x-2">
                                    <div>Lihat Berita Lainnya{' '}</div>
                                    <ArrowRightIcon className="size-5" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewsComponent;