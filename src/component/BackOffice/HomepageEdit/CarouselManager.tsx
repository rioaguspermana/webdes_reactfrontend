import { CarouselItem } from '@/@types/carousel';
import { cleanFileUrl } from '@/@utils/cleanFileUrl';
import { useCarouselStore } from '@/store/useCarouselStore';
import { useUiStore } from '@/store/useHomepageEditStore';
import React, { useState, useRef, useEffect } from 'react';

export default function CarouselManager() {
    // Ambil state dan actions dari Zustand Store global
    const { carousels, createCarousel, error, updateCarousel, deleteCarousel, isLoading, successMessage } = useCarouselStore();
    const { isManagerOpen, closeManager } = useUiStore();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    const [formData, setFormData] = useState({
        title: '',
        sub_title: '',
        alt: '',
        urutan: 0,
        is_active: true,
        image: ''
    });

    const managerDialogRef = useRef<HTMLDialogElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isManagerOpen) {
            managerDialogRef.current?.showModal();
        } else {
            managerDialogRef.current?.close();
        }
    }, [isManagerOpen]);

    const openModal = (item?: CarouselItem) => {
        if (item) {
            setIsEditMode(true);
            setSelectedId(item.id);
            setFormData({
                title: item.title,
                sub_title: item.sub_title,
                alt: item.alt,
                urutan: item.urutan,
                is_active: item.is_active,
                image: item.image
            });
            setImagePreview(item.image);
        } else {
            setIsEditMode(false);
            setSelectedId(null);
            setFormData({ title: '', sub_title: '', alt: '', urutan: 0, is_active: true, image: '' });
            setImagePreview('');
        }
        setImageFile(null);
        dialogRef.current?.showModal();
    };

    const closeModal = () => dialogRef.current?.close();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('sub_title', formData.sub_title);
        submitData.append('alt', formData.alt);
        submitData.append('urutan', String(formData.urutan));
        submitData.append('is_active', String(formData.is_active));
        if (imageFile) submitData.append('image', imageFile);

        try {
            if (isEditMode && selectedId) {
                await updateCarousel(selectedId, submitData);
                console.log("Acsacascasc")
            } else {
                await createCarousel(submitData);
            }
            closeModal();
        } catch (err) {
            // Error logging sudah ditangani di dalam Zustand store
        }
    };

    return (
        <>
            <dialog
                ref={managerDialogRef}
                onClose={closeManager}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/40 backdrop:backdrop-blur-xs rounded-xl p-6 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white w-full max-w-5xl border border-gray-200 dark:border-zinc-800 shadow-2xl focus:outline-none m-0 text-sm"
            >
                <div className="border-b border-gray-200 dark:border-zinc-800 pb-4 mb-4">
                    {/* HEADER SEKSION (Meniru Judul Utama Gambar Contoh) */}
                    <div className="border-b border-gray-200 dark:border-zinc-800 pb-4 mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold tracking-tight">Manajemen Slide Banner</h2>
                            <p className="text-xs text-gray-500">Urutkan dan kelola gambar tampilan spanduk utama halaman depan.</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded cursor-pointer">
                                + Tambah Slide
                            </button>
                            <button onClick={closeManager} className="border border-gray-200 dark:border-zinc-700 text-xs font-semibold px-3 py-1.5 rounded hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer">
                                Tutup
                            </button>
                        </div>
                    </div>

                    {/* LIST KARTU MINI CAROUSEL */}
                    <div className="space-y-4 lg:h-108 overflow-y-auto pr-1">
                        {carousels.length === 0 ? (
                            <p className="text-sm text-center py-12 text-gray-400 border border-dashed border-gray-200 dark:border-zinc-800 rounded-lg">Belum ada slide banner tersedia.</p>
                        ) : (
                            carousels.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <img
                                            src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, item.image)}
                                            alt={item.alt}
                                            className="w-20 h-12 object-cover rounded border border-gray-100 dark:border-zinc-700 bg-gray-50 shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate tracking-tight">{item.title || "Tanpa Judul"}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Urutan: <span className="font-semibold text-gray-700 dark:text-zinc-300">{item.urutan}</span> • Status: {item.is_active ? <span className="text-emerald-600 font-medium">Aktif</span> : <span className="text-rose-500 font-medium">Nonaktif</span>}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button onClick={() => openModal(item)} className="text-xs border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 px-3 py-1.5 rounded font-semibold transition-colors cursor-pointer">Edit</button>
                                        <button onClick={() => deleteCarousel(item.id)} className="text-xs border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 hover:bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 px-3 py-1.5 rounded font-semibold transition-colors cursor-pointer">Hapus</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </dialog>

            {/* DIALOG FORM POP-UP MODAL (Meniru Form Bergaris Gaya Identitas Desa) */}
            <dialog
                ref={dialogRef}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/40 backdrop:backdrop-blur-xs rounded-xl p-7 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white w-full max-w-lg border border-gray-200 dark:border-zinc-800 shadow-xl focus:outline-none m-0 animate-fade-in"
            >
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-zinc-800 mb-6">
                    <h3 className="font-bold dark:text-white tracking-tight uppercase text-xs text-indigo-600">
                        {isEditMode ? 'Formulir Edit Slide Banner' : 'Formulir Tambah Slide Baru'}
                    </h3>
                    <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 text-sm cursor-pointer p-1">✕</button>
                </div>

                {/* Status Server */}
                {error && <div className="p-3 my-4 text-xs font-semibold text-red-700 bg-red-50 border rounded-xl dark:bg-red-950/40 dark:text-red-400">⚠️ {error}</div>}
                {successMessage && <div className="p-3 text-xs font-semibold text-green-700 bg-green-50 border rounded-xl dark:bg-green-950/40 dark:text-green-300">✅ {successMessage}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* SEKSION FORM I: INFORMASI UTAMA */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Judul Banner</label>
                            <textarea
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                rows={2}
                                required
                                className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-transparent rounded text-sm font-medium focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none resize-none text-gray-900 dark:text-white"
                                placeholder="Masukkan judul utama spanduk..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Sub-Judul / Informasi Tambahan</label>
                            <textarea
                                name="sub_title"
                                value={formData.sub_title}
                                onChange={handleInputChange}
                                rows={2}
                                required
                                className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-transparent rounded text-sm font-medium focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none resize-none text-gray-900 dark:text-white"
                                placeholder="Website resmi pelayanan publik dan keterbukaan informasi..."
                            />
                        </div>
                    </div>

                    {/* SEKSION FORM II: PENGATURAN TEKNIS & URUTAN */}
                    <div className="border-t border-gray-200 dark:border-zinc-800 pt-5 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Alt Gambar (Keterangan SEO)</label>
                            <input
                                type="text"
                                name="alt"
                                value={formData.alt}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-transparent rounded text-sm font-medium focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none text-gray-900 dark:text-white"
                                placeholder="Contoh: Kantor Desa Sejahtera"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Urutan Penayangan</label>
                            <input
                                type="number"
                                name="urutan"
                                value={formData.urutan}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 bg-transparent rounded text-sm font-medium focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none text-gray-900 dark:text-white"
                                placeholder="1"
                            />
                        </div>
                    </div>

                    {/* SEKSION FORM III: MEDIA & DOKUMEN */}
                    <div className="border-t border-gray-200 dark:border-zinc-800 pt-5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Berkas Gambar Banner (Maks 2MB)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required={!isEditMode}
                            className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-200 dark:file:border-zinc-700 file:text-xs file:font-semibold file:bg-gray-50 dark:file:bg-zinc-800 file:text-gray-700 dark:file:text-zinc-300 file:cursor-pointer"
                        />
                        {imagePreview && (
                            <div className="mt-3 p-1 border border-gray-200 dark:border-zinc-800 rounded bg-gray-50 dark:bg-zinc-800/30">
                                <img
                                    src={(imagePreview && imagePreview.startsWith('blob:'))
                                        ? imagePreview
                                        : cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, formData?.image ?? '')}
                                    alt="Preview Ungguhan" className="w-full h-28 object-cover rounded" />
                            </div>
                        )}
                    </div>

                    {/* STATUS PENAYANGAN */}
                    <div className="flex items-center gap-2.5 pt-1">
                        <input
                            type="checkbox"
                            id="is_active"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                            className="rounded size-4 border-gray-300 dark:border-zinc-700 accent-indigo-600 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <label htmlFor="is_active" className="text-xs font-semibold text-gray-700 dark:text-zinc-300 select-none cursor-pointer">
                            Aktifkan spanduk ini agar langsung tayang di Halaman Utama Desa
                        </label>
                    </div>

                    {/* TOMBOL AKSI PENGONTROL */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-zinc-800">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 border border-gray-200 dark:border-zinc-700 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded shadow-xs disabled:opacity-50 transition-colors cursor-pointer"
                        >
                            {isLoading ? 'Menyimpan...' : 'Simpan Data'}
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
}
