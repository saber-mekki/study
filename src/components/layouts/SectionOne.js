import React from "react";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import HeaderOne from "./HeaderOne";
import PageHeaderOne from "./PageHeaderOne";
import FooterOne from "./FooterOne";
import BackToTop from "./BackToTop";
import ForgetPassword from "./ForgetPassword";

function SectionOne(props) {

    return (
        <>
            <ForgetPassword />
            <SignUpModal />
            <SignInModal />
            <HeaderOne />
            <PageHeaderOne title={props.title} />
            {props.children}
            <FooterOne />
            <BackToTop />
        </>
    );
}


export default SectionOne;