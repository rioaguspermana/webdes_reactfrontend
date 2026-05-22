import { useHomepageStore } from "@/store/useHomepageSettingStore";
import { ArrowRightIcon } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Data Contoh pendapatan vs belanja Belanja Desa
const dataAPBDesa = [
    { tahun: "2023", pendapatan: 520, belanja: 440 },
    { tahun: "2024", pendapatan: 680, belanja: 450 },
    { tahun: "2025", pendapatan: 750, belanja: 690 },
];


function VillageBudgetComponent() {
    // Fungsi pemformat angka rupiah singkat (Juta)
    const formatRupiahSingkat = (value: number) => `${value} Jt`;
    const { homepageSetting, updateFieldDinamic } = useHomepageStore();
    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [editSubtitle, setEditSubtitle] = useState<boolean>(false);
    const [localTitle, setLocalTitle] = useState<string>(homepageSetting?.apbdesa_title ?? '');
    const [localSubtitle, setLocalSubtitle] = useState<string>(homepageSetting?.apbdesa_subtitle ?? '');
    const titleFormRef = useRef<HTMLDivElement>(null);
    const subtitleFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (homepageSetting) {
            setLocalTitle(homepageSetting?.apbdesa_title ?? '');
            setLocalSubtitle(homepageSetting.apbdesa_subtitle ?? '');
        }
    }, [homepageSetting]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent | PointerEvent) => {
            if (editTitle && titleFormRef.current && !titleFormRef.current.contains(event.target as Node)) {
                cancelField("apbdesa_title"); // Otomatis batal edit judul
            }
            if (editSubtitle && subtitleFormRef.current && !subtitleFormRef.current.contains(event.target as Node)) {
                cancelField("apbdesa_subtitle"); // Otomatis batal edit judul
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

    const saveField = async (field: 'apbdesa_title' | 'apbdesa_subtitle') => {
        try {
            if (field === 'apbdesa_title') {
                await updateFieldDinamic(field, localTitle);
                setEditTitle(false)
            } else if (field === 'apbdesa_subtitle') {
                await updateFieldDinamic(field, localSubtitle);
                setEditSubtitle(false)
            }
        } catch (err) {
            alert("Gagal menyimpan perubahan!");
        }
    };

    const cancelField = (field: 'apbdesa_title' | 'apbdesa_subtitle') => {
        if (homepageSetting) {
            if (field === 'apbdesa_title') {
                setLocalTitle(homepageSetting?.apbdesa_title);
                setEditTitle(false)
            } else if (field === 'apbdesa_subtitle') {
                setLocalSubtitle(homepageSetting.apbdesa_subtitle);
                setEditSubtitle(false)
            }
        }
    };

    return (
        <div className="w-full">
            <div className="bg-white py-16 sm:py-48 dark:bg-green-700">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="w-full">
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
                                                onClick={() => saveField('apbdesa_title')}
                                                disabled={false}//isloading
                                                title="Simpan"
                                                className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                            >
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => cancelField('apbdesa_title')}
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
                                            rows={2}
                                            className="w-full my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300 bg-transparent focus:outline-none"
                                            autoFocus
                                        />
                                        {/* TOMBOL AKSI INLINE */}
                                        <div className="flex gap-1 shrink-0 pt-1">
                                            <button
                                                onClick={() => saveField('apbdesa_subtitle')}
                                                disabled={false}//isloading
                                                title="Simpan"
                                                className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                            >
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => cancelField('apbdesa_subtitle')}
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
                                    to="/backoffice/infografis/apbdes" // Sesuaikan dengan link halaman manajemen berita Anda
                                    className="opacity-0 scale-95 group-hover/global:opacity-100 group-hover/global:scale-100 transition-all duration-200 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-lg flex items-center gap-2 border border-indigo-500/50 cursor-pointer"
                                >
                                    {/* Ikon Pensil Sederhana */}
                                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                    Kelola Data APB Desa
                                </Link>
                            </div>
                            <div>
                                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                                    <div className="w-full z-0">
                                        <ResponsiveContainer width="100%" height={320}>
                                            <BarChart
                                                data={dataAPBDesa}
                                                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis
                                                    dataKey="tahun"
                                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                />
                                                <YAxis
                                                    tickFormatter={formatRupiahSingkat}
                                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                />
                                                <Tooltip
                                                    cursor={{ fill: '#f8fafc', opacity: 0.5 }}
                                                    content={({ active, payload }) => {
                                                        if (active && payload && payload.length) {
                                                            return (
                                                                <div className="bg-slate-950 text-white p-3 text-xs rounded-md shadow-md border border-slate-800 font-sans min-w-57.5">
                                                                    <p className="font-bold border-b border-slate-800 pb-1 mb-1.5 text-slate-300">
                                                                        {payload[0].payload.tahun}
                                                                    </p>
                                                                    <p className="flex justify-between gap-4">
                                                                        Pendapatan: <span className="font-bold text-blue-400">Rp {payload[0].value} Jt</span>
                                                                    </p>
                                                                    <p className="flex justify-between gap-4 mt-1">
                                                                        Belanja: <span className="font-bold text-emerald-400">Rp {payload[1].value} Jt</span>
                                                                    </p>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                                <Legend
                                                    verticalAlign="top"
                                                    height={36}
                                                    iconType="circle"
                                                    iconSize={8}
                                                    wrapperStyle={{ fontSize: '14px', fontWeight: 500, textTransform: 'capitalize' }}
                                                />

                                                {/* Batang 1: pendapatan (Biru Minimalis) */}
                                                <Bar
                                                    dataKey="pendapatan"
                                                    fill="#3b82f6"
                                                    radius={[4, 4, 0, 0]}
                                                    maxBarSize={32}
                                                />

                                                {/* Batang 2: belanja (Hijau Menawan) */}
                                                <Bar
                                                    dataKey="belanja"
                                                    fill="#10b981"
                                                    radius={[4, 4, 0, 0]}
                                                    maxBarSize={32}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="mt-10 lg:mt-14 flex items-center justify-center gap-x-6 lg:justify-end">
                                    <Link to="/infografis/apbdes" className="font-semibold text-blue-700 dark:text-blue-200 hover:underline">
                                        <div className="flex items-center space-x-2">
                                            <div>Lihat Data APB Desa Lebih lengkap{' '}</div>
                                            <ArrowRightIcon className="size-5" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VillageBudgetComponent;