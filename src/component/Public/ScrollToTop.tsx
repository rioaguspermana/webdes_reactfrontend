import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // 💡 Memaksa browser kembali ke koordinat x=0 dan y=0 paling atas halaman
        window.scrollTo(0, 0);
    }, [pathname]); // Efek ini akan terpicu SETIAP KALI pathname/URL berubah

    return null; // Komponen ini tidak merender elemen visual apa pun
}