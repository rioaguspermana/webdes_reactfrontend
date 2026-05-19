export default function ProductSkeleton() {
    return (
        <div className="flex flex-col bg-white dark:bg-green-800 rounded-xl border border-green-100 dark:border-green-700 shadow-sm overflow-hidden animate-pulse">

            {/* 📷 Wadah Gambar Meniru aspect-[4/3] Aslinya */}
            <div className="w-full aspect-4/3 bg-green-200 dark:bg-green-800 border-b border-green-100 dark:border-green-700"></div>

            {/* Konten Detail Penanda Teks */}
            <div className="p-5 flex flex-col grow justify-between space-y-4">
                <div className="space-y-3">
                    {/* Judul Barang (Meniru line-clamp-1) */}
                    <div className="h-5 bg-green-200 dark:bg-green-700 rounded-md w-3/4"></div>

                    {/* Garis Pembatas, Harga, dan Opsi (Dipisah Baris) */}
                    <div className="flex flex-col gap-2 border-b border-green-50 dark:border-green-700 pb-2.5">
                        {/* Harga (Baris Atas) */}
                        <div className="h-6 bg-green-200 dark:bg-green-700 rounded-md w-1/3"></div>
                        {/* Opsi 2 baris teks panjang (Baris Bawah) */}
                        <div className="h-10 bg-green-200 dark:bg-green-700 rounded-md w-full"></div>
                    </div>

                    {/* Deskripsi Barang (Meniru line-clamp-3) */}
                    <div className="space-y-2 pt-1">
                        <div className="h-3 bg-green-200 dark:bg-green-700 rounded-md w-full"></div>
                        <div className="h-3 bg-green-200 dark:bg-green-700 rounded-md w-full"></div>
                        <div className="h-3 bg-green-200 dark:bg-green-700 rounded-md w-4/5"></div>
                    </div>
                </div>

                {/* Kaki Kartu: Info Pemilik & Tombol Hubungi */}
                <div className="space-y-3 pt-2">
                    <div className="text-left border-t pt-3 dark:border-green-700 space-y-1.5">
                        <div className="h-3 bg-green-200 dark:bg-green-700 rounded-md w-1/4"></div>
                        <div className="h-4 bg-green-200 dark:bg-green-700 rounded-md w-1/2"></div>
                    </div>

                    {/* Tombol Hubungi Penjual */}
                    <div className="w-full h-9 bg-green-200 dark:bg-green-700 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}