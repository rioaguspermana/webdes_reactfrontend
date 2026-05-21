import { cleanFileUrl } from "@/@utils/cleanFileUrl";
import { useAlertStore } from "@/store/useAlertStore";
import { useHomepageStore } from "@/store/useHomepageSettingStore";
import { useEffect, useRef, useState } from "react";

const welcomeSpeech: HomeSection = {
    title: "Sambutan Kepala Desa",
    post_by: "Haryanto SE",
    post_by_title: "Kepala Desa Sejahtera",
    post_content: "Website ini hadir sebagai wujud transformasi desa Sejahtera menjadi desa yang mampu memanfaatkan teknologi informasi dan komunikasi, terintegrasi kedalam sistem online. Keterbukaan informasi publik, pelayanan publik dan kegiatan perekonomian di desa, guna mewujudkan desa Sejahtera sebagai desa wisata yang berkelanjutan, adaptasi dan mitigasi terhadap perubahan iklim serta menjadi desa yang mandiri. \n Terima kasih kepada semua pihak yang telah banyak memberi dukungan dan kontribusi baik berupa tenaga, pikiran dan semangat, sehingga website ini dapat terealisasi.",
    image: "sambutan_kepala_desa.png"
}

function WelcomeSpeechComponent() {
    const { showAlert } = useAlertStore();
    const { homepageSetting, isSaving, updateFieldDinamic, uploadImage } = useHomepageStore();
    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [editContent, setEditContent] = useState<boolean>(false);

    const [localTitle, setLocalTitle] = useState<string>(homepageSetting?.sambutan_kepdes ?? '');
    const [localContent, setLocalContent] = useState<string>(homepageSetting?.sambutan_kepdes_content ?? '');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    const titleFormRef = useRef<HTMLDivElement>(null);
    const contentFormRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (homepageSetting) {
            setLocalTitle(homepageSetting.sambutan_kepdes ?? '');
            setLocalContent(homepageSetting.sambutan_kepdes_content ?? '');
        }
    }, [homepageSetting]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent | PointerEvent) => {
            // Jika mode edit judul aktif DAN yang diklik BUKAN bagian dari form judul
            if (editTitle && titleFormRef.current && !titleFormRef.current.contains(event.target as Node)) {
                cancelField("sambutan_kepdes");
            }
            // Jika mode edit judul aktif DAN yang diklik BUKAN bagian dari form judul
            if (editContent && contentFormRef.current && !contentFormRef.current.contains(event.target as Node)) {
                cancelField("sambutan_kepdes_content");
            }
        };

        // Daftarkan event listener klik global ke dokumen peramban
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        // Bersihkan event listener saat komponen dilepas (unmount) agar tidak bocor memori
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [editTitle, editContent]);

    const saveField = async (field: 'sambutan_kepdes' | 'sambutan_kepdes_content') => {
        try {
            if (field === 'sambutan_kepdes') {
                await updateFieldDinamic(field, localTitle);
                setEditTitle(false);
            } else if (field === 'sambutan_kepdes_content') {
                await updateFieldDinamic(field, localContent);
                setEditContent(false);
            }
        } catch (err) {
            alert("Gagal menyimpan perubahan!");
        }
    };

    const cancelField = (field: 'sambutan_kepdes' | 'sambutan_kepdes_content') => {
        if (homepageSetting) {
            if (field === 'sambutan_kepdes') {
                setLocalTitle(homepageSetting.sambutan_kepdes);
                setEditTitle(false)
            } else if (field === 'sambutan_kepdes_content') {
                setLocalContent(homepageSetting.sambutan_kepdes_content);
                setEditContent(false)
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Validasi ukuran maksimal file (2 MB) di sisi client
            if (file.size > 1 << 20) {
                alert("Ukuran berkas terlalu besar! Maksimal ukuran foto adalah 2 MB.");
                return;
            }

            setSelectedFile(file);
            // Membuat Blob URL instan untuk pratinjau lokal
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Pemicu klik pada input file tersembunyi saat tombol pensil ditekan
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    // Aksi menyimpan file gambar baru ke backend Golang via Zustand
    const handleSaveImage = async () => {
        if (!selectedFile) return;
        try {
            await uploadImage(selectedFile);
            setSelectedFile(null);
            showAlert('Foto sambutan Kepala Desa berhasil diperbarui!', 'success');
        } catch (err) {
            console.error("Gagal mengunggah foto:", err);
        }
    };

    const handleCancelChangeImage = () => {
        setSelectedFile(null);
        if (homepageSetting?.sambutan_kepdes_image) {
            setImagePreview(homepageSetting.sambutan_kepdes_image);
        }
    };

    return (
        <div className="w-full" >
            <div className="bg-white py-16 sm:py-48 dark:bg-green-700">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-8 lg:gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
                            <div className="relative w-full lg:max-w-lg lg:flex-auto">
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

                                <div className="absolute top-4 right-4 z-10 flex gap-2">
                                    {selectedFile ? (
                                        /* JIKA ADA FILE BARU: Ganti menjadi tombol Simpan (Centang) & Batal (Silang) */
                                        <>
                                            <button
                                                onClick={handleSaveImage}
                                                disabled={isSaving}
                                                title="Simpan Gambar Baru"
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white size-9 rounded-md flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-xs select-none hover:scale-105 disabled:opacity-50"
                                            >
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={handleCancelChangeImage}
                                                title="Batalkan Pengunggahan"
                                                className="bg-rose-600 hover:bg-rose-700 text-white size-9 rounded-md flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-xs select-none hover:scale-105"
                                            >
                                                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </>
                                    ) : (
                                        /* JIKA TIDAK ADA FILE BARU: Tampilkan Tombol Pensil Melayang Standar */
                                        <button
                                            onClick={triggerFileSelect}
                                            title="Pilih Foto Baru"
                                            className="bg-green-300/60 border border-green-500 hover:bg-green-600 text-green-100 size-9 rounded-md flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-xs select-none hover:scale-105"
                                        >
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <img
                                    alt={welcomeSpeech.title}
                                    src={(imagePreview && imagePreview.startsWith('blob:'))
                                        ? imagePreview
                                        : cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, welcomeSpeech.image ?? '')}
                                    className="aspect-6/5 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 lg:aspect-auto lg:h-80 dark:outline-white/10"
                                />
                            </div>
                            <div className="w-full lg:max-w-xl lg:flex-auto text-center lg:text-left">
                                <div className="relative group/title">
                                    {editTitle ? (
                                        /* MODE EDIT: INPUT JUDUL */
                                        <div ref={titleFormRef} className="flex items-center gap-3 w-full border-b border-indigo-500 bg-indigo-50/30 dark:bg-zinc-800/50 px-2 py-1 rounded-t">
                                            <input
                                                type="text"
                                                value={localTitle}
                                                placeholder={localTitle}
                                                onChange={(e) => setLocalTitle(e.target.value)}
                                                className="w-full text-xl lg:text-4xl font-semibold text-teal-950 dark:text-white bg-transparent focus:outline-none tracking-tight"
                                                autoFocus
                                            />
                                            {/* TOMBOL AKSI INLINE */}
                                            <div className="flex gap-1 shrink-0">
                                                <button
                                                    onClick={() => saveField('sambutan_kepdes')}
                                                    disabled={false}//isloading
                                                    title="Simpan"
                                                    className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                                >
                                                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => cancelField('sambutan_kepdes')}
                                                    title="Batal"
                                                    className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded transition-colors cursor-pointer"
                                                >
                                                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* MODE LIHAT: TAMPILAN TEXT + EFEK HOVER TRANSPARAN */
                                        <div
                                            onClick={() => setEditTitle(true)}
                                            className={`flex items-start gap-3 w-full group rounded transition-all duration-200 ${true ? 'hover:opacity-65 hover:bg-gray-50 dark:hover:bg-zinc-800/30 cursor-text select-none' : ''}`}
                                        >
                                            <h2 className="text-xl lg:text-4xl font-semibold text-teal-950 dark:text-white tracking-tight leading-tight flex-1">
                                                {localTitle}
                                            </h2>
                                            {/* IKON PENSIL DI UJUNG TEXT */}
                                            {true && (
                                                <span className="absolute lg:relative right-0 text-gray-300 dark:text-zinc-600 group-hover/title:text-indigo-500 p-1 transition-colors shrink-0 pt-2">
                                                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                    </svg>
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2 text-gray-600 dark:text-gray-300">
                                    <div className="text-xl font-semibold">{welcomeSpeech.post_by}</div>
                                    <div>{welcomeSpeech.post_by_title}</div>
                                </div>
                                <div className="relative group/sub">
                                    {editContent ? (
                                        /* MODE EDIT: TEXTAREA SUBJUDUL */
                                        <div ref={contentFormRef} className="flex items-start gap-3 w-full border-b border-indigo-500 bg-indigo-50/30 dark:bg-zinc-800/50 rounded-t">
                                            <textarea
                                                value={localContent}
                                                onChange={(e) => setLocalContent(e.target.value)}
                                                rows={10}
                                                className="w-full mt-4 my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300 bg-transparent focus:outline-none"
                                                autoFocus
                                            />
                                            {/* TOMBOL AKSI INLINE */}
                                            <div className="flex gap-1 shrink-0 pt-1">
                                                <button
                                                    onClick={() => saveField('sambutan_kepdes_content')}
                                                    disabled={false}//isloading
                                                    title="Simpan"
                                                    className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                                >
                                                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => cancelField('sambutan_kepdes_content')}
                                                    title="Batal"
                                                    className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded transition-colors cursor-pointer"
                                                >
                                                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* MODE LIHAT: TAMPILAN TEXT SUBJUDUL + EFEK HOVER */
                                        <div
                                            onClick={() => setEditContent(true)}
                                            className={`flex items-start gap-3 w-full group rounded transition-all duration-200 ${true ? 'hover:opacity-65 hover:bg-gray-50 dark:hover:bg-zinc-800/30 cursor-text select-none' : ''}`}
                                        >
                                            <p className="mt-4 my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300">
                                                {localContent}
                                            </p>
                                            {/* IKON PENSIL DI UJUNG TEXT SUBJUDUL */}
                                            {true && (
                                                <span className="absolute lg:relative right-0 text-gray-300 dark:text-zinc-700 group-hover/sub:text-indigo-500 p-1 transition-colors shrink-0">
                                                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                    </svg>
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeSpeechComponent;