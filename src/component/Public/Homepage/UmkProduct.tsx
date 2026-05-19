import { cleanFileUrl } from "@/@utils/cleanFileUrl";
import { ArrowRightIcon } from "flowbite-react";
import { Link } from "react-router-dom";

const umkProduct: HomeSection = {
    title: "Produk UMK Desa",
    subtitle: "Layanan promosi produk UMKM Desa sehingga mampu meningkatkan perekonomian masyarakat Desa."
}

const products = [
    {
        id: 1,
        name: 'Caping Bambu',
        href: '#',
        price: 'Rp 25.000',
        description: 'Topi tradisional berbentuk kerucut yang terbuat dari anyaman bambu, untuk melindungi kepala dari terik matahari, tersedia untuk ukuran anak-anak.',
        options: '2 Ukuran (Dewasa & Anak)',
        imageUrl: 'product_1.png',
    },
    {
        id: 2,
        name: 'Besek Bambu',
        href: '#',
        price: 'Rp 3.500',
        description: 'Wadah tradisional yang terbuat dari anyaman bambu, berbentuk kotak, digunakan untuk tempat makanan, buah, atau bingkisan karena sifatnya ringan, ramah lingkungan.',
        options: '15cm x 15cm',
        imageUrl: 'product_2.png',
    },
    {
        id: 3,
        name: 'Kerupuk Ikan',
        href: '#',
        price: 'Rp 25.000',
        description: "Kerupuk Ikan Bungkus Kecil, Dijemur lebih dahulu sebelum digoreng",
        options: '250 Gram',
        imageUrl: 'product_3.png',
    },
    {
        id: 4,
        name: 'Keripik Singkong',
        href: '#',
        price: 'Rp 15.000',
        description: 'Keripik Singkong 250 gram, tersedia 3 varian rasa Gurih, Manis dan Pedas',
        options: '3 Rasa',
        imageUrl: 'product_4.png',
    },
    {
        id: 5,
        name: 'Dodol Kelapa',
        href: '#',
        price: 'Rp 40.000',
        description: 'Dodol kelapa yang lembut dan manis.',
        options: '500 Gram',
        imageUrl: 'product_5.png',
    },
    {
        id: 6,
        name: 'Tampah Bambu',
        href: '#',
        price: 'Rp 55.000',
        description: 'Tampah bambu, Nampan, Wadah serbaguna diameter 60cm',
        options: '60 cm',
        imageUrl: 'product_6.png',
    },
]

function UmkProductComponent() {
    const baseUrl = import.meta.env.VITE_APP_URL;

    return (
        <div className="w-full">
            <div className="bg-white py-16 sm:py-16 dark:bg-green-700">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-xl lg:text-4xl font-semibold tracking-tight text-pretty text-green-900 sm:text-5xl dark:text-white">
                            {umkProduct.title}
                        </h2>
                        <div className="my-2 text-gray-600 dark:text-gray-300">
                            <div className="text-base lg:text-xl">{umkProduct.subtitle}</div>
                        </div>
                    </div>
                    <div className="">
                        <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                            <h2 className="sr-only">Produk</h2>
                            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-green-400"
                                    >
                                        <img
                                            alt={product.name}
                                            src={cleanFileUrl(baseUrl + '/image/', product.imageUrl)}
                                            className="aspect-3/4 w-full bg-gray-200 object-cover group-hover:opacity-75 sm:aspect-auto sm:h-96"
                                        />
                                        <div className="flex flex-1 flex-col space-y-2 p-4">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                <a href={product.href}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.name}
                                                </a>
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-slate-100">{product.description}</p>
                                            <div className="flex flex-1 flex-col justify-end">
                                                <p className="text-sm text-gray-500 dark:text-white italic">{product.options}</p>
                                                <p className="text-base font-medium text-gray-900 dark:text-white">{product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-14 flex items-center justify-center gap-x-6 lg:justify-end">
                        <Link to="/umkm" className="font-semibold text-blue-700 dark:text-blue-200 hover:underline">
                            <div className="flex items-center space-x-2">
                                <div>Lihat Produk UMKM Lainnya{' '}</div>
                                <ArrowRightIcon className="size-5" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UmkProductComponent;