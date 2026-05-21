import { useState, useEffect } from 'react';
import { TextInput } from 'flowbite-react';
import { formatPhoneNumber } from '@/@utils/formatPhoneNumber';
import HeaderComponent from '@/component/Public/Header';
import FooterComponent from '@/component/Public/Footer';
import { cleanFileUrl } from '@/@utils/cleanFileUrl';
import { useUmkmProductStore } from '@/store/useUmkmProductStore';
import ProductSkeleton from '@/component/Public/ProductSkeleton';


function UmkmPage() {
    // Ambil semua state terpusat dari Zustand store
    const { products, currentPage, totalPages, isLoading, setSearch, setCurrentPage, fetchProducts } = useUmkmProductStore();
    const [localSearch, setLocalSearch] = useState('');


    // 2. 🔥 LOGIKA DEBOUNCE: Tunggu user berhenti mengetik selama 500ms
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // Set nilai search ke Zustand setelah 500ms diam
            setSearch(localSearch);
        }, 500); // 500 milidetik

        // Bersihkan timer (cleanup) jika user mengetik huruf baru sebelum 500ms selesai
        return () => clearTimeout(delayDebounceFn);
    }, [localSearch, setSearch]);

    const searchGlobal = useUmkmProductStore((state) => state.search);
    useEffect(() => {
        fetchProducts();
    }, [currentPage, searchGlobal, fetchProducts]);

    return (
        <div>
            <HeaderComponent is_homepage={false} />
            <div className="mt-24 bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 dark:bg-green-700 transition-colors duration-200">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* === HEADER === */}
                    <div className="text-center border-b border-gray-200 dark:border-green-900 pb-6">
                        <h1 className="text-3xl font-semibold tracking-tight text-green-900 dark:text-white sm:text-4xl">
                            Sentra Produksi & UMKM Desa
                        </h1>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                            Dukung perekonomian warga dengan membeli produk kerajinan tangan dan panganan lokal unggulan kami.
                        </p>
                    </div>

                    {/* Kolom Pencarian */}
                    <div className="max-w-md mx-auto">
                        <TextInput
                            type="text"
                            placeholder="Cari produk desa..."
                            value={localSearch}
                            color='success'
                            onChange={(e) => setLocalSearch(e.target.value)}
                        />
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                        </div>
                    ) : products.length > 0 ? (
                        /* Grid Utama Produk */
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {products.map((product) => {
                                // Bersihkan nomor HP dan ubah ke kode negara 62 untuk API WhatsApp resmi
                                const formattedPhone = formatPhoneNumber(product.whatsappNumber);
                                const messageWa = encodeURIComponent(`Halo, saya tertarik mendiskusikan atau memesan produk "${product.name}" yang tertera di website resmi desa.`);

                                return (
                                    <div
                                        key={product.id}
                                        className="flex flex-col bg-white dark:bg-green-800 rounded-xl border border-green-100 dark:border-green-900 shadow-sm overflow-hidden relative"
                                    >
                                        {/* Label Status Stok */}
                                        <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-0 ${product.stockStatus === 'Tersedia'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-200'
                                            : 'bg-amber-100 text-amber-800 dark:bg-amber-600 dark:text-amber-200'
                                            }`}>
                                            {product.stockStatus}
                                        </span>

                                        {/* 📷 KUNCI UKURAN GAMBAR FIX & KONSISTEN */}
                                        <div className="w-full aspect-4/3 bg-green-100 dark:bg-green-800 overflow-hidden border-b border-green-100 dark:border-gray-900">
                                            <img
                                                src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, product.imageUrl)}
                                                alt={product.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                                            />
                                        </div>

                                        {/* Konten Detail Produk */}
                                        <div className="p-5 flex flex-col grow justify-between space-y-4">
                                            <div className="space-y-2">
                                                <h3 className="text-base font-semibold text-green-900 dark:text-white line-clamp-1 leading-tight">
                                                    {product.name}
                                                </h3>

                                                <div className="flex flex-col gap-1.5 border-b border-green-50 dark:border-green-900 pb-2.5">
                                                    <span className="text-lg font-bold text-green-700 dark:text-green-400">
                                                        {product.price}
                                                    </span>
                                                    <span className="text-[11px] text-green-500 bg-green-50 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded border border-green-100 dark:border-green-600 font-medium w-full block text-center leading-relaxed wrap-break-word">
                                                        {product.options}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-gray-500 dark:text-gray-300 text-justify line-clamp-3 pt-1 leading-relaxed">
                                                    {product.description}
                                                </p>
                                            </div>

                                            {/* Bagian Hubungi Penjual */}
                                            <div className="space-y-3 pt-2">
                                                <div className="text-[11px] text-left border-t pt-3 border-green-600 dark:border-green-700">
                                                    <p className="text-gray-400">Pemilik / Unit Usaha:</p>
                                                    <p className="font-semibold text-gray-700 dark:text-gray-200 truncate">{product.sellerName}</p>
                                                </div>

                                                <a
                                                    href={`https://wa.me/${formattedPhone}?text=${messageWa}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-center text-xs font-semibold text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                                                >
                                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.966 0c3.178.001 6.169 1.24 8.419 3.496 2.25 2.256 3.489 5.252 3.488 8.434-.005 6.612-5.342 11.96-11.91 11.96m0 0c-1.98-.002-3.922-.524-5.633-1.517l-.404-.24-4.17 1.093" />
                                                    </svg>
                                                    Hubungi Penjual
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">❌ Produk tidak ditemukan.</div>
                    )}

                    {/* === TOMBOL MENU PAGINATION DARI BACKEND === */}
                    {!isLoading && totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-8 border-t dark:border-green-900">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="p-2 text-xs text-gray-800 dark:text-white bg-white rounded-lg border hover:text-white hover:bg-green-800 dark:bg-green-800 dark:border-green-700 disabled:opacity-50"
                            >
                                &larr; Prev
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, idx) => {
                                    const pageNum = idx + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            type="button"
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`px-3.5 py-2 text-xs font-semibold rounded-lg border ${currentPage === pageNum
                                                ? 'bg-green-700 text-white dark:border-green-600'
                                                : 'bg-white text-gray-700 hover:text-white hover:bg-green-800 dark:hover:bg-green-500 dark:bg-green-900 dark:text-gray-300 dark:border-green-900'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="p-2 text-xs text-gray-800 dark:text-white bg-white rounded-lg border hover:text-white hover:bg-green-800 dark:bg-green-800 dark:border-green-700 disabled:opacity-50"
                            >
                                Next &rarr;
                            </button>
                        </div>
                    )}

                </div>
            </div>
            <FooterComponent />
        </div>
    );
}

export default UmkmPage;