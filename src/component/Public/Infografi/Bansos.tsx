import { useMemo } from 'react';
import { Card } from 'flowbite-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

// Data simulasi (Mock Data) berformat snake_case siap integrasi API Go
const dataBansos = {
    total_kk_desa: 942,
    total_kk_penerima: 485, // 51.5% dari total KK desa
    total_kk_non_penerima: 457,
    anggaran_tersalurkan_sebulan: 185400000,

    alokasi_jenis: [
        { name: 'PKH (Keluarga Harapan)', total_kk: 145, anggaran_per_bulan: 'Rp 36.250.000' },
        { name: 'BPNT (Sembako)', total_kk: 210, anggaran_per_bulan: 'Rp 42.000.000' },
        { name: 'BLT Dana Desa', total_kk: 85, anggaran_per_bulan: 'Rp 25.500.000' },
        { name: 'PBI-JK (Kesehatan)', total_kk: 320, anggaran_per_bulan: 'Ditanggung Pusat' },
        { name: 'Bansos Lansia/Disabilitas', total_kk: 25, anggaran_per_bulan: 'Rp 7.500.000' },
    ],

    per_dusun: [
        { name: 'Dusun Selatan', penerima: 265, non_penerima: 235 },
        { name: 'Dusun Utara', penerima: 220, non_penerima: 222 },
    ],

    status_usulan: [
        { status: 'Diterima DTKS', jumlah: 42 },
        { status: 'Proses Verifikasi', jumlah: 18 },
        { status: 'Diusulkan Baru', jumlah: 25 },
    ]
};

const COLORS_PIE = ['#15803d', '#3b82f6', '#d97706']; // Hijau, Biru, Amber untuk Usulan

function BansosSubPage() {
    const d = dataBansos;

    // Menghitung persentase KK Penerima secara dinamis
    const persentasePenerima = useMemo(() => {
        return ((d.total_kk_penerima / d.total_kk_desa) * 100).toFixed(1);
    }, [d.total_kk_penerima, d.total_kk_desa]);

    return (
        <div className="max-w-6xl mx-auto space-y-8">

            {/* === HEADER HALAMAN === */}
            <div className="text-center border-b pb-6 border-gray-200 dark:border-gray-800">
                <h1 className="text-3xl font-semibold text-green-900 dark:text-white sm:text-4xl">
                    Infografis Transparansi Bantuan Sosial
                </h1>
                <p className="mt-2 py-4 text-gray-500 dark:text-green-300">
                    Peta distribusi program perlindungan sosial penanggulangan kemiskinan tingkat desa.
                </p>
            </div>

            {/* === SECTION 1: KARTU RINGKASAN UTAMA === */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-green-900 border-none shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-green-300">👥 Total KK Terdata</p>
                    <p className="text-3xl font-black text-gray-800 dark:text-white mt-1">{d.total_kk_desa} <span className="text-xs font-normal text-gray-500 dark:text-green-300">KK</span></p>
                </Card>

                <Card className="bg-white dark:bg-green-900 border-none shadow-sm border-l-4 border-l-green-600">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-green-300">💚 KK Penerima Manfaat</p>
                    <p className="text-3xl font-black text-green-600 mt-1">{d.total_kk_penerima} <span className="text-xs font-normal text-gray-500 dark:text-green-300">KK ({persentasePenerima}%)</span></p>
                </Card>

                <Card className="bg-white dark:bg-green-900 border-none shadow-sm border-l-4 border-l-gray-300">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-green-300">🏠 KK Non-Penerima</p>
                    <p className="text-3xl font-black text-gray-400 mt-1">{d.total_kk_non_penerima} <span className="text-xs font-normal text-gray-500 dark:text-green-300">KK</span></p>
                </Card>

                <Card className="bg-white dark:bg-green-900 border-none shadow-sm border-l-4 border-l-blue-600">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-green-300">💳 Estimasi Dana/Bulan</p>
                    <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-2.5">Rp {d.anggaran_tersalurkan_sebulan.toLocaleString('id-ID')}</p>
                </Card>
            </div>

            {/* === SECTION 2: BAR CHART JENIS BANSOS (HORIZONTAL AGAR TEXT PANJANG AMAN) === */}
            <Card className="bg-white dark:bg-green-900 border-none shadow-sm">
                <h3 className="text-sm font-bold text-green-900 dark:text-white mb-4 uppercase tracking-wide">📊 Distribusi Cakupan Per Program Bantuan</h3>
                <div className="w-full text-xs">
                    <ResponsiveContainer width="100%" height={260}>
                        {/* Menggunakan BarChart Horizontal (layout="vertical") agar label teks Bansos yang panjang tidak terpotong atau bertumpuk */}
                        <BarChart data={d.alokasi_jenis} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={false} />
                            <XAxis type="number" stroke="#9ca3af" />
                            <YAxis dataKey="name" type="category" stroke="#9ca3af" width={140} />
                            <Tooltip formatter={(value) => `${value} Keluarga (KK)`} />
                            <Bar dataKey="total_kk" name="Jumlah Penerima (KK)" fill="#16a34a" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* === SECTION 3: SEBARAN DUSUN (STACKED BAR) & STATUS USULAN BARU (DONUT) === */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                {/* Sebaran Dusun */}
                <Card className="bg-white dark:bg-green-900 border-none shadow-sm">
                    <h3 className="text-sm font-bold text-green-900 dark:text-white mb-2 uppercase tracking-wide">🏡 Proporsi Penerima Bansos Per Wilayah</h3>
                    <div className="w-full text-xs">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={d.per_dusun} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip />
                                <Legend />
                                {/* Menumpuk (stacked) agar mudah membandingkan total KK dan porsi penerimanya */}
                                <Bar dataKey="penerima" name="Menerima Bantuan" stackId="a" fill="#047857" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="non_penerima" name="Tidak Menerima" stackId="a" fill="#d1d5db" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Status Usulan Baru Melalui DTKS Desa */}
                <Card className="bg-white dark:bg-green-900 border-none shadow-sm flex flex-col justify-between">
                    <h3 className="text-sm font-bold text-green-900 dark:text-white mb-2 uppercase tracking-wide">⏳ Status Pengusulan Mandiri (DTKS)</h3>
                    <div className="w-full text-xs flex justify-center items-center">
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie
                                    data={d.status_usulan}
                                    cx="50%"
                                    cy="50%"
                                    label={false} // Bebas tabrakan teks, pindah ke legend kanan
                                    nameKey="status"
                                    outerRadius={65}
                                    innerRadius={45}
                                    dataKey="jumlah"
                                >
                                    {d.status_usulan.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} Jiwa/KK`} />
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    iconType="circle"
                                    iconSize={6}
                                    formatter={(value) => {
                                        const item = d.status_usulan.find(i => i.status === value);
                                        return <span className="text-gray-600 dark:text-green-200 text-[10px] font-medium">{value} ({item?.jumlah} Kasus)</span>;
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Kotak Info Ringkasan Hukum */}
                    <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 rounded-lg text-xs">
                        <p className="font-semibold text-blue-800 dark:text-blue-400 flex items-center gap-1">📌 Alur Pengusulan Transparan</p>
                        <p className="text-gray-600 dark:text-green-200 mt-1">
                            Warga desa yang merasa layak namun belum terdaftar dapat mengajukan usulan mandiri melalui operator SIKS-NG di Kantor Desa setiap jam kerja untuk diteruskan ke Kementerian Sosial RI.
                        </p>
                    </div>
                </Card>
            </div>

        </div>
    );
}

export default BansosSubPage;
