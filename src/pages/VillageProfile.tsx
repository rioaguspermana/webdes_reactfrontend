import { cleanFileUrl } from '@/@utils/cleanFileUrl';
import FooterComponent from '@/component/Public/Footer';
import HeaderComponent from '@/component/Public/Header';
import { Card, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';

// Data simulasi (Mock Data) menyesuaikan format snake_case backend Go Anda
const mockDataDesa = {
    nama_desa: "Desa Sejahtera",
    sejarah: "Desa Sejahtera didirikan pada tahun 1947 oleh sekelompok pionir yang dipimpin oleh Ki Demang Sastro. Berawal dari kawasan agraris yang subur, desa ini berkembang menjadi pusat komunitas yang mandiri dengan menjunjung tinggi nilai gotong royong, kearifan lokal, dan kelestarian alam yang lestari dari generasi ke generasi.",
    visi: "Terwujudnya Desa Sejahtera yang Mandiri, Sejahtera, Berkearifan Lokal, dan Berkelanjutan Melalui Tata Kelola Pemerintahan yang Transparan.",
    misi: [
        "Meningkatkan kualitas tata kelola pemerintahan desa yang bersih dan berbasis digital.",
        "Mengembangkan potensi pertanian dan UMKM lokal berbasis pemberdayaan masyarakat.",
        "Membangun infrastruktur desa yang merata dengan tetap menjaga kelestarian lingkungan.",
        "Melestarikan nilai-nilai budaya, keagamaan, dan semangat gotong royong antar warga."
    ],
    struktur_organisasi_url: "struktur_organisasi_desa.png", // Ganti gambar bagan asli
    struktur_bpd_url: "struktur_organisasi_bpd.png",        // Ganti gambar bagan asli
    batas_wilayah: {
        utara: "Desa Mekarjaya, Kecamatan Cisanti",
        selatan: "Hutan Lindung Gunung Jati",
        timur: "Sungai Citarum / Kabupaten Sebelah",
        barat: "Desa Bojongloa, Kecamatan Maju Jaya"
    },
    // Pastikan mengambil link bagian 'src="..."' dari menu Embed Google Maps asli desa Anda
    peta_iframe_url: "https://maps.google.com/maps?q=Karawaci%20Banten&t=&z=13&ie=UTF8&iwloc=&output=embed"
};

function VillageProfile() {
    // Catatan: Jika data sudah siap di Zustand, Anda tinggal mengganti baris di bawah dengan:
    // const dataDesa = useProfileStore((state) => state.dataDesa);
    const dataDesa = mockDataDesa;
    const [activeImage, setActiveImage] = useState<{ url: string; title: string } | null>(null);

    return (
        <div>
            <HeaderComponent is_homepage={false} />
            <div className="mt-24 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 dark:bg-green-700 transition-colors duration-200">
                <div className="max-w-5xl mx-auto space-y-10">
                    {/* === HEADER HALAMAN === */}
                    <div className="text-center border-b border-gray-200 dark:border-green-800 pb-6">
                        <h1 className="text-xl lg:text-4xl font-semibold tracking-tight text-pretty text-green-900 sm:text-5xl dark:text-white">
                            Profil Resmi {dataDesa.nama_desa}
                        </h1>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Informasi sejarah, visi-misi, kelembagaan, dan tata wilayah geografis desa.
                        </p>
                    </div>

                    {/* === BAGIAN 1: VISI & MISI (Dibuat Grid 2 Kolom Seimbang) === */}
                    <section className="grid grid-cols-1 gap-6">
                        <Card className="border-l-4 border-l-green-600 bg-white dark:bg-green-800 dark:border-green-900">
                            <h2 className="text-xl font-semibold text-green-900 dark:text-white mb-2 flex items-center gap-2">
                                🎯 Visi Desa
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed text-sm">
                                "{dataDesa.visi}"
                            </p>
                        </Card>

                        <Card className="border-l-4 border-l-emerald-600 bg-white dark:bg-green-800 dark:border-green-900">
                            <h2 className="text-xl font-semibold text-green-900 dark:text-white mb-2 flex items-center gap-2">
                                📝 Misi Desa
                            </h2>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 list-decimal pl-4 leading-relaxed">
                                {dataDesa.misi.map((item, index) => (
                                    <li key={index} className="pl-1">{item}</li>
                                ))}
                            </ul>
                        </Card>
                    </section>

                    {/* === BAGIAN 2: SEJARAH DESA (Desain Membaca Buku) === */}
                    <section className="bg-white dark:bg-green-800 rounded-lg p-6 shadow-sm border border-green-100 dark:border-green-900">
                        <h2 className="text-xl font-semibold text-green-900 dark:text-white mb-4 flex items-center gap-2">
                            📜 Sejarah Singkat Desa
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-justify indent-8">
                            {dataDesa.sejarah}
                        </p>
                    </section>

                    {/* === BAGIAN 3: STRUKTUR ORGANISASI & BPD (Tab / Tampilan Berjejer) === */}
                    <section className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-green-900 dark:text-white mb-1">
                                🏛️ Struktur Kelembagaan Desa
                            </h2>
                            <p className="text-xs text-gray-400 dark:text-gray-200">
                                Klik pada gambar bagan untuk memperbesar dan melihat detail struktur.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 💡 Bagan Pemerintah Desa */}
                            <div className="bg-white dark:bg-green-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-green-900 flex flex-col justify-between">
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 text-center border-b pb-2">
                                    Bagan SOTK Pemerintah Desa
                                </h3>
                                {/* Tambahkan onClick untuk memicu pop-up */}
                                <div
                                    className="overflow-hidden rounded-lg group border dark:border-green-700 cursor-zoom-in"
                                    onClick={() => setActiveImage({
                                        url: dataDesa.struktur_organisasi_url,
                                        title: `Bagan SOTK Pemerintah ${dataDesa.nama_desa}`
                                    })}
                                >
                                    <img
                                        src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, dataDesa.struktur_organisasi_url)}
                                        alt="Bagan Struktur Organisasi Pemdes"
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>

                            {/* 💡 Bagan BPD */}
                            <div className="bg-white dark:bg-green-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-green-900 flex flex-col justify-between">
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 text-center border-b pb-2">
                                    Bagan Struktur Badan Permusyawaratan Desa (BPD)
                                </h3>
                                {/* Tambahkan onClick untuk memicu pop-up */}
                                <div
                                    className="overflow-hidden rounded-lg group border dark:border-green-700 cursor-zoom-in"
                                    onClick={() => setActiveImage({
                                        url: dataDesa.struktur_bpd_url,
                                        title: `Bagan Struktur BPD ${dataDesa.nama_desa}`
                                    })}
                                >
                                    <img
                                        src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, dataDesa.struktur_bpd_url)}
                                        alt="Bagan Struktur BPD"
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* === BAGIAN 4: BATAS WILAYAH & PETA INTERAKTIF === */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        {/* Batas Geografis (1 Kolom) */}
                        <div className="bg-white dark:bg-green-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-green-900 flex flex-col justify-between md:col-span-1">
                            <div>
                                <h2 className="text-xl font-semibold text-green-900 dark:text-white mb-4">
                                    🗺️ Batas Wilayah
                                </h2>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between border-b pb-1 dark:border-green-600">
                                        <span className="font-medium text-gray-500 dark:text-gray-400">Utara:</span>
                                        <span className="text-gray-800 dark:text-gray-200 text-right text-xs max-w-37.5">{dataDesa.batas_wilayah.utara}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-1 dark:border-green-600">
                                        <span className="font-medium text-gray-500 dark:text-gray-400">Selatan:</span>
                                        <span className="text-gray-800 dark:text-gray-200 text-right text-xs max-w-37.5">{dataDesa.batas_wilayah.selatan}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-1 dark:border-green-600">
                                        <span className="font-medium text-gray-500 dark:text-gray-400">Timur:</span>
                                        <span className="text-gray-800 dark:text-gray-200 text-right text-xs max-w-37.5">{dataDesa.batas_wilayah.timur}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-1 dark:border-green-600">
                                        <span className="font-medium text-gray-500 dark:text-gray-400">Barat:</span>
                                        <span className="text-gray-800 dark:text-gray-200 text-right text-xs max-w-37.5">{dataDesa.batas_wilayah.barat}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Peta Digital Google Maps (2 Kolom) */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 md:col-span-2 min-h-62.5 flex flex-col">
                            <iframe
                                title={`Peta Wilayah Geografis ${dataDesa.nama_desa}`}
                                src={dataDesa.peta_iframe_url}
                                className="w-full h-full min-h-62.5 border-none grow"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </section>

                    <Modal
                        show={activeImage !== null}
                        onClose={() => setActiveImage(null)}
                        size="4xl" // Ukuran modal ekstra lebar agar bagan terlihat jelas
                        dismissible // User bisa menutup modal dengan klik di luar gambar
                    >
                        <ModalHeader className="border-b border-gray-200 dark:border-green-600 p-4">
                            <span className="text-base font-semibold text-green-900 dark:text-white">
                                {activeImage?.title}
                            </span>
                        </ModalHeader>

                        <ModalBody className="rounded-b-lg p-2 bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
                            {activeImage && (
                                <img
                                    src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, activeImage.url)}
                                    alt={activeImage.title}
                                    className="max-w-full max-h-[75vh] object-contain rounded shadow-md"
                                />
                            )}
                        </ModalBody>
                    </Modal>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}

export default VillageProfile;