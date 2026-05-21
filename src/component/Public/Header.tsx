import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { cleanFileUrl } from '@/@utils/cleanFileUrl'
import ThemeToggle from './ThemeToggle'
import { useProfileStore } from '@/store/useProfilDesa'
import FooterComponent from './Footer'


const data_desa = {
    nama: "Desa Sejahtera",
    kecamatan: "Kecamatan Bahagia",
    kabupaten: "Kabupaten Sentosa",
    provinsi: "Provinsi Harmoni",
}

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Profil Desa', href: '/profil-desa' },
    { name: 'Infografis', href: '/infografis' },
    { name: 'Peta', href: '/peta' },
    { name: 'Berita', href: '/berita' },
    { name: 'UMKM', href: '/umkm-desa' },
    { name: 'Informasi (PPID)', href: '/ppid' },
]

function HeaderComponent({ is_homepage }: { is_homepage?: boolean }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isOnTop, setIsOnTop] = useState(false);

    // Use Zustand Store
    const profilDesa = useProfileStore((state) => state.profilDesa);

    // Check Scroll
    useEffect(() => {
        const handleScroll = () => {
            // Toggle state when user scrolls past 50 pixels down
            if (window.scrollY > 20) {
                setIsOnTop(false);
            } else {
                setIsOnTop(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // run sekali supaya scrollY terbaca
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 w-full z-10 bg-green-600 dark:bg-green-900 ${isOnTop && is_homepage ? 'lg:bg-green-600/70 lg:dark:bg-green-900/70' : ''} `}>
            <nav aria-label="Global" className="mx-auto lg:text-lg/6 flex xxl:max-w-7xl items-center justify-between p-4 lg:px-12">
                <NavLink to={'/'} className="-m-1.5 p-1.5">
                    <div className='flex'>
                        <span className="sr-only">{profilDesa?.nama_desa}</span>
                        <img
                            alt=""
                            src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, profilDesa?.logo_desa ?? "")}
                            className="h-16 w-auto"
                        />
                        <div className='content-center px-4'>
                            <div className='text-white font-semibold'>{profilDesa?.nama_desa}</div>
                            <div className='text-white/90'>{profilDesa?.kabupaten_kota}</div>
                        </div>
                    </div>
                </NavLink>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-8" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-6 items-center">
                    {navigation.map((item) => (
                        <NavLink key={item.name} to={item.href} className={({ isActive }) => `${isActive ? "underline underline-offset-6 font-semibold dark:text-green-100" : "dark:text-slate-200"} text-white text-lg`}>
                            {item.name}
                        </NavLink>
                    ))}
                    <ThemeToggle />
                </div>
            </nav>
            {/** Mobile menu, show/hide based on menu open state. */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto sm:max-w-sm sm:ring-1 sm:ring-green-900/10 bg-white dark:sm:ring-green-100/10">
                    <div className='fixed top-0 left-0 right-0 p-4 bg-green-600 lg:bg-green-900/50 dark:bg-green-900'>
                        <div className="flex items-center justify-between">
                            <NavLink to={'/'} className="-m-1.5 p-1.5">
                                <div className='flex'>
                                    <span className="sr-only">{data_desa.nama}</span>
                                    <img
                                        alt=""
                                        src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, profilDesa?.logo_desa ?? "")}
                                        className="h-16 w-auto"
                                    />
                                    <div className='content-center px-4'>
                                        <div className='text-white font-semibold'>{data_desa.nama}</div>
                                        <div className='text-white'>{data_desa.kabupaten}</div>
                                    </div>
                                </div>
                            </NavLink>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-white"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-8" />
                            </button>
                        </div>
                    </div>
                    <div className="p-4 mt-24 bg-white dark:bg-green-800 h-[80%]">
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            className={({ isActive }) => ` ${isActive ? 'underline underline-offset-6 font-semibold' : ''} -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5`}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterComponent />
                </DialogPanel>
            </Dialog>
        </header >
    )
}

export default HeaderComponent;