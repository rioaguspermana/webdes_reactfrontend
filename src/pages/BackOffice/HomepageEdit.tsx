import CarouselComponent from "@/component/BackOffice/HomepageEdit/Carousel";
import CarouselManager from "@/component/BackOffice/HomepageEdit/CarouselManager";
import NewsComponent from "@/component/BackOffice/HomepageEdit/News";
import OrganizationStructureComponent from "@/component/BackOffice/HomepageEdit/OrganizationStructure";
import ResidentComponent from "@/component/BackOffice/HomepageEdit/Resident";
import ShortcutComponent from "@/component/BackOffice/HomepageEdit/Shortcut";
import VillageBudgetComponent from "@/component/BackOffice/HomepageEdit/VilageBudget";
import VillageMapComponent from "@/component/BackOffice/HomepageEdit/VillageMap";
import WelcomeSpeechComponent from "@/component/BackOffice/HomepageEdit/WelcomeSpeech";
import { useCarouselStore } from "@/store/useCarouselStore";
import { useHomepageStore } from "@/store/useHomepageSettingStore";
import { useEffect } from "react";

function HomepageEdit() {
    // Ambil state dan actions dari Zustand Store global
    const { fetchCarousels } = useCarouselStore();
    const { fetchHomepageSetting } = useHomepageStore();

    useEffect(() => {
        fetchCarousels();
        fetchHomepageSetting()
    }, []);

    return (
        <div className="grid grid-cols-1 gap-2">
            <div className="text-[70%] w-full border-2 border-dashed">
                <div className="relative rounded-xl lg:h-180">
                    <CarouselComponent />
                    <CarouselManager />
                </div>
                <div className="">
                    <ShortcutComponent />
                </div>
                <div className="">
                    <WelcomeSpeechComponent />
                </div>
                <div className="">
                    <VillageMapComponent />
                </div>
                <div className="">
                    <OrganizationStructureComponent />
                </div>
                <div className="">
                    <ResidentComponent />
                </div>
                <div className="">
                    <VillageBudgetComponent />
                </div>
                <div className="">
                    <NewsComponent />
                </div>
            </div>
        </div>
    )
}

export default HomepageEdit;