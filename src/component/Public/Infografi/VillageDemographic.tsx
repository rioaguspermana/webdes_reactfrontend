import { Card } from 'flowbite-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// =========================================================================
// MOCK DATA (Berformat Snake_Case Sesuai Standar Integrasi API Go Anda)
// =========================================================================
const dataPenduduk = {
    total_penduduk: 3245,
    kepala_keluarga: 942,
    perempuan: 1605,
    laki_laki: 1640,

    range_umur: [
        { name: '0-4 Thn', perempuan: 110, laki_laki: 125 },
        { name: '5-9 Thn', perempuan: 130, laki_laki: 142 },
        { name: '10-14 Thn', perempuan: 145, laki_laki: 150 },
        { name: '15-19 Thn', perempuan: 160, laki_laki: 175 },
        { name: '20-24 Thn', perempuan: 195, laki_laki: 210 }, // Usia Terbanyak
        { name: '25-29 Thn', perempuan: 180, laki_laki: 190 },
        { name: '30-34 Thn', perempuan: 150, laki_laki: 165 },
        { name: '35-39 Thn', perempuan: 140, laki_laki: 148 },
        { name: '40-44 Thn', perempuan: 120, laki_laki: 130 },
        { name: '45-49 Thn', perempuan: 95, laki_laki: 102 },
        { name: '50-54 Thn', perempuan: 80, laki_laki: 88 },
        { name: '55-59 Thn', perempuan: 65, laki_laki: 70 },
        { name: '60-64 Thn', perempuan: 40, laki_laki: 45 },
        { name: '65+ Thn', perempuan: 25, laki_laki: 20 }, // Usia Terendah
    ],

    per_dusun: [
        { name: 'Dusun Selatan', value: 1780 },
        { name: 'Dusun Utara', value: 1465 },
    ],

    pendidikan: [
        { name: 'Tidak Sekolah', total: 240 },
        { name: 'SD', total: 850 },
        { name: 'SMP', total: 920 },
        { name: 'SMA/SMK', total: 1045 },
        { name: 'Diploma/S1', total: 175 },
        { name: 'S2/S3', total: 15 },
    ],

    pekerjaan: [
        { name: 'Petani / Pekebun', total: 845 },
        { name: 'Buruh Harian Lepas', total: 420 },
        { name: 'Wiraswasta / Pedagang', total: 310 },
        { name: 'Karyawan Swasta', total: 285 },
        { name: 'Pegawai Negeri (PNS/P3K)', total: 95 },
        { name: 'Belum / Tidak Bekerja', total: 615 },
        { name: 'Pelajar / Mahasiswa', total: 520 },
        { name: 'Mengurus Rumah Tangga', total: 140 },
        { name: 'TNI / POLRI', total: 15 },
    ],

    hak_suara_history: [
        { tahun: '2024', total: 2150 },
        { tahun: '2025', total: 2210 },
        { tahun: '2026', total: 2285 },
    ],

    status_perkawinan: [
        { name: 'Belum Kawin', total: 1105 },
        { name: 'Kawin', total: 1840 },
        { name: 'Cerai Hidup', total: 85 },
        { name: 'Cerai Mati', total: 125 },
        { name: 'Kawin Tercatat', total: 75 },
        { name: 'Kawin Tdk Tercatat', total: 15 },
    ],

    agama_kepercayaan: [
        { name: 'Islam', total: 2980 },
        { name: 'Kristen Protestan', total: 150 },
        { name: 'Katolik', total: 65 },
        { name: 'Hindu', total: 20 },
        { name: 'Buddha', total: 12 },
        { name: 'Khonghucu', total: 3 },
        { name: 'Kepercayaan Lain', total: 15 },
    ]
};

// Palet warna estetik demografi (Earth & Nature Theme)
const COLORS_DUSUN = ['#1e3a8a', '#16a34a']; // Hijau tua & Hijau terang

function VillageDemographicSubPage() {
    const d = dataPenduduk;

    // 6 Pekerjaan Terbanyak untuk kebutuhan tampilan Grid Kanan
    const topJobs = [...d.pekerjaan].sort((a, b) => b.total - a.total).slice(0, 6);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* === HEADER INFOGRAFIS === */}
            <div className="text-center border-b pb-6 border-gray-200 dark:border-gray-800">
                <h1 className="text-3xl font-semibold text-green-900 dark:text-white sm:text-4xl">
                    Demografi Desa (Penduduk)
                </h1>
                <p className="mt-2 py-6 text-sm text-gray-500 dark:text-gray-300">
                    Menyajikan gambaran menyeluruh mengenai kondisi kependudukan di suatu wilayah. Informasi meliputi jumlah penduduk, distribusi usia, komposisi jenis kelamin, tingkat pendidikan, mata pencaharian, agama, serta faktor-faktor penting lainnya yang mencerminkan struktur sosial masyarakat secara detail.
                </p>
            </div>

            {/* === SECTION 1: RINGKASAN JUMLAH TOTAL (4 GRID UTAMA) === */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-green-800 border-l-4 border-l-green-700 dark:border-l-green-900">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-300">Total Penduduk</p>
                    <p className="text-3xl font-black text-green-900 dark:text-white mt-1">{d.total_penduduk.toLocaleString('id-ID')} <span className="text-xs font-normal text-gray-500 dark:text-gray-300">Jiwa</span></p>
                </Card>
                <Card className="bg-white dark:bg-green-800 border-l-4 border-l-emerald-600 dark:border-l-green-900">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-300">Kepala Keluarga (KK)</p>
                    <p className="text-3xl font-black text-green-900 dark:text-white mt-1">{d.kepala_keluarga.toLocaleString('id-ID')} <span className="text-xs font-normal text-gray-500 dark:text-gray-300">KK</span></p>
                </Card>
                <Card className="bg-white dark:bg-green-800 border-l-4 border-l-blue-600 dark:border-l-green-900">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-300">Laki-Laki</p>
                    <p className="text-3xl font-black text-blue-900 dark:text-blue-400 mt-1">{d.laki_laki.toLocaleString('id-ID')} <span className="text-xs font-normal text-gray-500 dark:text-gray-300">Jiwa</span></p>
                </Card>
                <Card className="bg-white dark:bg-green-800 border-l-4 border-l-pink-600 dark:border-l-green-900">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-300">Perempuan</p>
                    <p className="text-3xl font-black text-pink-900 dark:text-pink-400 mt-1">{d.perempuan.toLocaleString('id-ID')} <span className="text-xs font-normal text-gray-500 dark:text-gray-300">Jiwa</span></p>
                </Card>
            </div>

            {/* === SECTION 2: RANGE UMUR SIDE-BY-SIDE BARCHART & SUMMARY === */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <Card className="lg:col-span-2 bg-white dark:bg-green-800">
                    <h3 className="text-base font-semibold text-green-900 dark:text-white mb-4">📊 Berdasarkan Kelompok Usia</h3>
                    <div className="w-full text-xs">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={d.range_umur} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="perempuan" name="Perempuan" fill="#ec4899" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="laki_laki" name="Laki-Laki" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Section Summary Umur */}
                <div className="bg-white dark:bg-green-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-green-900 dark:text-white mb-4">📌 Analisis Struktur Usia</h3>
                        <div className="space-y-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-100 dark:border-blue-900">
                                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase">Populasi Rentang Terbanyak</p>
                                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-0.5">Usia 20 - 24 Tahun</p>
                                <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">Total: 405 Jiwa (Mayoritas usia produktif aktif).</p>
                            </div>
                            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-100 dark:border-amber-900">
                                <p className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase">Populasi Rentang Terendah</p>
                                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-0.5">Usia 65+ Tahun</p>
                                <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">Total: 45 Jiwa (Kelompok lansia sepuh desa).</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-[11px] text-gray-400 dark:text-gray-300 mt-4 leading-relaxed italic border-t pt-3 dark:border-gray-700">
                        * Rincian grafik di samping membagi komposisi piramida penduduk secara dengan rentang usia per 4 tahun.
                    </p>
                </div>
            </div>

            {/* === SECTION 3: PENDUDUK PER DUSUN (DONUT) & TINGKAT PENDIDIKAN (BARCHART) === */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Donut Chart Dusun */}
                <Card className="bg-white dark:bg-green-800 md:col-span-1 flex flex-col justify-between">
                    <h3 className="text-base font-semibold text-green-900 dark:text-white">🍩 Penduduk Wilayah Per Dusun</h3>
                    <div className="w-full flex justify-center items-center">
                        <ResponsiveContainer width="100%" height={210}>
                            <PieChart>
                                <Pie data={d.per_dusun} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                                    {d.per_dusun.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS_DUSUN[index % COLORS_DUSUN.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} Jiwa`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 text-xs font-semibold pt-2 border-t dark:border-gray-700 dark:text-gray-300">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-800 block"></span> Dusun Selatan ({d.per_dusun[0].value})</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-600 block"></span> Dusun Utara ({d.per_dusun[1].value})</span>
                    </div>
                </Card>

                {/* Bar Chart Pendidikan */}
                <Card className="bg-white dark:bg-green-800 md:col-span-2">
                    <h3 className="text-base font-semibold text-green-900 dark:text-white mb-2">🎓 Jenjang Pendidikan Terakhir</h3>
                    <div className="w-full text-xs">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={d.pendidikan} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip />
                                <Bar dataKey="total" name="Total Jiwa" fill="#047857" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* === SECTION 4: JENIS PEKERJAAN (SCROLLABLE LIST vs 6 GRID TERBANYAK) === */}
            <div className="space-y-3">
                <h3 className="text-xl font-semibold text-green-900 dark:text-white">💼 Distribusi Sektor Mata Pencaharian</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                    {/* Kiri: Scrollable List Seluruh Pekerjaan */}
                    <div className="bg-white dark:bg-green-800 rounded-xl p-5 border border-gray-100 dark:border-green-900 flex flex-col">
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-3 uppercase tracking-wider">Seluruh Ragam Profesi</h4>
                        <div className="overflow-y-auto max-h-66.25 pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                            {d.pekerjaan.map((job, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-2.5 rounded-lg text-xs border border-gray-100 dark:border-gray-700">
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">{job.name}</span>
                                    <span className="bg-gray-200 dark:bg-gray-700 font-semibold px-2 py-0.5 rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200">{job.total} KK/Jiwa</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Kanan: 6 Grid Pekerjaan Terbanyak */}
                    <div className="flex flex-col justify-between">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 h-full">
                            {topJobs.map((job, idx) => (
                                <div key={idx} className="bg-white dark:bg-green-800 rounded-xl p-3.5 border border-gray-100 dark:border-green-900 flex flex-col justify-center items-center text-center shadow-sm relative overflow-hidden">
                                    <span className="absolute top-0 left-0 bg-green-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-br-lg font-semibold">#{idx + 1}</span>
                                    <p className="text-xs text-gray-500 dark:text-gray-300 font-medium line-clamp-1 mt-1">{job.name}</p>
                                    <p className="text-xl font-black text-green-900 dark:text-white mt-1.5">{job.total}</p>
                                    <span className="text-[10px] text-gray-400 dark:text-gray-300">Jiwa aktif</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* === SECTION 5A: STATUS PERKAWINAN (Baris Mandiri Penuh) === */}
            <Card className="bg-white dark:bg-green-800 w-full">
                <h3 className="text-base font-semibold text-green-900 dark:text-white mb-4">💍 Distribusi Berdasarkan Status Perkawinan</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    {d.status_perkawinan.map((status, idx) => {
                        const percentage = ((status.total / d.total_penduduk) * 100).toFixed(1);
                        return (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-xl border border-gray-100 dark:border-gray-700 space-y-2">
                                <div className="flex justify-between font-semibold text-gray-700 dark:text-gray-300">
                                    <span>{status.name}</span>
                                    <span className="text-green-800 dark:text-green-400">{status.total} Jiwa ({percentage}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${percentage}%` }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* === SECTION 5B: AGAMA & ALIRAN KEPERCAYAAN (Terpisah dengan Kontras & Box Mayoritas) === */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

                {/* Kiri & Tengah: Chart Agama dengan Warna Kontras (2 Kolom) */}
                <Card className="bg-white dark:bg-green-800 lg:col-span-2">
                    <h3 className="text-base font-semibold text-green-900 dark:text-white mb-2">🕌 Komposisi Agama & Aliran Kepercayaan</h3>
                    <div className="w-full h-64 flex justify-center items-center text-xs">
                        <div className="w-full h-72 flex flex-col md:flex-row justify-center items-center gap-4 text-xs">
                            <ResponsiveContainer width="100%" height={280}>
                                {/* Kita geser posisi chart sedikit ke kiri (margin right) untuk memberi ruang Legend di kanan */}
                                <PieChart margin={{ right: 0 }}>
                                    <Pie
                                        data={d.agama_kepercayaan}
                                        cx="50%"
                                        cy="50%"
                                        // 1. 🔥 MATIKAN label bawaan agar tidak ada teks yang tabrakan/menumpuk lagi
                                        label={false}
                                        innerRadius={45} // Diubah sedikit menjadi donut halus agar lebih modern
                                        outerRadius={80}
                                        dataKey="total"
                                    >
                                        {d.agama_kepercayaan.map((_entry, index) => {
                                            const HIGH_CONTRAST_COLORS = [
                                                '#1e3a8a', // Islam
                                                '#b91c1c', // Kristen
                                                '#d97706', // Katolik
                                                '#047857', // Hindu
                                                '#6d28d9', // Buddha
                                                '#be185d', // Khonghucu
                                                '#4b5563'  // Kepercayaan
                                            ];
                                            return <Cell key={`cell-${index}`} fill={HIGH_CONTRAST_COLORS[index % HIGH_CONTRAST_COLORS.length]} />;
                                        })}
                                    </Pie>

                                    {/* 2. 🔥 SOLUSI UTAMA: Gunakan Tooltip kustom yang informatif saat disentuh/di-hover */}
                                    <Tooltip
                                        formatter={(value: any, name: any) => {
                                            const totalPenduduk = d.total_penduduk;
                                            const percent = ((value / totalPenduduk) * 100).toFixed(1);
                                            return [`${value.toLocaleString('id-ID')} Jiwa (${percent}%)`, name];
                                        }}
                                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                    />

                                    {/* 3. 🔥 SOLUSI KEDUA: Tampilkan daftar agama rapi secara vertikal di sebelah kanan chart */}
                                    <Legend
                                        layout="vertical"
                                        verticalAlign="middle"
                                        align="right"
                                        iconType="circle"
                                        iconSize={8}
                                        wrapperStyle={{ paddingLeft: '20px' }}
                                        formatter={(value) => {
                                            // Menampilkan Nama Agama + Persentase di baris daftar Legend
                                            const itemData = d.agama_kepercayaan.find(i => i.name === value);
                                            const percent = itemData ? ((itemData.total / d.total_penduduk) * 100).toFixed(1) : '0';
                                            return <span className="text-gray-700 dark:text-gray-300 font-medium">{value} ({percent}%)</span>;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </Card>

                {/* Kanan: Box Terpisah Mayoritas Agama (1 Kolom) */}
                <div className="bg-white dark:bg-green-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">
                            2 Basis Agama Tertinggi Desa
                        </h4>

                        {/* 💡 LOGIKA: Urutkan data secara menurun dan ambil 2 agama teratas */}
                        {[...d.agama_kepercayaan]
                            .sort((a, b) => b.total - a.total)
                            .slice(0, 2)
                            .map((agama, idx) => {
                                const percentage = ((agama.total / d.total_penduduk) * 100).toFixed(1);
                                // Tentukan emoji ikon secara dinamis berdasarkan nama agama
                                const emoji = agama.name.includes('Islam') ? '🕌' : '⛪';
                                // Gunakan warna hijau untuk peringkat 1 dan biru/amber untuk peringkat 2
                                const boxBg = idx === 0
                                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/60'
                                    : 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/60';
                                const labelColor = idx === 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-blue-700 dark:text-blue-400';

                                return (
                                    <div key={idx} className={`p-4 border rounded-xl ${boxBg}`}>
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{emoji}</span>
                                            <div>
                                                <p className={`text-[10px] font-semibold uppercase tracking-wide ${labelColor}`}>
                                                    Terbanyak #{idx + 1}
                                                </p>
                                                <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-0.5">
                                                    {agama.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2.5 space-y-1 border-t border-gray-200/60 dark:border-gray-700/60 pt-2 text-xs text-gray-600 dark:text-gray-300">
                                            <div className="flex justify-between">
                                                <span>Total Penganut:</span>
                                                <strong className="text-gray-900 dark:text-white">{agama.total.toLocaleString('id-ID')} Jiwa</strong>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Persentase Wilayah:</span>
                                                <strong className="text-gray-900 dark:text-white">{percentage}%</strong>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

            </div>


            {/* === SECTION 6: HISTORY 3 TAHUN HAK SUARA (LINE CHART) === */}
            <Card className="bg-white dark:bg-green-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 mb-2 dark:border-gray-700">
                    <div>
                        <h3 className="text-base font-semibold text-green-900 dark:text-white">🗳️ Tren Partisipasi Hak Pilih Suara</h3>
                        <p className="text-xs text-gray-400 dark:text-gray-300">Linimasa pertumbuhan daftar pemilih tetap (DPT) desa 3 tahun terakhir.</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/40 border border-green-200 text-green-800 dark:text-green-300 rounded px-2.5 py-1 text-xs font-semibold text-center">
                        Kenaikan 2024-2026: +135 Suara Pemilih Baru
                    </div>
                </div>
                <div className="w-full text-xs">
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={d.hak_suara_history} margin={{ top: 10, right: 20, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="tahun" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip formatter={(value) => `${value} Pemilih`} />
                            <Line type="monotone" dataKey="total" name="Pemiliki Hak Suara" stroke="#15803d" strokeWidth={3} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}

export default VillageDemographicSubPage;