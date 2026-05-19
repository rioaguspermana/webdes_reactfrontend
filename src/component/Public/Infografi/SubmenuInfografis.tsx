import React from 'react';
import { NavLink } from 'react-router-dom';

interface SubmenuItem {
    name: string;
    href: string;
    icon: React.ReactNode;
}

function SubmenuInfografisComponent() {
    const menuItems: SubmenuItem[] = [
        {
            name: 'Penduduk',
            href: '/infografis/penduduk',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
            ),
        },
        {
            name: 'APBDes',
            href: '/infografis/apbdes',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    {/* 💵 Ikon Uang Kertas Murni / Banknote */}
                    <rect x="2" y="5" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9h.01M18 9h.01M6 15h.01M18 15h.01" />
                </svg>
            ),
        },
        {
            name: 'Stunting',
            href: '/infografis/stunting',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
            ),
        },
        {
            name: 'Bansos',
            href: '/infografis/bansos',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
            ),
        },
        {
            name: 'IDM',
            href: '/infografis/idm',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    {/* 👑 Ikon Mahkota (Crown) Simetris */}
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2 4l3 12h14l3-12-5 4-5-6-5 6-5-4zM5 16l2 4h10l2-4H5z"
                    />
                </svg>
            ),
        },
        {
            name: 'SDGs',
            href: '/infografis/sdgs',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    {/* 🎯 Ikon Target / Roda Capaian Indikator SDGs Desa */}
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M2 12h2m16 0h2" />
                </svg>
            ),
        },
    ];

    return (
        <div className="w-full bg-white border-b border-gray-100 px-4 py-4 dark:bg-green-800 dark:border-gray-700 transition-colors">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                {/* Kiri: Judul Menu Infografis */}
                <div className="shrink-0">
                    <h2 className="text-xl font-semibold uppercase tracking-tight text-green-700 dark:text-green-400">
                        Infografis Desa Sejahtera
                    </h2>
                    <p className="text-[11px] font-medium text-gray-400 dark:text-gray-300 uppercase tracking-wider mt-0.5">
                        Transparansi Data Statistik Wilayah
                    </p>
                </div>

                {/* Kanan: Jajaran Tombol Submenu yang Responsif */}
                {/* Menggunakan overflow-x-auto agar di HP layar kecil menu bisa digeser menyamping tanpa berantakan */}
                <nav className="grid grid-cols-3 md:flex md:items-center gap-2 w-full md:w-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            end
                            className={({ isActive }) => `
        flex flex-col sm:flex-row items-center justify-center text-center gap-1 px-2 py-2.5 text-[11px] font-semibold rounded-xl border transition-all duration-200
        ${isActive
                                    ? 'bg-green-50 text-green-800 border-green-200/60 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900/60 shadow-sm'
                                    : 'bg-gray-50 text-gray-500 border-gray-100 dark:bg-gray-700/40 dark:text-gray-400 dark:border-transparent'
                                }
      `}
                        >
                            <span className="shrink-0">{item.icon}</span>
                            <span className="truncate">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

            </div>
        </div>
    );
}

export default SubmenuInfografisComponent;