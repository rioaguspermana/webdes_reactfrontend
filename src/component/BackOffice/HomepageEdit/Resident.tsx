import { useAlertStore } from "@/store/useAlertStore";
import { useHomepageStore } from "@/store/useHomepageSettingStore";
import { ArrowRightIcon } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const dataSesuaiGender = [
    { name: "Jumlah Laki-laki", value: 1284, color: "bg-blue-500", hex: "#3b82f6" },
    { name: "Jumlah Perempuan", value: 1202, color: "bg-pink-500", hex: "#ec4899" },
];

const dataTambahan = [
    { name: "Jumlah Kepala Keluarga", value: 879, color: "bg-purple-500", hex: "#a855f7" }
];

// Menghitung otomatis Total Jumlah Penduduk (Laki-laki + Perempuan)
const totalPenduduk = dataSesuaiGender.reduce((acc, item) => acc + item.value, 0);

// Gabungkan data untuk render daftar legenda di sebelah kanan
const semuaLegenda = [
    { name: "Jumlah Penduduk", value: totalPenduduk, label: "Total Jiwa", color: "bg-blue-900" },
    ...dataTambahan.map(item => ({ name: item.name, value: item.value, label: "KK", color: item.color })),
    ...dataSesuaiGender.map(item => ({ name: item.name, value: item.value, label: `${((item.value / totalPenduduk) * 100).toFixed(1)}%`, color: item.color }))
];


function ResidentComponent() {
    const { showAlert } = useAlertStore()
    const [, setActiveIndex] = useState<number | null>(null);
    const { homepageSetting, updateFieldDinamic } = useHomepageStore();
    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [editSubtitle, setEditSubtitle] = useState<boolean>(false);
    const [localTitle, setLocalTitle] = useState<string>(homepageSetting?.kependudukan_title ?? '');
    const [localSubtitle, setLocalSubtitle] = useState<string>(homepageSetting?.kependudukan_subtitle ?? '');
    const titleFormRef = useRef<HTMLDivElement>(null);
    const subtitleFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (homepageSetting) {
            setLocalTitle(homepageSetting.kependudukan_title ?? '');
            setLocalSubtitle(homepageSetting.kependudukan_subtitle ?? '');
        }
    }, [homepageSetting]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent | PointerEvent) => {
            if (editTitle && titleFormRef.current && !titleFormRef.current.contains(event.target as Node)) {
                cancelField("kependudukan_title"); // Otomatis batal edit judul
            }
            if (editSubtitle && subtitleFormRef.current && !subtitleFormRef.current.contains(event.target as Node)) {
                cancelField("kependudukan_subtitle"); // Otomatis batal edit judul
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

    const saveField = async (field: 'kependudukan_title' | 'kependudukan_subtitle') => {
        try {
            if (field === 'kependudukan_title') {
                await updateFieldDinamic(field, localTitle);
                setEditTitle(false)
            } else if (field === 'kependudukan_subtitle') {
                await updateFieldDinamic(field, localSubtitle);
                setEditSubtitle(false)
            }
        } catch (err) {
            showAlert("Gagal menyimpan perubahan!", 'error', 3000);
        }
    };

    const cancelField = (field: 'kependudukan_title' | 'kependudukan_subtitle') => {
        if (homepageSetting) {
            if (field === 'kependudukan_title') {
                setLocalTitle(homepageSetting.kependudukan_title);
                setEditTitle(false)
            } else if (field === 'kependudukan_subtitle') {
                setLocalSubtitle(homepageSetting.kependudukan_subtitle);
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
                                                onClick={() => saveField('kependudukan_title')}
                                                disabled={false}//isloading
                                                title="Simpan"
                                                className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                            >
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => cancelField('kependudukan_title')}
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
                                            rows={5}
                                            className="w-full my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300 bg-transparent focus:outline-none"
                                            autoFocus
                                        />
                                        {/* TOMBOL AKSI INLINE */}
                                        <div className="flex gap-1 shrink-0 pt-1">
                                            <button
                                                onClick={() => saveField('kependudukan_subtitle')}
                                                disabled={false}//isloading
                                                title="Simpan"
                                                className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                            >
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => cancelField('kependudukan_subtitle')}
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
                        {/* Kontainer Utama Grafik & Legenda Berdampingan */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                            {/* SISI KIRI: Donut Chart dengan Angka Total di Tengah */}
                            <div className="relative w-1/2 flex items-center justify-center shrink-0">
                                <ResponsiveContainer width="100%" height={220}>
                                    <PieChart>
                                        <Tooltip
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0];
                                                    return (
                                                        <div className="bg-slate-950 text-white px-3 py-1.5 text-xs rounded-md shadow-md border border-slate-800 font-sans">
                                                            <p className="font-semibold">{data.name}</p>
                                                            <p className="text-slate-400 mt-0.5">
                                                                Jumlah: <span className="text-white font-bold">{Number(data.value).toLocaleString("id-ID")} Jiwa</span>
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Pie
                                            data={dataSesuaiGender}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={68}   // Membuat lubang tengah tipis elegan sesuai gambar
                                            outerRadius={85}   // Ketebalan ring lingkaran luar
                                            paddingAngle={2}   // Renggang halus antar potongan
                                            dataKey="value"
                                            startAngle={90}    // Memulai rotasi potongan dari atas arah jam 12
                                            endAngle={-270}
                                            onMouseEnter={(_, index) => setActiveIndex(index)}
                                            onMouseLeave={() => setActiveIndex(null)}
                                        >
                                            {dataSesuaiGender.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.hex} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                                {/* Angka Ringkasan Total Penduduk Tepat di Tengah Lingkaran */}
                                <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                                        {totalPenduduk.toLocaleString("id-ID")}
                                    </span>
                                </div>
                            </div>

                            {/* SISI KANAN: Daftar Informasi Legenda dengan Garis Vertikal */}
                            <div className="flex-1 w-full space-y-4">
                                {semuaLegenda.map((item, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        {/* Garis Vertikal Indikator Warna Khas Desain Tremor */}
                                        <span className={`w-1 h-10 rounded-full ${item.color} shrink-0`} />

                                        <div className="flex flex-col">
                                            {/* Baris Angka dan Label Persentase/Keterangan */}
                                            <div className="flex items-baseline space-x-1.5">
                                                <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                                                    {item.value.toLocaleString("id-ID")}
                                                </span>
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-300">
                                                    ({item.label})
                                                </span>
                                            </div>
                                            {/* Nama Kategori Data */}
                                            <span className="text-xs font-medium text-slate-500 dark:text-slate-300">
                                                {item.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-10 lg:mt-14 flex items-center justify-center gap-x-6 lg:justify-end">
                            <Link to="/infografis/penduduk" className="font-semibold text-blue-700 dark:text-blue-200 hover:underline">
                                <div className="flex items-center space-x-2">
                                    <div>Lihat Data Infografis Lebih lengkap{' '}</div>
                                    <ArrowRightIcon className="size-5" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResidentComponent;