// Components
import CarouselComponent from "@/component/Public/Homepage/Carousel";
import HeaderComponent from "@/component/Public/Header";
import ShortcutComponent from "@/component/Public/Homepage/Shortcut";
import WelcomeSpeechComponent from "@/component/Public/Homepage/WelcomeSpeech";
import VillageMapComponent from "@/component/Public/Homepage/VillageMap";
import OrganizationStructureComponent from "@/component/Public/Homepage/OrganizationStructure";
import ResidentComponent from "@/component/Public/Homepage/Resident";
import VillageBudgetComponent from "@/component/Public/Homepage/VilageBudget";
import NewsComponent from "@/component/Public/Homepage/News";
import PotentialComponent from "@/component/Public/Homepage/Potential";
import TourismComponent from "@/component/Public/Homepage/Tourism";
import UmkProductComponent from "@/component/Public/Homepage/UmkProduct";
import GaleryComponent from "@/component/Public/Homepage/Galery";
import FooterComponent from "@/component/Public/Footer";

function Homepage() {
    return (
        <div>
            <HeaderComponent is_homepage={true} />
            <CarouselComponent />
            <ShortcutComponent />
            <WelcomeSpeechComponent />
            <VillageMapComponent />
            <OrganizationStructureComponent />
            <ResidentComponent />
            <VillageBudgetComponent />
            <NewsComponent />
            <PotentialComponent />
            <TourismComponent />
            <UmkProductComponent />
            <GaleryComponent />
            <FooterComponent />
        </div>
    )
}

export default Homepage;