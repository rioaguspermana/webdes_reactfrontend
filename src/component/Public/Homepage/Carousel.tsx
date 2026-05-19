import { Carousel, createTheme } from "flowbite-react";
import { CustomFlowbiteTheme } from "flowbite-react/types";
import { cleanFileUrl } from "../../../@utils/cleanFileUrl";


const carousels = [
    { image: "slide_1.jpg", alt: "Slide 1", title: "Selamat Datang\nWebsite Resmi Desa Sejahtera 1", subtitle: "Sumber informasi terbaru di pemerintanan di Desa Sejahtera" },
    { image: "slide_2.jpg", alt: "Slide 2", title: "Dirgahayu Republik Indonesia", subtitle: "Bersatu Berdaulat, Rakyat Sejahtera, Indonesia Maju" },
    { image: "slide_3.jpg", alt: "Slide 3", title: "Selamat Hari Raya Idul Fitri", subtitle: "1447 H / 2026 M" },
    { image: "slide_1.jpg", alt: "Slide 4", title: "Selamat Datang\nWebsite Resmi Desa Sejahtera 4", subtitle: "Sumber informasi terbaru di pemerintanan di Desa Sejahtera" },
    { image: "slide_1.jpg", alt: "Slide 5", title: "Selamat Datang\nWebsite Resmi Desa Sejahtera 5", subtitle: "Sumber informasi terbaru di pemerintanan di Desa Sejahtera" }
]

function CarouselComponent() {
    // Buat objek tema kustom untuk memaksa posisi relative pada item slide
    const bannerTheme: CustomFlowbiteTheme = createTheme({
        carousel: {
            scrollContainer: { base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth lg:rounded-none" },
            item: { base: "relative block shrink-0" },
            root: { base: "relative h-full w-full overflow-hidden" },
            control: { base: "dark:bg-white/20", icon: "dark:text-white" },
            indicators: {
                active: { on: "dark:bg-white/65", off: "dark:bg-white/25" }
            }
        }
    });

    return (
        <div className="p-2 lg:p-0 h-64 lg:h-screen w-full dark:bg-green-700 mt-24 lg:mt-0">
            <Carousel slideInterval={5000} theme={bannerTheme.carousel}>
                {carousels.map((carousel, i) => (
                    <div key={i} className="h-full w-full">
                        <img src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, carousel.image)} alt={carousel.alt} className="-z-20 h-full w-full object-cover" />
                        <div className="absolute top-0 h-full w-full bg-black/35">
                            <div className="relative flex-col h-full mx-14 lg:mx-20 content-center">
                                <div className="text-white whitespace-pre-wrap lg:text-5xl font-semibold text-shadow-black">
                                    {carousel.title}
                                </div>
                                <div className="text-white whitespace-pre-wrap text-xs lg:text-xl font-semibold text-shadow-black pt-4">
                                    {carousel.subtitle}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default CarouselComponent;