import { Carousel, createTheme } from "flowbite-react";
import { CustomFlowbiteTheme } from "flowbite-react/types";
import { cleanFileUrl } from "@/@utils/cleanFileUrl";
import { useCarouselStore } from "@/store/useCarouselStore";
import { useEffect, useState } from "react";
import { useUiStore } from "@/store/useHomepageEditStore";

function CarouselComponent() {
    // Ambil state dan actions dari Zustand Store global
    const { carousels } = useCarouselStore();
    const [, setCurrentIndex] = useState<number>(0);
    const { openManager } = useUiStore();

    const activeCarousels = carousels
        .filter(item => item.is_active)
        .sort((a, b) => a.urutan - b.urutan);

    // Reset index jika jumlah list carousel berubah (misal setelah dihapus/ditambah)
    useEffect(() => {
        setCurrentIndex(0);
    }, [activeCarousels.length]);


    // Buat objek tema kustom untuk memaksa posisi relative pada item slide
    const bannerTheme: CustomFlowbiteTheme = createTheme({
        carousel: {
            scrollContainer: { base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth" },
            item: { base: "relative block shrink-0" },
            root: { base: "relative h-full w-full overflow-hidden" },
            control: { base: "dark:bg-white/20", icon: "dark:text-white" },
            indicators: {
                active: { on: "dark:bg-white/65", off: "dark:bg-white/25" }
            }
        }
    });

    return (
        <div className="lg:p-0 h-64 lg:h-full w-full dark:bg-green-700 lg:mt-0">
            <button
                onClick={openManager}
                title="Kelola Slide Banner"
                className="absolute top-4 right-4 z-20 bg-green-300/60 border border-green-500 hover:bg-green-600 text-green-100 size-9 rounded-md flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-xs select-none hover:scale-105"
            >
                {/* Icon Pensil SVG */}
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </button>
            <Carousel slideInterval={5000} theme={bannerTheme.carousel}>
                {activeCarousels.map((carousel, i) => (
                    <div key={i} className="h-full w-full">
                        <img src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, carousel.image)} alt={carousel.alt} className="-z-20 h-full w-full object-cover" />
                        <div className="absolute top-0 h-full w-full bg-black/35">
                            <div className="relative flex-col h-full mx-14 lg:mx-20 content-center">
                                <div className="text-white whitespace-pre-wrap text-base lg:text-5xl font-semibold text-shadow-black">
                                    {carousel.title}
                                </div>
                                <div className="text-white whitespace-pre-wrap text-xs lg:text-xl font-semibold text-shadow-black pt-4">
                                    {carousel.sub_title}
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