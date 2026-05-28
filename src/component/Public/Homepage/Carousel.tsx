import { Carousel, createTheme } from "flowbite-react";
import { CustomFlowbiteTheme } from "flowbite-react/types";
import { cleanFileUrl } from "@/@utils/cleanFileUrl";
import { useCarouselStore } from "@/store/useCarouselStore";
import { useEffect, useState } from "react";

function CarouselComponent() {
    // Ambil state dan actions dari Zustand Store global
    const { carousels } = useCarouselStore();
    const [, setCurrentIndex] = useState<number>(0);

    const activeCarousels = carousels
        .filter(item => item.is_active === true)
        .sort((a, b) => a.urutan - b.urutan);

    // Reset index jika jumlah list carousel berubah (misal setelah dihapus/ditambah)
    useEffect(() => {
        setCurrentIndex(0);
    }, [activeCarousels.length]);

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
                {activeCarousels.map((carousel, i) => (
                    <div key={i} className="h-full w-full">
                        <img src={cleanFileUrl(`${import.meta.env.VITE_APP_URL}/image/`, carousel.image)} alt={carousel.alt} className="-z-20 h-full w-full object-cover" />
                        <div className="absolute top-0 h-full w-full bg-black/35">
                            <div className="relative flex-col h-full mx-14 lg:mx-20 content-center">
                                <div className="text-white whitespace-pre-wrap lg:text-5xl font-semibold text-shadow-black">
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