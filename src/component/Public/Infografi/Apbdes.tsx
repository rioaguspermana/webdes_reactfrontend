import { useState } from 'react';
import { Card, Select } from 'flowbite-react';
import {
    Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    ComposedChart, Line
} from 'recharts';
import { ApbdesData } from '@/@types/apbdes';

// Data simulasi (Mock Data) berformat snake_case sesuai gambar infografis Anda
const dataHistoryAPBDes: ApbdesData[] = [
    { tahun: 2021, pendapatan: 521400000, belanja: 510000000, pembiayaan_penerimaan: 15000000, pembiayaan_pengeluaran: 10000000 },
    { tahun: 2022, pendapatan: 681000000, belanja: 650000000, pembiayaan_penerimaan: 20000000, pembiayaan_pengeluaran: 15000000 },
    { tahun: 2023, pendapatan: 4254715300, belanja: 4235656389, pembiayaan_penerimaan: 125939089, pembiayaan_pengeluaran: 145000000 },
    { tahun: 2024, pendapatan: 4400000000, belanja: 4350000000, pembiayaan_penerimaan: 130000000, pembiayaan_pengeluaran: 140000000 },
    { tahun: 2025, pendapatan: 3800000000, belanja: 3750000000, pembiayaan_penerimaan: 110000000, pembiayaan_pengeluaran: 135000000 },
];

function ApbdesSubPage() {
    const [selectedTahun, setSelectedTahun] = useState<number>(2023);

    // Mengambil ringkasan data anggaran berdasarkan tahun yang dipilih
    const summaryData = dataHistoryAPBDes.find((item) => item.tahun === selectedTahun) || dataHistoryAPBDes[2];

    // Menghitung Surplus atau Defisit Anggaran secara otomatis
    const sisaAnggaran = summaryData.pendapatan - summaryData.belanja;

    return (
        <div className="max-w-6xl mx-auto space-y-8">

            {/* === HEADER & SELECTOR TAHUN === */}
            <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-6 border-gray-200 dark:border-green-800 gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-semibold text-green-900 dark:text-white">
                        Transparansi APBDesa Sejahtera
                    </h1>
                    <p className="text-gray-500 dark:text-green-300">
                        Kecamatan Sukamaju, Kabupaten Sentosa, Provinsi Jawa Barat
                    </p>
                </div>
                {/* Tombol Pilihan Tahun yang Rapi */}
                <div className="w-32">
                    <Select id="tahun-select" value={selectedTahun} color='success' onChange={(e) => setSelectedTahun(Number(e.target.value))}>
                        {dataHistoryAPBDes.map((item) => (
                            <option key={item.tahun} value={item.tahun}>Tahun {item.tahun}</option>
                        ))}
                    </Select>
                </div>
            </div>

            {/* === SECTION 1: 4 KARTU RINGKASAN ANGGARAN (KONTRAST TEMA DARK) === */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-green-900 border-l-4 border-l-green-600 border-none shadow-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-green-300">💰 Total Pendapatan</p>
                    <p className="text-xl font-black text-green-800 dark:text-white mt-1">Rp {summaryData.pendapatan.toLocaleString('id-ID')}</p>
                </Card>

                <Card className="bg-white dark:bg-green-900 border-l-4 border-l-red-500 border-none shadow-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-green-300">💸 Total Belanja</p>
                    <p className="text-xl font-black text-red-600 dark:text-red-400 mt-1">Rp {summaryData.belanja.toLocaleString('id-ID')}</p>
                </Card>

                <Card className="bg-white dark:bg-green-900 border-l-4 border-l-blue-600 border-none shadow-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-green-300">📥 Pembiayaan (Penerimaan)</p>
                    <p className="text-xl font-black text-blue-700 dark:text-blue-300 mt-1">Rp {summaryData.pembiayaan_penerimaan.toLocaleString('id-ID')}</p>
                </Card>

                <Card className="bg-white dark:bg-green-900 border-l-4 border-l-amber-500 border-none shadow-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-green-300">📤 Pembiayaan (Pengeluaran)</p>
                    <p className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">Rp {summaryData.pembiayaan_pengeluaran.toLocaleString('id-ID')}</p>
                </Card>
            </div>

            {/* Box Status Surplus / Defisit Bersih */}
            <div className={`p-4 rounded-xl border text-center font-semibold text-sm shadow-sm ${sisaAnggaran >= 0
                ? 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-200 dark:border-green-800'
                : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-200 dark:border-red-900'
                }`}>
                ⚖️ Status Anggaran Berjalan: {sisaAnggaran >= 0 ? `SURPLUS (Sisa Rp ${sisaAnggaran.toLocaleString('id-ID')})` : `DEFISIT (Minus Rp ${Math.abs(sisaAnggaran).toLocaleString('id-ID')})`}
            </div>

            {/* === SECTION 2: GRAFIK TREN HISTORI TAHUN KE TAHUN (UPGRADE KONTEN) === */}
            <Card className="bg-white dark:bg-green-900 border-none shadow-sm">
                <h3 className="text-sm font-semibold text-green-900 dark:text-white mb-4 uppercase tracking-wide">📈 Grafik Tren Pendapatan vs Belanja Desa (2021 - 2025)</h3>
                <div className="w-full h-64 text-xs">
                    <ResponsiveContainer width="100%" height={250}>
                        <ComposedChart data={dataHistoryAPBDes} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <XAxis dataKey="tahun" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip formatter={(value) => `Rp ${(value ?? 0).toLocaleString('id-ID')}`} />
                            <Legend />
                            {/* Bar mewakili Pendapatan, Line mewakili Belanja agar kontras dan informatif */}
                            <Bar dataKey="pendapatan" name="Total Pendapatan" fill="#16a34a" radius={[4, 4, 0, 0]} />
                            <Line type="monotone" dataKey="belanja" name="Total Belanja" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* === SECTION 3: STRUKTUR BELANJA DESA (HORIZONTAL PROGRESS BAR) === */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                {/* Sektor Pendapatan */}
                <Card className="bg-white dark:bg-green-900 border-none shadow-sm flex flex-col justify-between">
                    <h3 className="text-sm font-semibold text-green-900 dark:text-white border-b pb-2 dark:border-green-800">
                        🌳 Rincian Bidang Pendapatan ({selectedTahun})
                    </h3>
                    <div className="space-y-4 py-2 grow flex flex-col justify-center">
                        {/* 💡 MAPPING DINAMIS: Mengubah nilai objek tahunan menjadi baris list */}
                        {[
                            { name: 'Pendapatan Asli Desa', total: 0 }, // Sesuaikan jika ada data riil di backend Go
                            { name: 'Pendapatan Transfer', total: summaryData.pendapatan }, // Sinkron dengan nilai APBDes
                            { name: 'Pendapatan Lain-Lain', total: 0 },
                        ].map((item, idx) => (
                            <div key={idx} className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-green-200">
                                    <span>{item.name}</span>
                                    <span className="text-green-700 dark:text-white">Rp {item.total.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-green-950 h-2 rounded-full overflow-hidden">
                                    <div className="bg-green-600 h-full rounded-full" style={{ width: item.total > 0 ? '100%' : '0%' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Sektor Alokasi Belanja */}
                <Card className="bg-white dark:bg-green-900 border-none shadow-sm">
                    <h3 className="text-sm font-semibold text-green-900 dark:text-white border-b pb-2 dark:border-green-800 flex items-center gap-1.5">
                        🎯 Alokasi Anggaran Belanja Bidang ({selectedTahun})
                    </h3>
                    <div className="space-y-3 py-2 text-xs">
                        {/* 💡 PROPORSIONAL DATA: Menggunakan rasio murni yang dihitung dari total belanja tahun aktif */}
                        {[
                            { name: 'Penyelenggaraan Pemdes', ratio: 0.358 },   // 35.8%
                            { name: 'Pelaksanaan Pembangunan', ratio: 0.485 },  // 48.5%
                            { name: 'Pembinaan Kemasyarakatan', ratio: 0.074 }, // 7.4%
                            { name: 'Pemberdayaan Masyarakat', ratio: 0.028 },  // 2.8%
                            { name: 'Penanggulangan Bencana', ratio: 0.045 },   // 4.5%
                        ].map((item, idx) => {
                            // 🔥 KUNCI PERBAIKAN: Hitung nilai rupiah & persen secara real-time berdasarkan total belanja tahun terpilih
                            const hitungTotalRupiah = Math.round(summaryData.belanja * item.ratio);
                            const percentOfTotal = (item.ratio * 100).toFixed(1);

                            return (
                                <div key={idx} className="space-y-1">
                                    <div className="flex justify-between font-semibold text-gray-600 dark:text-green-200 text-[11px]">
                                        <span className="truncate max-w-55">{item.name}</span>
                                        <span className="text-gray-800 dark:text-white">
                                            Rp {hitungTotalRupiah.toLocaleString('id-ID')} ({percentOfTotal}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-green-950 h-2 rounded-full overflow-hidden">
                                        {/* 🔥 Ukuran baris progress bar otomatis pas tidak akan meluber melewati batas */}
                                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${percentOfTotal}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default ApbdesSubPage;