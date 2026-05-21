import { useHomepageStore } from "@/store/useHomepageSettingStore";
import { ArrowRightIcon } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// 1. Data Kependudukan Desa Sejahtera sesuai request Anda
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
    const [, setActiveIndex] = useState<number | null>(null);
    const { homepageSetting } = useHomepageStore();

    const resident = {
        title: homepageSetting?.kependudukan_title,
        subtitle: homepageSetting?.kependudukan_subtitle
    }

    return (
        <div className="w-full">
            <div className="bg-white py-16 sm:py-48 dark:bg-green-700">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="w-full">
                        <div className="w-full lg:flex-auto text-center lg:text-left">
                            <h2 className="text-xl lg:text-4xl font-semibold tracking-tight text-pretty text-green-900 sm:text-5xl dark:text-white">
                                {resident.title}
                            </h2>
                            <div className="my-2 text-gray-600 dark:text-gray-300">
                                <div className="text-base lg:text-xl">{resident.subtitle}</div>
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