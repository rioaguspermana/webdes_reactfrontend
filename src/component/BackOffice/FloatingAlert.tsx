import { AlertTheme, useAlertStore } from '@/store/useAlertStore';
import React from 'react';

// Pemetaan gaya warna berdasarkan tema (Tema disesuaikan dengan form desa bergaris tipis)
const themeStyles: Record<AlertTheme, { container: string; icon: React.ReactNode }> = {
    success: {
        container: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-400',
        icon: (
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
        )
    },
    error: {
        container: 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50 text-rose-800 dark:text-rose-400',
        icon: (
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        )
    },
    warning: {
        container: 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50 text-amber-800 dark:text-amber-400',
        icon: (
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
        )
    },
    info: {
        container: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/50 text-indigo-800 dark:text-indigo-400',
        icon: (
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 1 1 1.059 1.035l-.018.018m-1.083-1.12.065-.02a.75.75 0 1 1 .986 1.138l-.066.02m-1.012-1.157h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008ZM12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" />
            </svg>
        )
    }
};

export default function FloatingAlert() {
    const { isOpen, message, theme, hideAlert } = useAlertStore();

    // Jika tidak aktif, jangan render apa pun ke DOM
    if (!isOpen) return null;

    const currentStyle = themeStyles[theme];

    return (
        <div
            className={`fixed bottom-5 right-5 z-70 flex items-center gap-3 max-w-sm p-4 rounded-lg border shadow-lg transition-all duration-300 transform scale-100 animate-fade-in text-xs font-semibold uppercase tracking-wider ${currentStyle.container}`}
        >
            {/* AREA IKON TEMA */}
            <div className="shrink-0">
                {currentStyle.icon}
            </div>

            {/* AREA TEXT PESAN */}
            <div className="flex-1 leading-normal pr-2">
                {message}
            </div>

            {/* TOMBOL SILANG UNTUK TUTUP MANUAL */}
            <button
                onClick={hideAlert}
                className="shrink-0 opacity-50 hover:opacity-100 p-0.5 rounded cursor-pointer transition-opacity"
            >
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
