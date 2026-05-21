import { useMemo } from 'react';
import { Card } from 'flowbite-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

// Data simulasi (Mock Data) berformat snake_case siap integrasi API Go
const dataStunting = {
    total_balita: 420,
    balita_stunting: 18,
    balita_normal: 402,
    prevalensi: '4.2%', // 18 dari 420 Balita

    tren_tahunan: [
        { tahun: '2024', total_kasus: 32, target_nasional: 14 },
        { tahun: '2025', total_kasus: 24, target_nasional: 14 },
        { tahun: '2026', total_kasus: 18, target_nasional: 14 },
    ],

    per_dusun: [
        { name: 'Dusun Selatan', stunting: 11, normal: 210 },
        { name: 'Dusun Utara', stunting: 7, normal: 192 },
    ],

    golongan_usia: [
        { range: '0-11 Bulan', jumlah: 2 },
        { range: '12-23 Bulan', jumlah: 5 },
        { range: '24-35 Bulan', jumlah: 7 }, // Kasus Tertinggi
        { range: '36-47 Bulan', jumlah: 3 },
        { range: '48-59 Bulan', jumlah: 1 },
    ]
};

const COLORS_AGE = ['#0284c7', '#0369a1', '#075985', '#0c4a6e', '#1e3a8a']; // Gradasi Biru

function StuntingSubPage() {
    const d = dataStunting;

    // Mencari kelompok usia dengan kasus tertinggi secara dinamis
    const usiaTertinggi = useMemo(() => {
        return [...d.golongan_usia].sort((a, b) => b.jumlah - a.jumlah)[0];
    }, [d.golongan_usia]);

    return (
        <div className="max-w-6xl mx-auto space-y-8">

            {/* === HEADER HALAMAN === */}
            <div className="text-center border-b pb-6 border-gray-200 dark:border-gray-800">
                <h1 className="text-3xl font-semibold text-green-900 dark:text-white sm:text-4xl">
                    Infografis Pencegahan & Data Stunting
                </h1>
                <p className="mt-2 py-2 text-gray-500 dark:text-green-300">
                    Pemantauan status gizi balita berkala guna mewujudkan Desa Sejahtera Bebas Stunting (Zero Stunting).
                </p>
            </div>

            {/* === SECTION 1: KARTU RINGKASAN UTAMA === */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-green-900 border-none shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-green-300">👶 Total Balita Terdata</p>
                    <p className="text-3xl font-black text-gray-800 dark:text-white mt-1">{d.total_balita} <span className="text-xs font-normal text-gray-500 dark:text-green-300">Anak</span></p>
                </Card>

                <Card className="bg-white dark:bg-green-900 border-none shadow-sm border-l-4 border-l-red-600">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-green-300">⚠️ Terindikasi Stunting</p>
                    <p className="text-3xl font-black text-red-600 mt-1">{d.balita_stunting} <span className="text-xs font-normal text-gray-500 dark:text-green-300">Anak</span></p>
                </Card>

                <Card className="bg-white dark:bg-green-900 border-none shadow-sm border-l-4 border-l-green-600">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-green-300">✅ Berstatus Normal</p>
                    <p className="text-3xl font-black text-green-600 mt-1">{d.balita_normal} <span className="text-xs font-normal text-gray-500 dark:text-green-300">Anak</span></p>
                </Card>

                <Card className="bg-white dark:bg-green-900 border-none shadow-sm border-l-4 border-l-amber-500">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-green-300">📊 Prevalensi Stunting</p>
                    <p className="text-3xl font-black text-amber-500 mt-1">{d.prevalensi}</p>
                </Card>
            </div>

            {/* === SECTION 2: TREN PENURUNAN TAHUNAN (LINE CHART) === */}
            <Card className="bg-white dark:bg-green-900 border-none shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 mb-2 dark:border-green-800">
                    <div>
                        <h3 className="text-base font-bold text-green-900 dark:text-white">📉 Tren Kasus Stunting</h3>
                        <p className="text-xs text-gray-400 dark:text-green-300">Garis indeks total kasus aktif dari tahun ke tahun dibanding ambang batas target nasional.</p>
                    </div>
                </div>
                <div className="w-full text-xs">
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={d.tren_tahunan} margin={{ top: 10, right: 20, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <XAxis dataKey="tahun" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total_kasus" name="Kasus Aktif Desa" stroke="#dc2626" strokeWidth={3} dot={{ r: 5 }} />
                            <Line dataKey="target_nasional" name="Ambang Target Nasional" stroke="#9ca3af" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* === SECTION 3: DATA SEBARAN PER DUSUN (STACKED BAR) & GOLONGAN USIA === */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                {/* Grafik Per Dusun (Mencegah teks menumpuk dengan Stacked Bar) */}
                <Card className="bg-white dark:bg-green-900 border-none shadow-sm">
                    <h3 className="text-sm font-bold text-green-900 dark:text-white mb-2 uppercase tracking-wide">🏡 Distribusi Kasus Per Wilayah Dusun</h3>
                    <div className="w-full text-xs">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={d.per_dusun} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip />
                                <Legend />
                                {/* Memisahkan batang stunting dan normal secara berdampingan agar sebaran wilayah terlihat jelas */}
                                <Bar dataKey="stunting" name="Anak Stunting" fill="#dc2626" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="normal" name="Anak Normal" fill="#16a34a" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Grafik Komposisi Golongan Usia */}
                <Card className="bg-white dark:bg-green-900 border-none shadow-sm flex flex-col justify-between">
                    <h3 className="text-sm font-bold text-green-900 dark:text-white mb-2 uppercase tracking-wide">👶 Sebaran Kasus Berdasarkan Golongan Usia</h3>
                    <div className="w-full text-xs flex justify-center items-center">
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={d.golongan_usia}
                                    cx="50%"
                                    cy="50%"
                                    label={false}
                                    // 🔥 KUNCI PERBAIKAN: Tambahkan nameKey agar Legend tahu field mana yang menjadi teks label
                                    nameKey="range"
                                    outerRadius={65}
                                    innerRadius={40}
                                    dataKey="jumlah"
                                >
                                    {d.golongan_usia.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS_AGE[index % COLORS_AGE.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} Anak`} />
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    iconType="circle"
                                    iconSize={6}
                                    formatter={(value) => {
                                        // Now 'value' will correctly receive '0-11 Bulan', '12-23 Bulan', etc.
                                        const item = d.golongan_usia.find(i => i.range === value);
                                        return (
                                            <span className="text-gray-600 dark:text-green-200 text-[10px] font-medium">
                                                {value} ({item?.jumlah ?? 0} Anak)
                                            </span>
                                        );
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                    </div>

                    {/* Kotak Summary Analisis Usaha */}
                    <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg text-xs">
                        <p className="font-semibold text-amber-800 dark:text-amber-400 flex items-center gap-1">📌 Titik Kerawanan Usia Balita</p>
                        <p className="text-gray-600 dark:text-green-200 mt-1">
                            Kasus terbanyak terdeteksi pada rentang usia <strong className="text-gray-900 dark:text-white">{usiaTertinggi?.range}</strong> dengan total <strong className="text-gray-900 dark:text-white">{usiaTertinggi?.jumlah} anak</strong>. Sektor ini menjadi fokus utama penyaluran PMT (Pemberian Makanan Tambahan) Puskesmas Desa.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default StuntingSubPage;