import React from "react";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import HeaderOne from "./HeaderOne";
import PageHeaderOne from "./PageHeaderOne";
import FooterOne from "./FooterOne";
import BackToTop from "./BackToTop";

function SectionOne (props) {
    
        return (
            <>
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