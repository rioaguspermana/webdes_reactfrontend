import { useState } from 'react';
import { Tabs, TabItem, TextInput } from 'flowbite-react';
import type { KategoriPpid } from '@/@types/ppid';
import HeaderComponent from '../component/Public/Header';
import FooterComponent from '../component/Public/Footer';

// Data simulasi dokumen PPID Desa berformat snake_case
const dataPpidDesa: KategoriPpid[] = [
    {
        nama_kategori: "ℹ️ Informasi Berkala",
        deskripsi: "Informasi yang wajib diperbarui dan disediakan secara rutin harian, bulanan, atau tahunan.",
        icon: "📅",
        list_dokumen: [
            { id: "1", judul: "Profil Lengkap Pemerintah Desa Sejahtera", tahun: 2026, ukuran_file: "2.4 MB", format: "PDF", download_url: "#" },
            { id: "2", judul: "Laporan Penyelenggaraan Pemerintahan Desa (LPPD)", nomor_dokumen: "Reg.04/LPPD/2025", tahun: 2025, ukuran_file: "4.1 MB", format: "PDF", download_url: "#" },
            { id: "3", judul: "Matriks Rencana Pembangunan Jangka Menengah (RPJMDes)", tahun: 2024, ukuran_file: "1.8 MB", format: "PDF", download_url: "#" },
        ]
    },
    {
        nama_kategori: "🚨 Informasi Serta Merta",
        deskripsi: "Informasi darurat yang dapat mengancam hajat hidup orang banyak dan ketertiban umum.",
        icon: "⚠️",
        list_dokumen: [
            { id: "4", judul: "Panduan Mitigasi dan Jalur Evakuasi Rawan Banjir Dusun Selatan", tahun: 2026, ukuran_file: "1.2 MB", format: "PDF", download_url: "#" },
            { id: "5", judul: "Prosedur Tanggap Darurat Wabah Penyakit Menular Level Desa", tahun: 2025, ukuran_file: "850 KB", format: "PDF", download_url: "#" },
        ]
    },
    {
        nama_kategori: "📂 Informasi Setiap Saat",
        deskripsi: "Informasi yang telah tersedia dan siap diberikan kepada pemohon informasi publik kapan saja.",
        icon: "📁",
        list_dokumen: [
            { id: "6", judul: "Surat Keputusan (SK) Pengangkatan Ketua RT Publik", nomor_dokumen: "SK No. 12/Sejahtera/2024", tahun: 2024, ukuran_file: "920 KB", format: "PDF", download_url: "#" },
            { id: "7", judul: "Daftar Peraturan Desa (Perdes) Lembaran Resmi Desa", tahun: 2025, ukuran_file: "1.5 MB", format: "PDF", download_url: "#" },
            { id: "8", judul: "Buku Data Inventaris Kekayaan Aset Milik Desa", tahun: 2025, ukuran_file: "720 KB", format: "XLS", download_url: "#" },
        ]
    },
    {
        nama_kategori: "🔒 Informasi Dikecualikan",
        deskripsi: "Informasi rahasia yang tidak dapat dibuka ke publik berdasarkan undang-undang karena alasan privasi/keamanan.",
        icon: "🔒",
        list_dokumen: [
            { id: "9", judul: "Catatan Medis Rekam Kesehatan Warga Kurang Mampu", tahun: 2026, ukuran_file: "Dikecualikan", format: "PDF", download_url: "PROHIBITED" },
            { id: "10", judul: "Detail Data Pribadi Hak Keamanan Saksi Hukum Kasus Desa", tahun: 2025, ukuran_file: "Dikecualikan", format: "DOC", download_url: "PROHIBITED" },
        ]
    }
];

// Parameter konfigurasi tema hijau murni untuk Tabs induk
const customTabsTheme = {
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
};

function Ppid() {
    const [search, setSearch] = useState('');

    return (
        <div>
            <HeaderComponent is_homepage={false} />
            <div className="mt-24 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 dark:bg-green-700 transition-colors duration-200">
                <main>
                    <div className="max-w-6xl mx-auto space-y-8">

                        {/* === HEADER PPID === */}
                        <div className="text-center border-b border-gray-200 dark:border-green-900 pb-6">
                            <h1 className="text-3xl font-semibold tracking-tight text-green-900 dark:text-white sm:text-4xl">
                                🏛️ PPID Digital Desa Sejahtera
                            </h1>
                            <p className="mt-2 py-4  text-sm text-gray-500 dark:text-green-300 max-w-2xl mx-auto">
                                Layanan Keterbukaan Informasi Publik Desa. Hak Anda untuk Tahu dilindungi Undang-Undang No. 14 Tahun 2008.
                            </p>
                        </div>

                        {/* === BILIK UTAMA TABS KATEGORI === */}
                        <div className="bg-white dark:bg-green-600 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-green-800 space-y-6">

                            {/* Baris Pencarian internal dokumen */}
                            <div className="max-w-md">
                                <TextInput
                                    type="text"
                                    placeholder="Cari dokumen PPID (cth: LPPD, Perdes)..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    color='success'
                                    sizing="sm"
                                />
                            </div>

                            {/* Komponen Induk Tabs - Menampung parameter tema hijau di tag paling atas */}
                            <Tabs aria-label="Kategori PPID" theme={customTabsTheme}>
                                {dataPpidDesa.map((kat, kIdx) => {

                                    // Filter dokumen berdasarkan ketikan kolom cari secara real-time
                                    const filteredDocs = kat.list_dokumen.filter(doc =>
                                        doc.judul.toLowerCase().includes(search.toLowerCase()) ||
                                        doc.nomor_dokumen?.toLowerCase().includes(search.toLowerCase())
                                    );

                                    return (
                                        <TabItem key={kIdx} active={kIdx === 0} title={kat.nama_kategori}>

                                            {/* Deskripsi Kategori */}
                                            <div className="p-3 bg-gray-50 dark:bg-green-950/40 border rounded-xl text-xs text-gray-600 dark:text-green-200 mb-4 mt-2 leading-relaxed">
                                                💡 <span className="font-bold text-gray-800 dark:text-white">Definisi:</span> {kat.deskripsi}
                                            </div>

                                            {/* Daftar Dokumen berwujud List Item */}
                                            {filteredDocs.length > 0 ? (
                                                <div className="space-y-3">
                                                    {filteredDocs.map((doc) => {
                                                        const isDikecualikan = doc.download_url === 'PROHIBITED';

                                                        return (
                                                            <div
                                                                key={doc.id}
                                                                className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 p-4 bg-white dark:bg-green-800 border rounded-xl shadow-sm hover:border-green-300 dark:hover:border-green-700 transition-colors"
                                                            >
                                                                {/* Kiri: Judul dan Atribut Dokumen */}
                                                                <div className="space-y-1 text-left">
                                                                    <h4 className="text-sm font-bold text-gray-800 dark:text-white leading-snug">
                                                                        {doc.judul}
                                                                    </h4>
                                                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400 dark:text-green-300">
                                                                        {doc.nomor_dokumen && <span>📄 {doc.nomor_dokumen}</span>}
                                                                        <span>📅 Tahun: {doc.tahun}</span>
                                                                        <span>💾 Ukuran: {doc.ukuran_file}</span>
                                                                    </div>
                                                                </div>

                                                                {/* Kanan: Tombol Unduh / Kunci */}
                                                                <div className="shrink-0">
                                                                    {isDikecualikan ? (
                                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900 font-bold text-xs rounded-lg cursor-not-allowed">
                                                                            🔒 Rahasia / Dikunci
                                                                        </span>
                                                                    ) : (
                                                                        <a
                                                                            href={doc.download_url}
                                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-700 text-white font-bold text-xs rounded-lg hover:bg-green-800 transition-colors shadow-sm"
                                                                        >
                                                                            📥 Unduh {doc.format}
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8 text-gray-400 text-xs">
                                                    ❌ Tidak ditemukan dokumen PPID yang cocok dalam kategori ini.
                                                </div>
                                            )}

                                        </TabItem>
                                    );
                                })}
                            </Tabs>

                        </div>

                    </div>
                </main>
            </div>
            <FooterComponent />
        </div>
    );
}

export default Ppid;