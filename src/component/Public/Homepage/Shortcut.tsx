import { Link } from "react-router-dom";
import { cleanFileUrl } from "@/@utils/cleanFileUrl";
import { classMerge } from "@/@utils/classMerge";

const shortcut: HomeSection = {
    title: "Jelajahi Desa",
    post_content: "Melalui website ini Anda dapat menjelajahi segala hal yang terkait dengan Desa. Aspek pemerintahan, Penduduk, Demografi, Potensi Desa, dan juga berita tentang Desa.",
}

const largeScreenShortcuts = [
    { name: 'Profil Desa', href: 'profil-desa', icon: 'icon_profil_desa.png' },
    { name: 'Infografis', href: 'infografis', icon: 'icon_infografis.png' },
    null,
    null,
    { name: 'Peta', href: 'peta', icon: 'icon_peta.png' },
    { name: 'IDM', href: 'infografis/idm', icon: 'icon_idm.png' },
    { name: 'Berita', href: 'berita', icon: 'icon_berita.png' },
    { name: 'Informasi (PPID)', href: 'ppid', icon: 'icon_informasi.png' },
    null,
]

const smallScreenShortcuts = [
    { name: 'Profil Desa', href: 'profil-desa', icon: 'icon_profil_desa.png' },
    { name: 'Infografis', href: 'infografis', icon: 'icon_infografis.png' },
    { name: 'Peta', href: 'peta', icon: 'icon_peta.png' },
    { name: 'IDM', href: 'infografis/idm', icon: 'icon_idm.png' },
    { name: 'Berita', href: 'berita', icon: 'icon_berita.png' },
    { name: 'Informasi (PPID)', href: 'ppid', icon: 'icon_informasi.png' },
]

function ShortcutComponent() {

    return (
        <div className="w-full" >
            <div className="bg-white py-16 sm:py-48 dark:bg-green-700">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/** For large screen */}
                    <div className="hidden lg:grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                        <div className="mx-auto w-full max-w-xl lg:mx-0">
                            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-green-900 sm:text-5xl dark:text-white">
                                {shortcut.title}
                            </h2>
                            <p className="mt-6 text-xl/8 text-gray-600 dark:text-gray-300">
                                {shortcut.post_content}
                            </p>
                        </div>
                        <div className="mx-auto grid w-full max-w-xl grid-cols-3 items-center gap-y-2 sm:gap-y-2 gap-x-2 lg:mx-0 lg:max-w-none lg:pl-8">
                            {largeScreenShortcuts.map((shortcut, i) => (
                                <div key={i} className={classMerge(shortcut ? "link-neumorphism" : "", "h-30 text-center")}>
                                    {shortcut
                                        ? (
                                            <Link to={shortcut.href} className="grid h-full w-full">
                                                <div className="flex justify-center">
                                                    <img
                                                        src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, shortcut.icon)}
                                                        alt={shortcut.name}
                                                        width={105}
                                                        height={48} />
                                                </div>
                                                <div className="text-gray-500 dark:text-white font-semibold">{shortcut.name}</div>
                                            </Link>
                                        )
                                        : (<div></div>)}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/** For small screen */}
                    <div className="grid lg:hidden grid-cols-1 items-center gap-x-8 gap-y-8 lg:grid-cols-2">
                        <div className="mx-auto w-full max-w-xl lg:mx-0">
                            <h2 className="text-center text-xl font-semibold tracking-tight text-pretty text-green-900 dark:text-white">
                                {shortcut.title}
                            </h2>
                            <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
                                {shortcut.post_content}
                            </p>
                        </div>
                        <div className="mx-auto grid w-full max-w-xl grid-cols-3 items-center gap-y-8 sm:gap-y-8 gap-x-8 lg:mx-0 lg:max-w-none lg:pl-8">
                            {smallScreenShortcuts.map((shortcut, i) => (
                                <div key={i} className={`link-neumorphism h-24 flex justify-center text-center`}>
                                    <Link key={shortcut.name} to={shortcut.href} className="flex-row content-center justify-items-center">
                                        <div className="w-14">
                                            <img
                                                src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, shortcut.icon)}
                                                alt={shortcut.name}
                                                width={105}
                                                height={48} />
                                        </div>
                                        <div className="text-gray-500 dark:text-white text-xs">{shortcut.name}</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShortcutComponent;