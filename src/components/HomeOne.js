import React, {Component} from "react";
import SignUpModal from "./layouts/SignUpModal";
import SignInModal from "./layouts/SignInModal";
import HeaderOne from "./layouts/HeaderOne";
import BannerOne from "./layouts/BannerOne";
import WeOfferSection from "./layouts/WeOfferSection";
import VideoPopup from "./layouts/VideoPopup";
import HowItWorks from "./layouts/HowItWorks";
import TrialSection from "./layouts/TrialSection";
import FindTutorSection from "./layouts/FindTutorSection";
import RecentTutorSection from "./layouts/RecentTutorSection";
import HowItWorksTutors from "./layouts/HowItWorksTutors";
import TutorsCarouselOne from "./layouts/TutorsCarouselOne";
import MobileAppSection from "./layouts/MobileAppSection";
import FooterOne from "./layouts/FooterOne";
import BackToTop from "./layouts/BackToTop";

class HomeOne extends Component {
    render() {
        return (
            <>
                <SignUpModal />
                <SignInModal />
                <HeaderOne />
                <BannerOne />
                <WeOfferSection />
                <VideoPopup />
                <HowItWorks />
                <TrialSection />
                <FindTutorSection />
                <RecentTutorSection />
                <HowItWorksTutors />
                <TutorsCarouselOne />
                <MobileAppSection />
                <FooterOne />
                <BackToTop />
            </>
        );
    }
}

export default HomeOne;