import { Card, TabItem, Tabs } from 'flowbite-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Data Ringkasan Utama sesuai gambar Anda
const dataRingkasanIdm = {
    skor_2026: 0.8152,
    status_2026: 'MAJU',
    target_status: 'MANDIRI',
    skor_minimal: 0.8156,
    penambahan: 0.0004,
    iks: 0.8457,
    ike: 0.6667,
    ikl: 0.9333,

    history: [
        { tahun: '2021', skor: 0.68 },
        { tahun: '2022', skor: 0.72 },
        { tahun: '2023', skor: 0.75 },
        { tahun: '2024', skor: 0.79 },
        { tahun: '2026', skor: 0.8152 },
    ],

    // Data Tabel dikelompokkan per pilar utama IDM agar tidak menumpuk panjang
    iks_list: [
        { no: 1, indikator: 'Fasilitas Kesehatan', skor: 4, keterangan: 'Tersedia Puskesmas Pembantu', kegiatan: 'Peningkatan Alat Medis' },
        { no: 2, indikator: 'Akses Dokter', skor: 5, keterangan: 'Tersedia Kunjungan Rutin', kegiatan: 'Pertahankan Layanan' },
        { no: 3, indikator: 'Tingkat Pendidikan', skor: 3, keterangan: 'Wajib Belajar 9 Tahun Terpenuhi', kegiatan: 'Beasiswa Anak Kurang Mampu' },
    ],
    ike_list: [
        { no: 1, indikator: 'Akses Pusat Perdagangan', skor: 3, keterangan: 'Jarak ke Pasar Kabupaten 5km', kegiatan: 'Pengembangan Pasar Desa' },
        { no: 2, indikator: 'Ketersediaan Lembaga Perbankan', skor: 2, keterangan: 'Hanya Tersedia Agen Bank', kegiatan: 'Usulan Pembukaan Cabang Pembantu' },
    ],
    ikl_list: [
        { no: 1, indikator: 'Kualitas Lingkungan Hidup', skor: 5, keterangan: 'Bebas Pencemaran Air & Udara', kegiatan: 'Program Desa Bersih Berkelanjutan' },
        { no: 2, indikator: 'Potensi Rawan Bencana', skor: 4, keterangan: 'Rawan Banjir Skala Rendah', kegiatan: 'Normalisasi Aliran Sungai Desa' },
    ]
};

function IdmSubPage() {
    const d = dataRingkasanIdm;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* === HEADER HALAMAN === */}
            <div className="text-center border-b pb-6 border-gray-200 dark:border-gray-800">
                <h1 className="text-3xl font-semibold text-green-900 dark:text-white sm:text-4xl">
                    👑 Indeks Desa Membangun (IDM)
                </h1>
                <p className="mt-2 py-4 text-gray-500 dark:text-green-300 max-w-2xl mx-auto">
                    IDM merupakan indeks komposit yang dibentuk dari Indeks Ketahanan Sosial (IKS), Indeks Ketahanan Ekonomi (IKE), dan Indeks Ketahanan Lingkungan (IKL).
                </p>
            </div>

            {/* === IMPROVISASI SECTION 1: MATRIKS SKOR UTAMA (GRID CARD ELEGAN) === */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card Status Saat Ini */}
                <div className="bg-white dark:bg-green-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-green-800 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-700 text-white font-semibold text-xs px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                        Status 2026
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 dark:text-green-300 uppercase">Skor IDM Berjalan</p>
                        <p className="text-4xl font-bold text-green-800 dark:text-white mt-1">{d.skor_2026}</p>
                    </div>
                    <div className="mt-6 p-3 bg-green-50 dark:bg-green-950/50 rounded-xl border border-green-100 dark:border-green-900 flex items-center justify-between">
                        <span className="text-xs font-semibold text-green-800 dark:text-green-300">Klasifikasi Desa:</span>
                        <span className="bg-green-700 text-white font-bold text-xs px-3 py-1 rounded-lg tracking-wide uppercase shadow-sm">
                            {d.status_2026}
                        </span>
                    </div>
                </div>

                {/* Card Target Menuju Mandiri */}
                <div className="bg-white dark:bg-green-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-green-800 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-amber-600 text-white font-semibold text-xs px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                        Target Status
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 dark:text-green-300 uppercase">Menuju Strata</p>
                        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-2 tracking-wide uppercase flex items-center gap-1.5">
                            👑 {d.target_status}
                        </p>
                    </div>
                    <div className="mt-4 text-xs text-gray-500 dark:text-green-200 space-y-1 bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-xl border border-amber-100/50 dark:border-amber-900/40">
                        <p className="flex justify-between"><span>Skor Minimal Mandiri:</span> <strong>{d.skor_minimal}</strong></p>
                        <p className="flex justify-between text-amber-700 dark:text-amber-400 font-semibold"><span>Kekurangan Skor (+):</span> <span>{d.penambahan}</span></p>
                    </div>
                </div>

                {/* Card Komposisi 3 Pilar Utama */}
                <div className="bg-white dark:bg-green-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-green-800 flex flex-col justify-between">
                    <h4 className="text-xs font-semibold text-gray-400 dark:text-green-300 uppercase tracking-wider">Capaian 3 Pilar Komposit</h4>
                    <div className="space-y-2 mt-3 text-xs font-semibold">
                        <div className="flex justify-between items-center bg-blue-50/50 dark:bg-blue-950/40 p-2 rounded-lg text-blue-900 dark:text-blue-300">
                            <span>📘 Indeks Sosial (IKS):</span> <strong>{d.iks}</strong>
                        </div>
                        <div className="flex justify-between items-center bg-amber-50/50 dark:bg-amber-950/40 p-2 rounded-lg text-amber-900 dark:text-amber-300">
                            <span>📙 Indeks Ekonomi (IKE):</span> <strong>{d.ike}</strong>
                        </div>
                        <div className="flex justify-between items-center bg-emerald-50/50 dark:bg-emerald-950/40 p-2 rounded-lg text-emerald-900 dark:text-emerald-300">
                            <span>📗 Indeks Lingkungan (IKL):</span> <strong>{d.ikl}</strong>
                        </div>
                    </div>
                </div>

            </div>

            {/* === IMPROVISASI SECTION 2: GRAFIK AREA TREN (LEBIH ELEGAN DARIPADA LINE BIASA) === */}
            <Card className="bg-white dark:bg-green-900 border-none shadow-sm">
                <h3 className="text-sm font-semibold text-green-900 dark:text-white mb-4 uppercase tracking-wide">📈 Grafik Tren Peningkatan Skor IDM Tahunan</h3>
                <div className="w-full text-xs">
                    <ResponsiveContainer width="100%" height={240}>
                        {/* Diubah menjadi AreaChart agar memiliki efek gradasi warna hijau yang estetik */}
                        <AreaChart data={d.history} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorSkor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <XAxis dataKey="tahun" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" domain={[0.5, 0.9]} />
                            <Tooltip />
                            <Area type="monotone" dataKey="skor" name="Skor Riil Desa" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorSkor)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* === IMPROVISASI SECTION 3: TABEL PEMBAGIAN PILAR MENGGUNAKAN TABS FLOWBITE === */}
            <div className="space-y-3">
                <h3 className="text-xl font-semibold text-green-900 dark:text-white">📑 Matriks Pengukuran Indikator Capaian</h3>
                <p className="text-xs text-gray-400 dark:text-gray-300">Pembagian data per pilar memudahkan pengawas membaca target rancangan rencana kegiatan pembangunan desa.</p>

                <div className="bg-white dark:bg-green-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-green-800">
                    {/* Menggunakan komponen Tabs Flowbite agar layout rapi dan tidak terlalu panjang ke bawah */}
                    <Tabs aria-label="Pilar IDM" theme={
                        {
                            tablist: {
                                tabitem: {
                                    base: "flex items-center justify-center rounded-t-xl p-4 text-xs font-bold first:ml-0 focus:outline-none transition-all duration-200",
                                    variant: {
                                        default: {
                                            base: "rounded-t-lg",
                                            active: {
                                                on: "bg-green-100 text-green-900 dark:bg-green-800 dark:text-gray-200",
                                                off: "text-green-500 hover:bg-green-50 hover:text-green-600 dark:text-green-400 dark:hover:bg-green-800 dark:hover:text-green-300"
                                            }
                                        },
                                    }
                                }
                            }
                        }
                    }>

                        {/* TAB 1: SOSIAL */}
                        <TabItem active title="📘 Ketahanan Sosial (IKS)">
                            <div className="overflow-x-auto mt-4 rounded-xl border dark:border-green-800">
                                <table className="w-full text-xs text-left text-gray-500 dark:text-gray-300">
                                    <thead className="bg-gray-50 dark:bg-green-950 text-[10px] uppercase text-gray-700 dark:text-green-200">
                                        <tr>
                                            <th className="px-4 py-3">No</th>
                                            <th className="px-4 py-3">Indikator Pembuat</th>
                                            <th className="px-4 py-3 text-center">Skor</th>
                                            <th className="px-4 py-3">Kondisi Lapangan</th>
                                            <th className="px-4 py-3">Rekomendasi Kegiatan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y dark:divide-green-800">
                                        {d.iks_list.map((item) => (
                                            <tr key={item.no} className="hover:bg-gray-50/50 dark:hover:bg-green-950/30">
                                                <td className="px-4 py-3 font-semibold">{item.no}</td>
                                                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{item.indikator}</td>
                                                <td className="px-4 py-3 text-center"><span className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-semibold px-2 py-0.5 rounded">{item.skor}</span></td>
                                                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{item.keterangan}</td>
                                                <td className="px-4 py-3 text-green-700 dark:text-green-300 font-medium">{item.kegiatan}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabItem>

                        {/* TAB 2: EKONOMI */}
                        <TabItem title="📙 Ketahanan Ekonomi (IKE)">
                            <div className="overflow-x-auto mt-4 rounded-xl border dark:border-green-800">
                                <table className="w-full text-xs text-left text-gray-500 dark:text-gray-300">
                                    <thead className="bg-gray-50 dark:bg-green-950 text-[10px] uppercase text-gray-700 dark:text-green-200">
                                        <tr>
                                            <th className="px-4 py-3">No</th>
                                            <th className="px-4 py-3">Indikator Pembuat</th>
                                            <th className="px-4 py-3 text-center">Skor</th>
                                            <th className="px-4 py-3">Kondisi Lapangan</th>
                                            <th className="px-4 py-3">Rekomendasi Kegiatan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y dark:divide-green-800">
                                        {d.ike_list.map((item) => (
                                            <tr key={item.no} className="hover:bg-gray-50/50 dark:hover:bg-green-950/30">
                                                <td className="px-4 py-3 font-semibold">{item.no}</td>
                                                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{item.indikator}</td>
                                                <td className="px-4 py-3 text-center"><span className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold px-2 py-0.5 rounded">{item.skor}</span></td>
                                                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{item.keterangan}</td>
                                                <td className="px-4 py-3 text-green-700 dark:text-green-300 font-medium">{item.kegiatan}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabItem>

                        {/* TAB 3: LINGKUNGAN */}
                        <TabItem title="📗 Ketahanan Lingkungan (IKL)">
                            <div className="overflow-x-auto mt-4 rounded-xl border dark:border-green-800">
                                <table className="w-full text-xs text-left text-gray-500 dark:text-gray-300">
                                    <thead className="bg-gray-50 dark:bg-green-950 text-[10px] uppercase text-gray-700 dark:text-green-200">
                                        <tr>
                                            <th className="px-4 py-3">No</th>
                                            <th className="px-4 py-3">Indikator Pembuat</th>
                                            <th className="px-4 py-3 text-center">Skor</th>
                                            <th className="px-4 py-3">Kondisi Lapangan</th>
                                            <th className="px-4 py-3">Rekomendasi Kegiatan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y dark:divide-green-800">
                                        {d.ikl_list.map((item) => (
                                            <tr key={item.no} className="hover:bg-gray-50/50 dark:hover:bg-green-950/30">
                                                <td className="px-4 py-3 font-semibold">{item.no}</td>
                                                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{item.indikator}</td>
                                                <td className="px-4 py-3 text-center"><span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded">{item.skor}</span></td>
                                                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{item.keterangan}</td>
                                                <td className="px-4 py-3 text-green-700 dark:text-green-300 font-medium">{item.kegiatan}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabItem>

                    </Tabs>
                </div>
            </div>

        </div>
    );
}

export default IdmSubPage;