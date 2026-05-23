import { dataWisata, tourism } from '@/@types/tourism';
import { cleanFileUrl } from '@/@utils/cleanFileUrl'
import FooterComponent from '@/component/Public/Footer';
import HeaderComponent from '@/component/Public/Header';
import { useMemo, useState } from 'react';


const TourismDestination = () => {
    const baseUrl = import.meta.env.VITE_APP_URL;

    const [activeCategory, setActiveCategory] = useState<string>("Semua");

    const categoryObject = useMemo(() => {
        const listcategory = dataWisata.map((wisata) => wisata.category);

        const uniqueCategory = ["Semua", ...new Set(listcategory)];

        return uniqueCategory.map((category) => ({
            name: category,
            isActive: category === activeCategory
        }));
    }, [activeCategory]);

    const filteredWisata = useMemo(() => {
        if (activeCategory === "Semua") {
            return dataWisata;
        }
        return dataWisata.filter((wisata) => wisata.category === activeCategory);
    }, [dataWisata, activeCategory]);

    return (
        <div>
            <HeaderComponent is_homepage={false} />
            <div className="mt-24 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 dark:bg-green-700 transition-colors duration-200">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="relative bg-emerald-700 dark:bg-emerald-800 rounded-xl py-16 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]"></div>
                        <div className="relative max-w-3xl mx-auto">
                            <span className="bg-emerald-600 text-emerald-200 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                                Eksplorasi Desa Wisata
                            </span >
                            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                                {tourism.title}
                            </h1>
                            <p className="mt-4 text-emerald-100 max-w-xl mx-auto leading-relaxed">
                                {tourism.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* --- MAIN CONTENT (GRID CARDS) --- */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                        {/* Header Bagian Konten */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5 mb-8">
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white tracking-tight">
                                    Daftar Destinasi Pilihan
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-100 mt-1">
                                    Menampilkan tempat wisata aktif kelolaan Badan Usaha Milik Desa (BUMDes).
                                </p>
                            </div>
                            {/* Badge Filter Informasi Singkat */}
                            <div className="flex gap-2 mt-4 sm:mt-0 overflow-x-auto pb-2 sm:pb-0">
                                {categoryObject.map((category) => (
                                    <button
                                        key={category.name}
                                        onClick={() => setActiveCategory(category.name)}
                                        className={`text-xs font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 shrink-0 ${category.isActive
                                            ? "bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-500/20"
                                            : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                            }`}
                                    >
                                        {category.name} {category.isActive ? `(${filteredWisata.length})` : ''}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Grid List Wisata */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredWisata.map((wisata) => (
                                <article
                                    key={wisata.id}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-100 flex flex-col"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-16/10 bg-slate-100 overflow-hidden group">
                                        <img
                                            src={cleanFileUrl(baseUrl + '/image/', wisata.imageUrl)}
                                            alt={wisata.nama}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* category Badge di Atas Gambar */}
                                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
                                            {wisata.category}
                                        </span>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 flex flex-col grow">
                                        <h3 className="text-lg font-bold text-slate-800 hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1">
                                            {wisata.nama}
                                        </h3>

                                        {/* Informasi Lokasi */}
                                        <div className="flex items-center gap-1.5 mt-1.5 text-slate-500">
                                            <svg className="w-3.5 h-3.5 shrink-0 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                            </svg>
                                            <span className="text-xs tracking-wide line-clamp-1">{wisata.lokasi}</span>
                                        </div>

                                        <p className="mt-4 text-xs text-slate-600 leading-relaxed grow line-clamp-3">
                                            {wisata.deskripsi}
                                        </p>

                                        {/* Card Footer */}
                                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Tiket Masuk</p>
                                                <p className="text-sm font-bold text-emerald-700">{wisata.hargaTiket}</p>
                                            </div>
                                            <a
                                                href={wisata.href}
                                                className="bg-emerald-900 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors duration-200">
                                                Lihat Detail
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
};


export default TourismDestination;