import React, { Component } from "react";
import SignUpModal from "./layouts/SignUpModal";
import ForgetPassword from "./layouts/ForgetPassword";
import SignInModal from "./layouts/SignInModal";
import HeaderOne from "./layouts/HeaderOne";
import BannerOne from "./layouts/BannerOne";
import BannerAdmin from "./layouts/BannerAdmin";
import BannerDefault from "./layouts/BannerDefault";



import WeOfferSection from "./layouts/WeOfferSection";
import VideoPopup from "./layouts/VideoPopup";
import HowItWorks from "./layouts/HowItWorks";
import TrialSection from "./layouts/TrialSection";
import FindTutorSection from "./layouts/FindTutorSection";
import RecentTutorSection from "./layouts/RecentTutorSection";
import HowItWorksTutors from "./layouts/HowItWorksTutors";
import MobileAppSection from "./layouts/MobileAppSection";
import FooterOne from "./layouts/FooterOne";
import BackToTop from "./layouts/BackToTop";
import SignUpTutor from "./layouts/SignUpTutor";
import { isAdmin, isStudent, isTutor } from "../helper";
import BannerTutor from "./BannerTutor";


class HomeOne extends Component {
    render() {

        return (
            <>
                <SignUpTutor />
                <ForgetPassword />
                <SignUpModal />
                <SignInModal />
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999 }}>
                    <HeaderOne />
                </div>

                <div style={{ paddingTop: `80px` }}>
                    {isAdmin() ? (
                        <BannerAdmin />
                    ) : isStudent() ? (
                        <BannerOne />
                    ) : isTutor() ? (
                        <BannerTutor />
                    ) : (
                        <BannerDefault />
                    )}






                    <WeOfferSection />
                    <VideoPopup />
                    <HowItWorks />
                    <TrialSection />
                    <FindTutorSection />
                    <RecentTutorSection />
                    <HowItWorksTutors />
                    {/*                 <TutorsCarouselOne />
 */}                <MobileAppSection />
                    <FooterOne />
                    <BackToTop />
                </div>
            </>
        );
    }
}

export default HomeOne;