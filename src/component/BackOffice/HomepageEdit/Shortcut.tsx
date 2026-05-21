import { Link } from "react-router-dom";
import { cleanFileUrl } from "@/@utils/cleanFileUrl";
import { classMerge } from "@/@utils/classMerge";
import { useEffect, useRef, useState } from "react";
import { useHomepageStore } from "@/store/useHomepageSettingStore";

const largeScreenShortcuts = [
    { name: 'Profil Desa', href: 'profil-desa', icon: 'icon_profil_desa.png' },
    { name: 'Infografis', href: 'infografis', icon: 'icon_infografis.png' },
    null,
    null,
    { name: 'Peta', href: 'peta', icon: 'icon_peta.png' },
    { name: 'IDM', href: 'infografis/idm', icon: 'icon_idm.png' },
    { name: 'Berita', href: 'berita', icon: 'icon_berita.png' },
    { name: 'Informasi (PPID)', href: 'ppid', icon: 'icon_informasi.png' },
    null,
]

const smallScreenShortcuts = [
    { name: 'Profil Desa', href: 'profil-desa', icon: 'icon_profil_desa.png' },
    { name: 'Infografis', href: 'infografis', icon: 'icon_infografis.png' },
    { name: 'Peta', href: 'peta', icon: 'icon_peta.png' },
    { name: 'IDM', href: 'infografis/idm', icon: 'icon_idm.png' },
    { name: 'Berita', href: 'berita', icon: 'icon_berita.png' },
    { name: 'Informasi (PPID)', href: 'ppid', icon: 'icon_informasi.png' },
]

function ShortcutComponent() {
    const { homepageSetting, updateFieldDinamic } = useHomepageStore();
    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [editSub, setEditSub] = useState<boolean>(false);
    const [editTitle2, setEditTitle2] = useState<boolean>(false);
    const [editSub2, setEditSub2] = useState<boolean>(false);
    const [localTitle, setLocalTitle] = useState<string>(homepageSetting?.shortcut_title ?? '');
    const [localSubTitle, setLocalSubTitle] = useState<string>(homepageSetting?.shortcut_subtitle ?? '');
    const titleFormRef = useRef<HTMLDivElement>(null);
    const subFormRef = useRef<HTMLDivElement>(null);
    const titleForm2Ref = useRef<HTMLDivElement>(null);
    const subForm2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (homepageSetting) {
            setLocalTitle(homepageSetting.shortcut_title ?? '');
            setLocalSubTitle(homepageSetting.shortcut_subtitle ?? '');
        }
    }, [homepageSetting]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent | PointerEvent) => {
            // Jika mode edit judul aktif DAN yang diklik BUKAN bagian dari form judul
            if (editTitle && titleFormRef.current && !titleFormRef.current.contains(event.target as Node)) {
                cancelField("shortcut_title", 1); // Otomatis batal edit judul
            }
            // Jika mode edit subjudul aktif DAN yang diklik BUKAN bagian dari form subjudul
            if (editSub && subFormRef.current && !subFormRef.current.contains(event.target as Node)) {
                cancelField("shortcut_subtitle", 1); // Otomatis batal edit subjudul
            }
            // Jika mode edit judul aktif DAN yang diklik BUKAN bagian dari form judul
            if (editTitle2 && titleForm2Ref.current && !titleForm2Ref.current.contains(event.target as Node)) {
                cancelField("shortcut_title", 2); // Otomatis batal edit judul
            }
            // Jika mode edit subjudul aktif DAN yang diklik BUKAN bagian dari form subjudul
            if (editSub2 && subForm2Ref.current && !subForm2Ref.current.contains(event.target as Node)) {
                cancelField("shortcut_subtitle", 2); // Otomatis batal edit subjudul
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
    }, [editTitle, editSub, editTitle2, editSub2]);

    const saveField = async (field: 'shortcut_title' | 'shortcut_subtitle', ref: number) => {
        try {
            if (field === 'shortcut_title') {
                await updateFieldDinamic(field, localTitle);
                ref === 1 ? setEditTitle(false) : setEditTitle2(false);
            } else if (field === 'shortcut_subtitle') {
                await updateFieldDinamic(field, localSubTitle);
                ref === 1 ? setEditSub(false) : setEditSub2(false);
            }
        } catch (err) {
            alert("Gagal menyimpan perubahan!");
        }
    };

    const cancelField = (field: 'shortcut_title' | 'shortcut_subtitle', ref: number) => {
        if (homepageSetting) {
            if (field === 'shortcut_title') {
                setLocalTitle(homepageSetting.shortcut_title);
                ref === 1 ? setEditTitle(false) : setEditTitle2(false);
            } else if (field === 'shortcut_subtitle') {
                setLocalSubTitle(homepageSetting.shortcut_subtitle);
                ref === 1 ? setEditSub(false) : setEditSub2(false);
            }
        }
    };

    return (
        <div className="w-full" >
            <div className="bg-white py-16 sm:py-48 dark:bg-green-700">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    {/** For large screen */}
                    <div className="hidden lg:grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                        <div className="mx-auto w-full max-w-xl lg:mx-0">
                            <div className="relative group/title">
                                {editTitle ? (
                                    /* MODE EDIT: INPUT JUDUL */
                                    <div ref={titleFormRef} className="flex items-center gap-3 w-full border-b border-indigo-500 bg-indigo-50/30 dark:bg-zinc-800/50 px-2 py-1 rounded-t">
                                        <input
                                            type="text"
                                            value={localTitle}
                                            placeholder={localTitle}
                                            onChange={(e) => setLocalTitle(e.target.value)}
                                            className="w-full text-4xl font-semibold text-teal-950 dark:text-white bg-transparent focus:outline-none tracking-tight"
                                            autoFocus
                                        />
                                        {/* TOMBOL AKSI INLINE */}
                                        <div className="flex gap-1 shrink-0">
                                            <button
                                                onClick={() => saveField('shortcut_title', 1)}
                                                disabled={false}//isloading
                                                title="Simpan"
                                                className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                            >
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => cancelField('shortcut_title', 1)}
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
                                        className={`inline-flex items-baseline gap-3 group rounded transition-all duration-200 ${true ? 'hover:opacity-65 hover:bg-gray-50 dark:hover:bg-zinc-800/30 cursor-text select-none' : ''}`}
                                    >
                                        <h2 className="text-4xl font-semibold text-teal-950 dark:text-white tracking-tight leading-tight flex-1">
                                            {localTitle}
                                        </h2>
                                        {/* IKON PENSIL DI UJUNG TEXT */}
                                        {true && (
                                            <span className="text-gray-300 dark:text-zinc-600 group-hover/title:text-indigo-500 p-1 transition-colors shrink-0 pt-2">
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="relative group/sub">
                                {editSub ? (
                                    /* MODE EDIT: TEXTAREA SUBJUDUL */
                                    <div ref={subFormRef} className="flex items-start gap-3 w-full border-b border-indigo-500 bg-indigo-50/30 dark:bg-zinc-800/50 px-2 py-1 rounded-t">
                                        <textarea
                                            value={localSubTitle}
                                            onChange={(e) => setLocalSubTitle(e.target.value)}
                                            rows={4}
                                            className="w-full mt-4 my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300 bg-transparent focus:outline-none"
                                            autoFocus
                                        />
                                        {/* TOMBOL AKSI INLINE */}
                                        <div className="flex gap-1 shrink-0 pt-1">
                                            <button
                                                onClick={() => saveField('shortcut_subtitle', 1)}
                                                disabled={false}//isloading
                                                title="Simpan"
                                                className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                            >
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => cancelField('shortcut_subtitle', 1)}
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
                                        onClick={() => setEditSub(true)}
                                        className={`flex items-start gap-3 w-full group rounded transition-all duration-200 ${true ? 'hover:opacity-65 hover:bg-gray-50 dark:hover:bg-zinc-800/30 cursor-text select-none' : ''}`}
                                    >
                                        <p className="mt-4 my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300">
                                            {localSubTitle}
                                        </p>
                                        {/* IKON PENSIL DI UJUNG TEXT SUBJUDUL */}
                                        {true && (
                                            <span className="text-gray-300 dark:text-zinc-700 group-hover/sub:text-indigo-500 p-1 transition-colors shrink-0">
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mx-auto grid w-full max-w-xl grid-cols-3 items-center gap-y-2 sm:gap-y-2 gap-x-2 lg:mx-0 lg:max-w-none lg:pl-8">
                            {largeScreenShortcuts.map((shortcut, i) => (
                                <div key={i} className={classMerge(shortcut ? "link-neumorphism" : "", "h-30 text-center")}>
                                    {shortcut
                                        ? (
                                            <Link to={shortcut.href} className="grid h-full w-full">
                                                <div className="flex justify-center">
                                                    <img
                                                        src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, shortcut.icon)}
                                                        alt={shortcut.name}
                                                        width={105}
                                                        height={48} />
                                                </div>
                                                <div className="text-gray-500 dark:text-white font-semibold">{shortcut.name}</div>
                                            </Link>
                                        )
                                        : (<div></div>)}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/** For small screen */}
                    <div className="grid lg:hidden grid-cols-1 items-center gap-x-8 gap-y-8 lg:grid-cols-2">
                        <div className="mx-auto w-full max-w-xl lg:mx-0">
                            <div className="relative group/title">
                                {editTitle2 ? (
                                    /* MODE EDIT: INPUT JUDUL */
                                    <div ref={titleForm2Ref} className="flex items-center gap-3 w-full border-b border-indigo-500 bg-indigo-50/30 dark:bg-zinc-800/50 px-2 py-1 rounded-t">
                                        <input
                                            type="text"
                                            value={localTitle}
                                            placeholder={localTitle}
                                            onChange={(e) => setLocalTitle(e.target.value)}
                                            className="w-full my-2 text-base lg:text-xl font-semibold text-teal-950 dark:text-white bg-transparent focus:outline-none tracking-tight"
                                            autoFocus
                                        />
                                        {/* TOMBOL AKSI INLINE */}
                                        <div className="flex gap-1 shrink-0">
                                            <button
                                                onClick={() => saveField('shortcut_title', 2)}
                                                disabled={false}//isloading
                                                title="Simpan"
                                                className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                            >
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => cancelField('shortcut_title', 2)}
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
                                        onClick={() => setEditTitle2(true)}
                                        className={`flex justify-self-center gap-3 group rounded p-1 transition-all duration-200 ${true ? 'hover:opacity-65 hover:bg-gray-50 dark:hover:bg-zinc-800/30 cursor-text select-none' : ''}`}
                                    >
                                        <h2 className="my-2 text-base lg:text-xl font-semibold text-teal-950 dark:text-white tracking-tight leading-tight flex-1">
                                            {localTitle}
                                        </h2>
                                        {/* IKON PENSIL DI UJUNG TEXT */}
                                        {true && (
                                            <span className="absolute right-0 text-gray-300 dark:text-zinc-600 group-hover/title:text-indigo-500 p-1 transition-colors shrink-0 pt-2">
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="relative group/sub">
                                {editSub2 ? (
                                    /* MODE EDIT: TEXTAREA SUBJUDUL */
                                    <div ref={subForm2Ref} className="flex items-start gap-3 w-full border-b border-indigo-500 bg-indigo-50/30 dark:bg-zinc-800/50 px-2 py-1 rounded-t">
                                        <textarea
                                            value={localSubTitle}
                                            onChange={(e) => setLocalSubTitle(e.target.value)}
                                            rows={4}
                                            className="w-full mt-4 my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300 bg-transparent focus:outline-none"
                                            autoFocus
                                        />
                                        {/* TOMBOL AKSI INLINE */}
                                        <div className="flex gap-1 shrink-0 pt-1">
                                            <button
                                                onClick={() => saveField('shortcut_subtitle', 2)}
                                                disabled={false}//isloading
                                                title="Simpan"
                                                className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                            >
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => cancelField('shortcut_subtitle', 2)}
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
                                        onClick={() => setEditSub2(true)}
                                        className={`flex items-start gap-3 w-full group rounded p-1 transition-all duration-200 ${true ? 'hover:opacity-65 hover:bg-gray-50 dark:hover:bg-zinc-800/30 cursor-text select-none' : ''}`}
                                    >
                                        <p className="text-center my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300">
                                            {localSubTitle}
                                        </p>
                                        {/* IKON PENSIL DI UJUNG TEXT SUBJUDUL */}
                                        {true && (
                                            <span className="absolute right-0 text-gray-300 dark:text-zinc-700 group-hover/sub:text-indigo-500 p-1 transition-colors shrink-0">
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mx-auto grid w-full max-w-xl grid-cols-3 items-center gap-y-8 sm:gap-y-8 gap-x-8 lg:mx-0 lg:max-w-none lg:pl-8">
                            {smallScreenShortcuts.map((shortcut, i) => (
                                <div key={i} className={`link-neumorphism h-24 flex justify-center text-center`}>
                                    <Link key={shortcut.name} to={shortcut.href} className="flex-row content-center justify-items-center">
                                        <div className="w-14">
                                            <img
                                                src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, shortcut.icon)}
                                                alt={shortcut.name}
                                                width={105}
                                                height={48} />
                                        </div>
                                        <div className="text-gray-500 dark:text-white text-xs">{shortcut.name}</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShortcutComponent;