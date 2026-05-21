import { ProfilDesa } from '@/@types/profil_desa';
import { cleanFileUrl } from '@/@utils/cleanFileUrl';
import { useProfileStore } from '@/store/useProfilDesa';
import React, { useEffect, useRef, useState } from 'react';

function ProfilDesaManager() {
    const { profilDesa, isLoading, isSaving, error, successMessage, updateProfilDesa } = useProfileStore();

    const [isEditMode, setIsEditMode] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // State lokal penampung data form
    const [formData, setFormData] = useState<ProfilDesa>({
        id: '', nama_desa: '', alamat_lengkap: '', kelurahan: '', kecamatan: '',
        kabupaten_kota: '', provinsi: '', kode_pos: '', kode_wilayah: '',
        email: '', nomor_telepon: '', logo_desa: '', deskripsi_singkat: '',
    });

    useEffect(() => {
        if (profilDesa) {
            setFormData(profilDesa);
        }
    }, [profilDesa]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 1. 🔥 Simpan berkas biner asli ke dalam state untuk dikirim ke Go nanti
        setSelectedFile(file);

        // 2. Buat Blob URL sementara agar pratinjau gambar di layar browser tetap muncul
        const localUrl = URL.createObjectURL(file);
        setImagePreview(localUrl);
    };

    const handleCancel = () => {
        if (profilDesa) {
            setFormData(profilDesa);
            setImagePreview(profilDesa.logo_desa);
        }
        setSelectedFile(null); // Bersihkan sisa file biner
        setIsEditMode(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 🔥 Kirimkan data form teks beserta berkas biner gambar ke store Zustand
        const success = await updateProfilDesa(formData, selectedFile);
        if (success) {
            setSelectedFile(null); // Bersihkan state berkas setelah sukses terunggah
            setIsEditMode(false);
            setImagePreview(null)
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-xs text-gray-400">Memuat data profil desa...</div>;
    }

    return (
        // 💡 PERUBAHAN: Lebar kontainer dinaikkan menjadi max-w-6xl agar form terasa luas & lega
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-zinc-950 min-h-screen transition-colors duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-6 sm:p-8 shadow-md space-y-8">

                {/* === HEADER MANAGER === */}
                <div className="flex flex-col sm:flex-row justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-5 gap-4">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-black text-green-900 dark:text-white">Manajemen Informasi Umum Desa</h1>
                        <p className="text-xs text-gray-400 mt-1">Kelola data tunggal identitas administratif, media komunikasi, dan logo resmi desa.</p>
                    </div>

                    {!isEditMode ? (
                        <button
                            type="button"
                            onClick={() => setIsEditMode(true)}
                            className="px-5 py-2.5 bg-green-700 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-green-800 transition-colors cursor-pointer"
                        >
                            📝 Edit Informasi Desa
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-5 py-2.5 bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-300 text-xs font-bold rounded-xl shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                        >
                            ❌ Batalkan
                        </button>
                    )}
                </div>

                {/* Status Server */}
                {error && <div className="p-3 text-xs font-semibold text-red-700 bg-red-50 border rounded-xl dark:bg-red-950/40 dark:text-red-400">⚠️ {error}</div>}
                {successMessage && <div className="p-3 text-xs font-semibold text-green-700 bg-green-50 border rounded-xl dark:bg-green-950/40 dark:text-green-300">✅ {successMessage}</div>}

                {/* === FORM CONTAINER === */}
                <form onSubmit={handleSubmit} className="space-y-8 text-xs">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* 📋 SEKTOR KIRI & TENGAH: ISIAN FORM TEKS (2 KOLOM GRID) */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Bagian I: Identitas */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-green-800 dark:text-green-400 uppercase tracking-wider border-b pb-1.5 dark:border-zinc-800">I. Identitas Utama Desa</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="font-semibold text-gray-600 dark:text-zinc-400">Nama Resmi Desa</label>
                                        <input type="text" name="nama_desa" value={formData.nama_desa} onChange={handleChange} required disabled={!isEditMode || isSaving} className={`w-full p-2.5 rounded-xl border text-gray-800 dark:text-white transition-all ${isEditMode ? 'bg-gray-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-green-600' : 'bg-white dark:bg-zinc-900 border-transparent cursor-not-allowed font-bold text-sm'}`} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="font-semibold text-gray-600 dark:text-zinc-400">Kode Wilayah Dagri</label>
                                        <input type="text" name="kode_wilayah" value={formData.kode_wilayah} onChange={handleChange} disabled={!isEditMode || isSaving} className={`w-full p-2.5 rounded-xl border text-gray-800 dark:text-white transition-all ${isEditMode ? 'bg-gray-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-green-600' : 'bg-white dark:bg-zinc-900 border-transparent cursor-not-allowed font-mono'}`} />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="font-semibold text-gray-600 dark:text-zinc-400">Deskripsi Singkat / Slogan Desa</label>
                                    <textarea name="deskripsi_singkat" value={formData.deskripsi_singkat} onChange={handleChange} rows={2} disabled={!isEditMode || isSaving} className={`w-full p-2.5 rounded-xl border text-gray-800 dark:text-white transition-all ${isEditMode ? 'bg-gray-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-green-600' : 'bg-white dark:bg-zinc-900 border-transparent cursor-not-allowed leading-relaxed'}`} />
                                </div>
                            </div>

                            {/* Bagian II: Wilayah */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-green-800 dark:text-green-400 uppercase tracking-wider border-b pb-1.5 dark:border-zinc-800">II. Wilayah Administratif</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {['kelurahan', 'kecamatan', 'kabupaten_kota', 'provinsi', 'kode_pos'].map((field) => (
                                        <div key={field} className="space-y-1.5">
                                            <label className="font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide text-[9px]">{field.replace('_', ' ')}</label>
                                            <input
                                                type="text"
                                                name={field}
                                                value={(formData as any)[field]}
                                                onChange={handleChange}
                                                required={field !== 'kelurahan'}
                                                disabled={!isEditMode || isSaving}
                                                className={`w-full p-2.5 rounded-xl border text-gray-800 dark:text-white transition-all ${isEditMode ? 'bg-gray-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-green-600' : 'bg-white dark:bg-zinc-900 border-transparent cursor-not-allowed'}`} />
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="font-semibold text-gray-600 dark:text-zinc-400">Alamat Kantor Lengkap</label>
                                    <textarea name="alamat_lengkap" value={formData.alamat_lengkap} onChange={handleChange} rows={2} required disabled={!isEditMode || isSaving} className={`w-full p-2.5 rounded-xl border text-gray-800 dark:text-white transition-all ${isEditMode ? 'bg-gray-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-green-600' : 'bg-white dark:bg-zinc-900 border-transparent cursor-not-allowed'}`} />
                                </div>
                            </div>

                            {/* Bagian III: Kontak */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-green-800 dark:text-green-400 uppercase tracking-wider border-b pb-1.5 dark:border-zinc-800">III. Media Komunikasi Instansi</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="font-semibold text-gray-600 dark:text-zinc-400">Email Resmi</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={!isEditMode || isSaving} className={`w-full p-2.5 rounded-xl border text-gray-800 dark:text-white transition-all ${isEditMode ? 'bg-gray-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-green-600' : 'bg-white dark:bg-zinc-900 border-transparent cursor-not-allowed'}`} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="font-semibold text-gray-600 dark:text-zinc-400">No. Telepon Kantor</label>
                                        <input type="text" name="nomor_telepon" value={formData.nomor_telepon} onChange={handleChange} required disabled={!isEditMode || isSaving} className={`w-full p-2.5 rounded-xl border text-gray-800 dark:text-white transition-all ${isEditMode ? 'bg-gray-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-green-600' : 'bg-white dark:bg-zinc-900 border-transparent cursor-not-allowed'}`} />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* 🖼️ SEKTOR KANAN: KHUSUS COMPONENT FILE INPUT/IMAGE INPUT (1 KOLOM GRID) */}
                        <div className="bg-gray-50 dark:bg-zinc-950/40 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 space-y-4 sticky top-6">
                            <h3 className="font-bold text-green-800 dark:text-green-400 uppercase tracking-wider border-b pb-1.5 dark:border-zinc-800/60">IV. Logo Resmi Wilayah</h3>

                            {/* Live Preview Box */}
                            <div className="w-full aspect-square bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-center p-4 shadow-inner relative group">
                                <img
                                    src={(imagePreview && imagePreview.startsWith('blob:'))
                                        ? imagePreview
                                        : cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, profilDesa?.logo_desa ?? '')}
                                    alt="Logo Desa"
                                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            {/* Elemen File Input Tersembunyi untuk Keindahan Desain */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            {/* Tombol Trigger Pilih File Kustom (Hanya Aktif di Mode Edit) */}
                            {isEditMode ? (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isSaving}
                                    className="w-full py-2.5 bg-zinc-800 text-white dark:bg-zinc-700 dark:hover:bg-zinc-600 hover:bg-zinc-900 text-center font-bold rounded-xl transition-colors cursor-pointer"
                                >
                                    📁 Pilih File Gambar Logo
                                </button>
                            ) : (
                                <span className="w-full block py-2 text-center text-gray-400 bg-gray-100 dark:bg-zinc-900 rounded-xl border border-dashed text-[10px]">
                                    🔒 Input gambar dikunci (Mode Baca)
                                </span>
                            )}
                            <p className="text-[10px] text-gray-400 text-center leading-normal">Mendukung file ekstensi .png, .jpg, atau .ico. Maksimal kompresi sistem otomatis.</p>
                        </div>

                    </div>

                    {/* === ACTION CONTROL FOOTER === */}
                    {isEditMode && (
                        <div className="flex justify-end gap-3 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isSaving}
                                className="px-5 py-2.5 bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-300 font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-6 py-2.5 bg-green-700 text-white font-bold rounded-xl shadow-sm hover:bg-green-800 transition-colors disabled:bg-green-400 flex items-center gap-2 cursor-pointer"
                            >
                                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan Master'}
                            </button>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
}

export default ProfilDesaManager;