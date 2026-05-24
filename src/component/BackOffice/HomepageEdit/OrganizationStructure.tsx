import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { cleanFileUrl } from "../../../@utils/cleanFileUrl";
import { useEffect, useRef, useState } from "react";
import { useHomepageStore } from "@/store/useHomepageSettingStore";
import { useAlertStore } from "@/store/useAlertStore";

interface Sotk {
    name: string;
    role: string;
    image: string;
}

const people: Sotk[] = [
    { name: 'Haryanto SE', role: 'Kepala Desa', image: 'sotk_1.png' },
    { name: 'Budi Santoso', role: 'Sekertaris Desa', image: 'sotk_2.png' },
    { name: 'Yusnikarani', role: 'Kepala Seksi Kesejahteraan', image: 'sotk_3.png' },
    { name: 'Dewi Kartika', role: 'Kepala Seksi Pemerintahan', image: 'sotk_4.png' },
    { name: 'Rudi Hartono', role: 'Kepala Urusan Umum & Perencanaan', image: 'sotk_5.png' },
    { name: 'Lina Marlina', role: 'Kepala Urusan Keuangan', image: 'sotk_6.png' },
    { name: 'Fitri Ayu', role: 'Staf Kesejahteraan', image: 'sotk_7.png' },
    { name: 'Lisa Eka Putri', role: 'Staf Pemerintahan', image: 'sotk_8.png' },
    { name: 'Maya Sari', role: 'Staf Pemerintahan', image: 'sotk_9.png' },
    { name: 'Hasan Basri', role: 'Staff Umum', image: 'sotk_10.png' },
    { name: 'Irwan Munandar', role: 'Kepala Dusun Selatan', image: 'sotk_11.png' },
    { name: 'Siswanto', role: 'Kepala Dusun Utara', image: 'sotk_12.png' },
]

function OrganizationStructureComponent(): React.JSX.Element {
    const { showAlert } = useAlertStore()
    const { homepageSetting, updateFieldDinamic } = useHomepageStore();
    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [editSubtitle, setEditSubtitle] = useState<boolean>(false);
    const [localTitle, setLocalTitle] = useState<string>(homepageSetting?.sotk_title ?? '');
    const [localSubtitle, setLocalSubtitle] = useState<string>(homepageSetting?.sotk_subtitle ?? '');
    const titleFormRef = useRef<HTMLDivElement>(null);
    const subtitleFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (homepageSetting) {
            setLocalTitle(homepageSetting.sotk_title ?? '');
            setLocalSubtitle(homepageSetting.sotk_subtitle ?? '');
        }
    }, [homepageSetting]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent | PointerEvent) => {
            if (editTitle && titleFormRef.current && !titleFormRef.current.contains(event.target as Node)) {
                cancelField("sotk_title"); // Otomatis batal edit judul
            }
            if (editSubtitle && subtitleFormRef.current && !subtitleFormRef.current.contains(event.target as Node)) {
                cancelField("sotk_subtitle"); // Otomatis batal edit judul
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

    const saveField = async (field: 'sotk_title' | 'sotk_subtitle') => {
        try {
            if (field === 'sotk_title') {
                await updateFieldDinamic(field, localTitle);
                setEditTitle(false)
            } else if (field === 'sotk_subtitle') {
                await updateFieldDinamic(field, localSubtitle);
                setEditSubtitle(false)
            }
        } catch (err) {
            showAlert("Gagal menyimpan perubahan!", 'error', 3000);
        }
    };

    const cancelField = (field: 'sotk_title' | 'sotk_subtitle') => {
        if (homepageSetting) {
            if (field === 'sotk_title') {
                setLocalTitle(homepageSetting.sotk_title);
                setEditTitle(false)
            } else if (field === 'sotk_subtitle') {
                setLocalSubtitle(homepageSetting.sotk_subtitle);
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
                                        className="w-full text-xl lg:text-4xl font-semibold text-teal-950 dark:text-white bg-transparent focus:outline-none tracking-tight"
                                        autoFocus
                                    />
                                    {/* TOMBOL AKSI INLINE */}
                                    <div className="flex gap-1 shrink-0">
                                        <button
                                            onClick={() => saveField('sotk_title')}
                                            disabled={false}//isloading
                                            title="Simpan"
                                            className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => cancelField('sotk_title')}
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
                                        rows={1}
                                        className="w-full my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300 bg-transparent focus:outline-none"
                                        autoFocus
                                    />
                                    {/* TOMBOL AKSI INLINE */}
                                    <div className="flex gap-1 shrink-0 pt-1">
                                        <button
                                            onClick={() => saveField('sotk_subtitle')}
                                            disabled={false}//isloading
                                            title="Simpan"
                                            className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => cancelField('sotk_subtitle')}
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
                    {/** Large Screen */}
                    <div className="hidden lg:block">
                        <ul
                            role="list"
                            className="mx-auto mt-20 max-w-2xl grid grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                        >
                            {people.map((person, i) => (
                                <li key={i}>
                                    <img
                                        alt={person.role}
                                        src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, person.image)}
                                        className={`${i === 0 ? 'border-2 border-blue-100 dark:border-green-800 outline-4 outline-blue-600 dark:outline-green-300' : 'outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10'} mx-auto size-24 rounded-full`}
                                    />
                                    <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {person.name}
                                    </h3>
                                    <p className="text-sm/6 text-gray-600 dark:text-gray-400">{person.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/** Small Screen */}
                    <div className="block lg:hidden">
                        <ul
                            role="list"
                            className="mx-auto mt-20 max-w-2xl grid grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                        >
                            {people.slice(0, 4).map((person, i) => (
                                <li key={i}>
                                    <img
                                        alt={person.role}
                                        src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, person.image)}
                                        className={`${i === 0 ? 'border-2 border-blue-100 dark:border-green-800 outline-4 outline-blue-600 dark:outline-green-300' : 'outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10'} mx-auto size-24 rounded-full`}
                                    />
                                    <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {person.name}
                                    </h3>
                                    <p className="text-sm/6 text-gray-600 dark:text-gray-400">{person.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-10 lg:mt-14 flex items-center justify-center gap-x-6 lg:justify-end">
                        <Link to="/sotk" className="font-semibold text-blue-700 dark:text-blue-200 hover:underline">
                            <div className="flex items-center space-x-2">
                                <div>Lihat Struktur Lebih lengkap{' '}</div>
                                <ArrowRightIcon className="size-5" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizationStructureComponent;