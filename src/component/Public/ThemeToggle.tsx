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
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 rounded-md text-sm border border-gray-200 dark:border-zinc-700
                 bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 transition-colors"
        >
            {isDark ? '🌙 Mode Gelap' : '☀️ Mode Terang'}
        </button>
    );
}

export default ThemeToggle;
