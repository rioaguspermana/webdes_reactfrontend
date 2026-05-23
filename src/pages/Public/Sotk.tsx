import { OrganizationStructure } from '@/@types/sotk';
import { cleanFileUrl } from '@/@utils/cleanFileUrl';
import FooterComponent from '@/component/Public/Footer';
import HeaderComponent from '@/component/Public/Header';
import { Tabs, TabItem, ModalHeader, ModalBody, Modal } from 'flowbite-react';
import { useState } from 'react';

// 1. Data simulasi (Mock Data) yang sudah mematuhi struktur interface Anda
const mockDataSotk: OrganizationStructure = {
    village_sotk: [
        { id: 1, name: 'Haryanto SE', role: 'Kepala Desa', image: 'sotk_1.png', active: true },
        { id: 2, name: 'Budi Santoso', role: 'Sekertaris Desa', image: 'sotk_2.png', active: true },
        { id: 3, name: 'Yusnikarani', role: 'Kepala Seksi Kesejahteraan', image: 'sotk_3.png', active: true },
        { id: 4, name: 'Dewi Kartika', role: 'Kepala Seksi Pemerintahan', image: 'sotk_4.png', active: true },
        { id: 5, name: 'Rudi Hartono', role: 'Kepala Urusan Umum & Perencanaan', image: 'sotk_5.png', active: true },
        { id: 6, name: 'Lina Marlina', role: 'Kepala Urusan Keuangan', image: 'sotk_6.png', active: true },
        { id: 7, name: 'Fitri Ayu', role: 'Staf Kesejahteraan', image: 'sotk_7.png', active: true },
        { id: 8, name: 'Lisa Eka Putri', role: 'Staf Pemerintahan', image: 'sotk_8.png', active: true },
        { id: 9, name: 'Maya Sari', role: 'Staf Pemerintahan', image: 'sotk_9.png', active: true },
        { id: 10, name: 'Hasan Basri', role: 'Staff Umum', image: 'sotk_10.png', active: true },
        { id: 11, name: 'Irwan Munandar', role: 'Kepala Dusun Selatan', image: 'sotk_11.png', active: true },
        { id: 12, name: 'Siswanto', role: 'Kepala Dusun Utara', image: 'sotk_12.png', active: true },
    ],
    bpd_otk: [
        { id: 1, name: "Drs. Syarifuddin", role: "Ketua BPD", image: "https://unsplash.com", active: true, sk_number: "SK-BPD.10/Kutai/2024" },
        { id: 2, name: "Bambang Irawan", role: "Wakil Ketua BPD", image: "https://unsplash.com", active: true },
        { id: 3, name: "Dewi Lestari, S.Pd", role: "Sekretaris BPD", image: "https://unsplash.com", active: true },
        { id: 4, name: "Suprianto", role: "Anggota (Dusun Utara)", image: "https://unsplash.com", active: true },
        { id: 5, name: "Farida Utami", role: "Anggota (Perwakilan Perempuan)", image: "https://unsplash.com", active: true },
    ]
};
// Data simulasi (Mock Data) menyesuaikan format snake_case backend Go Anda
const mockDataDesa = {
    nama_desa: "Desa Sejahtera",
    struktur_organisasi_url: "struktur_organisasi_desa.png",
    struktur_bpd_url: "struktur_organisasi_bpd.png",
};

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

function Sotk() {
    // Catatan: Jika data sudah ditarik dari Zustand store backend Go, ganti baris ini dengan:
    // const { village_sotk, bpd_otk } = useSotkStore();
    const { village_sotk } = mockDataSotk;
    const [activeImage, setActiveImage] = useState<{ url: string; title: string } | null>(null);

    // Memisahkan pimpinan tertinggi (indeks ke-0) untuk baris headline atas
    const dataDesa = mockDataDesa;

    return (
        <div>
            <HeaderComponent is_homepage={false} />
            <div className="mt-24 bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 dark:bg-green-700 transition-colors">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* === HEADER SOTK === */}
                    <div className="text-center border-b pb-6 border-gray-200 dark:border-green-800">
                        <h1 className="text-3xl font-semibold text-green-900 dark:text-white">
                            🏛️ SOTK Lembaga Desa Sejahtera
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-green-300 max-w-2xl mx-auto">
                            Susunan aparatur Pemerintah Desa dan jajaran fungsional Badan Permusyawaratan Desa (BPD).
                        </p>
                    </div>

                    {/* === MAIN CONTAINER TABS MENGGUNAKAN THEME HIJAU === */}
                    <div className="bg-white dark:bg-green-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-green-800">
                        <Tabs aria-label="Lembaga Desa" theme={customTabsTheme}>

                            {/* 💼 TAB 1: PERANGKAT DESA / PEMDES */}
                            <TabItem active title="💼 Perangkat Pemerintah Desa">
                                <div className="space-y-8 mt-6">

                                    {/* 💡 Bagan Pemerintah Desa */}
                                    <div className="bg-white dark:bg-green-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-green-900 flex flex-col justify-between">
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-center border-b pb-2">
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
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:flex-auto text-center mt-20">
                                        <h2 className="text-xl lg:text-4xl font-semibold tracking-tight text-pretty text-green-900 sm:text-5xl dark:text-white">
                                            SOTK
                                        </h2>
                                        <div className="my-2 text-gray-600 dark:text-gray-300">
                                            <div className="text-base lg:text-xl">
                                                Struktur Organisasi dan Tata Kerja Desa Sejahtera
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block">
                                        <ul
                                            role="list"
                                            className="mx-auto mt-20 max-w-2xl grid grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                                        >
                                            {village_sotk.map((person, i) => (
                                                <li key={i}>
                                                    <img
                                                        alt={person.role}
                                                        src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, person.image)}
                                                        className={`${i === 0 ? 'border-2 border-blue-100 dark:border-green-800 outline-4 outline-blue-600 dark:outline-green-300' : 'outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10'} mx-auto size-24 rounded-full`}
                                                    />
                                                    <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">
                                                        {person.name}
                                                    </h3>
                                                    <p className="text-sm/6 text-gray-600 dark:text-gray-400">{person.role}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </TabItem>

                            {/* ⚖️ TAB 2: BPD (BADAN PERMUSYAWARATAN DESA) */}
                            <TabItem title="⚖️ Badan Permusyawaratan Desa (BPD)">
                                <div className="space-y-8 mt-6">
                                    <div className="bg-white dark:bg-green-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-green-900 flex flex-col justify-between">
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-center border-b pb-2">
                                            Bagan Badan Permusyawaratan Desa (BPD)
                                        </h3>
                                        <div
                                            className="overflow-hidden rounded-lg group border dark:border-green-700 cursor-zoom-in"
                                            onClick={() => setActiveImage({
                                                url: dataDesa.struktur_bpd_url,
                                                title: `Bagan Badan Permusyawaratan Desa (BPD)`
                                            })}
                                        >
                                            <img
                                                src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, dataDesa.struktur_bpd_url)}
                                                alt="Bagan Struktur Organisasi Pemdes"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabItem>
                        </Tabs>
                    </div>

                    <Modal
                        show={activeImage !== null}
                        onClose={() => setActiveImage(null)}
                        size="7xl" // Ukuran modal ekstra lebar agar bagan terlihat jelas
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

export default Sotk;