import React, {Component} from "react";
import SignUpModal from "./layouts/SignUpModal";
import SignInModal from "./layouts/SignInModal";
import HeaderTwo from "./layouts/HeaderTwo";
import BannerTwo from "./layouts/BannerTwo";
import CounterSection from "./layouts/CounterSection";
import CourseSection from "./layouts/CourseSection";
import WhyOnlineCourse from "./layouts/WhyOnlineCourse";
import TopCategories from "./layouts/TopCategories";
import TutorsCarouselTwo from "./layouts/TutorsCarouselTwo";
import CertificateSection from "./layouts/CertificateSection";
import BlogSection from "./layouts/BlogSection";
import FooterOne from "./layouts/FooterOne";
import BackToTop from "./layouts/BackToTop";

class HomeTwo extends Component {
    render() {
        return (
            <>
                <SignUpModal />
                <SignInModal />
                <HeaderTwo />
                <BannerTwo />
                <CounterSection />
                <CourseSection />
                <WhyOnlineCourse />
                <TopCategories />
                <TutorsCarouselTwo />
                <CertificateSection />
                <BlogSection />
                <FooterOne />
                <BackToTop />
            </>
        );
    }
}

export default HomeTwo;