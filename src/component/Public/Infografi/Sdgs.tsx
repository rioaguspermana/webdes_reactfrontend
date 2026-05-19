import { Tabs, TabItem, Progress } from 'flowbite-react';
import { useMemo } from 'react';

// Data 18 Goals SDGs Desa Sejahtera sesuai gambar yang Anda kirimkan
const dataSdgs = {
    // Mengelompokkan data ke dalam Klaster agar jauh lebih mudah dipahami
    klaster: [
        {
            clusterName: '🌱 Ketahanan Lingkungan',
            items: [
                // 💡 Kunci Perbaikan: Gunakan kode warna HEX asli SDGs sesuai nomornya
                { goal: 6, title: 'Desa Layak Air Bersih dan Sanitasi', score: 63.33, color: '#26bde2' }, // Biru Muda Air
                { goal: 7, title: 'Desa Berenergi Bersih dan Terbarukan', score: 99.80, color: '#fcc30b' }, // Kuning Amber
                { goal: 11, title: 'Kawasan Pemukiman Desa Aman dan Nyaman', score: 53.01, color: '#f99d1c' }, // Oranye
                { goal: 12, title: 'Konsumsi dan Produksi Desa Sadar Lingkungan', score: 50.00, color: '#cf8d2a' }, // Mustard/Cokelat
                { goal: 13, title: 'Desa Tanggap Perubahan Iklim', score: 0.00, color: '#48773c' }, // Hijau Tua
                { goal: 14, title: 'Desa Peduli Lingkungan Laut', score: 0.00, color: '#007dbc' }, // Biru Laut
                { goal: 15, title: 'Desa Peduli Lingkungan Darat', score: 33.33, color: '#3f7e44' }, // Hijau Daun
            ]
        },
        {
            clusterName: '🤝 Kesejahteraan Sosial',
            items: [
                { goal: 1, title: 'Desa Tanpa Kemiskinan', score: 38.47, color: '#e5243b' }, // Merah Terang
                { goal: 2, title: 'Desa Tanpa Kelaparan', score: 33.07, color: '#dda63a' }, // Emas/Kuning Padi
                { goal: 3, title: 'Desa Sehat dan Sejahtera', score: 82.05, color: '#4c9f38' }, // Hijau Kesehatan
                { goal: 4, title: 'Pendidikan Desa Berkualitas', score: 14.73, color: '#c5192d' }, // Merah Marun
                { goal: 5, title: 'Keterlibatan Perempuan Desa', score: 28.57, color: '#ff3a21' }, // Oranye Kemerahan
            ]
        },
        {
            clusterName: '📈 Perkembangan Ekonomi',
            items: [
                { goal: 8, title: 'Pertumbuhan Ekonomi Desa Merata', score: 26.85, color: '#a21942' }, // Merah Manggis Tua
                { goal: 9, title: 'Infrastruktur dan Inovasi Desa Sesuai Kebutuhan', score: 52.33, color: '#ff6a00' }, // Oranye Terang
                { goal: 10, title: 'Desa Tanpa Kesenjangan', score: 40.82, color: '#dd1367' }, // Pink Pekat
            ]
        },
        {
            clusterName: '🏛️ Tata Kelola & Kemitraan',
            items: [
                { goal: 16, title: 'Desa Damai Berkeadilan', score: 60.99, color: '#00689d' }, // Biru Navy
                { goal: 17, title: 'Kemitraan Untuk Pembangunan Desa', score: 81.02, color: '#19486a' }, // Biru Gelap
                { goal: 18, title: 'Kelembagaan Desa Dinamis dan Budaya Desa Adaptif', score: 44.95, color: '#00a3a6' }, // Toska/Teal
            ]
        }
    ]
};

function SdgsSubPage() {
    const d = dataSdgs;

    const hitungSkorTotalOtomatis = useMemo(() => {
        // 1. Ambil semua item dari tiap klaster dan gabungkan menjadi 1 array datar
        const semuaItems = dataSdgs.klaster.flatMap(k => k.items);

        // 2. Jumlahkan semua nilai skor menggunakan fungsi reduce
        const totalNilai = semuaItems.reduce((acc, item) => acc + item.score, 0);

        // 3. Bagi dengan jumlah total item dan bulatkan 2 angka di belakang koma
        return (totalNilai / semuaItems.length).toFixed(2);
    }, []);

    // Fungsi helper menentukan warna indikator text berdasarkan nilai skor
    const getStatusBadge = (score: number) => {
        if (score >= 75) return { text: 'Sangat Baik', color: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' };
        if (score >= 40) return { text: 'Cukup', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' };
        return { text: 'Perlu Perhatian', color: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' };
    };

    const allSdgsItem = useMemo(() => {
        const flatItems = dataSdgs.klaster.flatMap((k) => k.items);
        return flatItems.sort((a, b) => a.goal - b.goal);
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-8">

            {/* === HEADER HALAMAN === */}
            <div className="text-center border-b pb-6 border-gray-200 dark:border-gray-800">
                <h1 className="text-3xl font-semibold text-green-900 dark:text-white sm:text-4xl">
                    🎯 SDGs Desa Sejahtera
                </h1>
                <p className="mt-2 py-4 text-gray-500 dark:text-green-300 max-w-2xl mx-auto">
                    Sustainable Development Goals (SDGs) Desa adalah upaya terpadu mewujudkan Desa tanpa kemiskinan, tanpa kelaparan, ekonomi tumbuh merata, dan peduli lingkungan.
                </p>
            </div>

            {/* === SECTION 1: TOTAL SKOR SUMMARY CARD === */}
            <div className="bg-white dark:bg-green-900 rounded-2xl p-6 shadow-sm border border-green-100 dark:border-green-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skor Pencapaian Akhir SDGs</h2>
                    <p className="mt-2 py-4 text-gray-500 dark:text-green-300 max-w-2xl mx-auto">
                        Nilai kumulatif dari seluruh pilar indikator desa kependidikan, kesehatan, lingkungan, dan ekonomi masyarakat. Target ideal pencapaian berkelanjutan nasional adalah skor 100.
                    </p>
                </div>
                {/* Visual Besar Angka Skor */}
                <div className="bg-green-50 dark:bg-green-950/60 border border-green-200 dark:border-green-800 rounded-2xl px-8 py-5 text-center flex flex-col justify-center items-center min-w-40 shadow-inner">
                    <span className="text-sm/6 font-bold text-green-500 dark:text-green-300 uppercase tracking-widest">Total Skor</span>
                    <span className="text-4xl font-black text-green-800 dark:text-white mt-1 font-mono">{hitungSkorTotalOtomatis}</span>
                    <span className="text-xs font-semisemibold text-green-700 dark:text-green-400 mt-1">Status: Menengah</span>
                </div>
            </div>

            {/* === SECTION 2: 18 GOALS YANG DI-KLASTER LEWAT COMPONENT TABS (ANTI-RAMAI) === */}
            <div className="space-y-3">
                <h3 className="text-xl font-semibold text-green-900 dark:text-white">📊 Matriks Detil Capaian 18 Goals SDGs</h3>
                <p className="text-xs text-gray-700 dark:text-gray-300">Gunakan tab menu di bawah ini untuk melihat rincian nilai capaian SDGs per sektor kategori spesifik.</p>

                <div className="bg-white dark:bg-green-900 p-4 rounded-2xl shadow-sm border border-green-100 dark:border-green-800">
                    {/* Menggunakan pills style agar modern dan rapi */}
                    <Tabs aria-label="Klaster SDGs" theme={
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
                        {d.klaster.map((cluster, cIdx) => (
                            <TabItem key={cIdx} active={cIdx === 0} title={cluster.clusterName} >
                                {/* Grid Layout untuk Item di dalam Klaster Terpilih */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    {cluster.items.map((item) => {
                                        const status = getStatusBadge(item.score);
                                        return (
                                            <div
                                                key={item.goal}
                                                className="bg-green-50 dark:bg-green-950/40 p-4 rounded-xl border border-green-100 dark:border-green-800 flex flex-col justify-between space-y-3 shadow-sm hover:border-green-200 dark:hover:border-green-700 transition-all"
                                            >
                                                <div className="flex justify-between items-start gap-3">
                                                    <div className="flex items-start gap-2.5">
                                                        {/* Nomor Urut Bulat Khas SDGs */}
                                                        <span
                                                            className="text-white text-xs font-black min-w-6 h-6 rounded flex items-center justify-center shadow-sm shrink-0"
                                                            // 🔥 KUNCI SINKRONISASI WARNA: Gunakan inline style agar warna HEX langsung diterapkan
                                                            style={{ backgroundColor: item.color }}
                                                        >
                                                            {item.goal}
                                                        </span>
                                                        <h4 className="text-xs font-semibold text-green-800 dark:text-white leading-tight">
                                                            {item.title}
                                                        </h4>
                                                    </div>
                                                    {/* Label Status Indikator Kritis/Bagus */}
                                                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${status.color}`}>
                                                        {status.text}
                                                    </span>
                                                </div>

                                                {/* Progress Bar & Informasi Nilai */}
                                                <div className="space-y-1">
                                                    <div className="flex justify-between items-baseline text-xs">
                                                        <span className="text-[10px] text-green-400 font-medium">Nilai Capaian:</span>
                                                        <strong className="text-sm font-extrasemibold text-green-900 dark:text-white font-mono">{item.score} <span className="text-[10px] font-normal text-green-400">/ 100</span></strong>
                                                    </div>
                                                    {/* Bar Visualisasi Data */}
                                                    <Progress
                                                        progress={item.score}
                                                        color={item.score >= 75 ? 'green' : item.score >= 40 ? 'yellow' : 'red'}
                                                        size="sm"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                            </TabItem>
                        ))}

                        <TabItem active title="🌍 Semua Goals">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {allSdgsItem.map((item) => {
                                    const status = getStatusBadge(item.score);
                                    return (
                                        <div key={item.goal} className="bg-green-50 dark:bg-green-950/40 p-4 rounded-xl border flex flex-col justify-between space-y-3">
                                            <div className="flex justify-between items-start gap-3">
                                                <div className="flex items-start gap-2.5">
                                                    {/* Nomor Urut Bulat Khas SDGs */}
                                                    <span
                                                        className="text-white text-xs font-black min-w-6 h-6 rounded flex items-center justify-center shadow-sm shrink-0"
                                                        // 🔥 KUNCI SINKRONISASI WARNA: Gunakan inline style agar warna HEX langsung diterapkan
                                                        style={{ backgroundColor: item.color }}
                                                    >
                                                        {item.goal}
                                                    </span>
                                                    <h4 className="text-xs font-semibold text-green-800 dark:text-white leading-tight">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                                {/* Label Status Indikator Kritis/Bagus */}
                                                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${status.color}`}>
                                                    {status.text}
                                                </span>
                                            </div>

                                            {/* Progress Bar & Informasi Nilai */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-baseline text-xs">
                                                    <span className="text-[10px] text-green-400 font-medium">Nilai Capaian:</span>
                                                    <strong className="text-sm font-extrasemibold text-green-900 dark:text-white font-mono">{item.score} <span className="text-[10px] font-normal text-green-400">/ 100</span></strong>
                                                </div>
                                                {/* Bar Visualisasi Data */}
                                                <Progress
                                                    progress={item.score}
                                                    color={item.score >= 75 ? 'green' : item.score >= 40 ? 'yellow' : 'red'}
                                                    size="sm"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </TabItem>
                    </Tabs>
                </div>
            </div>

        </div >
    );
}

export default SdgsSubPage;