import { useEffect, useState } from 'react';

function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        // Cek localStorage atau default ke false (light mode)
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-gray-500 rounded-lg bg-green-100 dark:bg-green-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Toggle dark mode"
        >
            {isDark ? (
                /* ☀️ Ikon Matahari untuk pindah ke Light Mode */
                <svg className="w-5 h-5 fill-amber-400" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 2.293a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.121 4.243a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-2 4.293a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zm-4 2.121a1 1 0 01-1 1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-4.293-2.121a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm2.293-4.293a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 5a5 5 0 100 10 5 5 0 000-10z" clipRule="evenodd" />
                </svg>
            ) : (
                /* 🌙 Ikon Bulan untuk pindah ke Dark Mode */
                <svg className="w-5 h-5 fill-slate-600" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            )}
        </button>
    );
}

export default ThemeToggle;
