import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { cleanFileUrl } from "../../../@utils/cleanFileUrl";

interface Sotk {
    name: string;
    role: string;
    image: string;
}

const organizationStructure: HomeSection = {
    title: "SOTK",
    subtitle: "Struktur Organisasi dan Tata Kerja Desa Sejahtera"
}

const people: Sotk[] = [
    { name: 'Haryanto SE', role: 'Kepala Desa', image: 'sotk_1.png' },
    { name: 'Budi Santoso', role: 'Sekertaris Desa', image: 'sotk_2.png' },
    { name: 'Yusnikarani', role: 'Kepala Seksi Kesejahteraan', image: 'sotk_3.png' },
    { name: 'Dewi Kartika', role: 'Kepala Seksi Pemerintahan', image: 'sotk_4.png' },
    { name: 'Rudi Hartono', role: 'Kepala Urusan Umum & Perencanaan', image: 'sotk_5.png' },
    { name: 'Lina Marlina', role: 'Kepala Urusan Keuangan', image: 'sotk_6.png' },
    { name: 'Fitri Ayu', role: 'Staf Kesejahteraan', image: 'sotk_7.png' },
    { name: 'Lisa Eka Putri', role: 'Staf Pemerintahan', image: 'sotk_8.png' },
    { name: 'Maya Sari', role: 'Staf Pemerintahan', image: 'sotk_9.png' },
    { name: 'Hasan Basri', role: 'Staff Umum', image: 'sotk_10.png' },
    { name: 'Irwan Munandar', role: 'Kepala Dusun Selatan', image: 'sotk_11.png' },
    { name: 'Siswanto', role: 'Kepala Dusun Utara', image: 'sotk_12.png' },
]

function OrganizationStructureComponent(): React.JSX.Element {
    return (
        <div className="w-full">
            <div className="bg-white py-16 sm:py-48 dark:bg-green-700">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="w-full lg:flex-auto text-center lg:text-left">
                        <h2 className="text-xl lg:text-4xl font-semibold tracking-tight text-pretty text-green-900 sm:text-5xl dark:text-white">
                            {organizationStructure.title}
                        </h2>
                        <div className="my-2 text-gray-600 dark:text-gray-300">
                            <div className="text-base lg:text-xl">{organizationStructure.subtitle}</div>
                        </div>
                    </div>
                    {/** Large Screen */}
                    <div className="hidden lg:block">
                        <ul
                            role="list"
                            className="mx-auto mt-20 max-w-2xl grid grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                        >
                            {people.map((person, i) => (
                                <li key={i}>
                                    <img
                                        alt={person.role}
                                        src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, person.image)}
                                        className={`${i === 0 ? 'border-2 border-blue-100 dark:border-green-800 outline-4 outline-blue-600 dark:outline-green-300' : 'outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10'} mx-auto size-24 rounded-full`}
                                    />
                                    <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {person.name}
                                    </h3>
                                    <p className="text-sm/6 text-gray-600 dark:text-gray-400">{person.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/** Small Screen */}
                    <div className="block lg:hidden">
                        <ul
                            role="list"
                            className="mx-auto mt-20 max-w-2xl grid grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                        >
                            {people.slice(0, 4).map((person, i) => (
                                <li key={i}>
                                    <img
                                        alt={person.role}
                                        src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, person.image)}
                                        className={`${i === 0 ? 'border-2 border-blue-100 dark:border-green-800 outline-4 outline-blue-600 dark:outline-green-300' : 'outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10'} mx-auto size-24 rounded-full`}
                                    />
                                    <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {person.name}
                                    </h3>
                                    <p className="text-sm/6 text-gray-600 dark:text-gray-400">{person.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-10 lg:mt-14 flex items-center justify-center gap-x-6 lg:justify-end">
                        <Link to="/sotk" className="font-semibold text-blue-700 dark:text-blue-200 hover:underline">
                            <div className="flex items-center space-x-2">
                                <div>Lihat Struktur Lebih lengkap{' '}</div>
                                <ArrowRightIcon className="size-5" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizationStructureComponent;