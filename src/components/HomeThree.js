import React, {Component} from "react";
import SignUpModal from "./layouts/SignUpModal";
import SignInModal from "./layouts/SignInModal";
import HeaderThree from "./layouts/HeaderThree";
import BannerThree from "./layouts/BannerThree";
import CourseCarousel from "./layouts/CourseCarousel";
import CoursesJoin from "./layouts/CoursesJoin";
import VideoSection from "./layouts/VideoSection";
import GallerySection from "./layouts/GallerySection";
import StudentTestimonial from "./layouts/StudentTestimonial";
import InstructorsCarousel from "./layouts/InstructorsCarousel";
import BlogSection from "./layouts/BlogSection";
import FooterTwo from "./layouts/FooterTwo";
import BackToTop from "./layouts/BackToTop";

class HomeThree extends Component {
    render() {
        return (
            <>
                <SignUpModal />
                <SignInModal />
                <HeaderThree />
                <BannerThree />
                <CourseCarousel />
                <CoursesJoin />
                <VideoSection />
                <GallerySection />
                <StudentTestimonial />
                <InstructorsCarousel />
                <BlogSection />
                <FooterTwo />
                <BackToTop />
            </>
        );
    }
}

export default HomeThree;