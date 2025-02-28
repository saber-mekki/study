import React  from "react";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import HeaderTwo from "./HeaderTwo";
import PageHeaderOne from "./PageHeaderOne";
import FooterOne from "./FooterOne";
import BackToTop from "./BackToTop";
import ForgetPassword from "./ForgetPassword";

export default function SectionThree () {
        return (
            <>
                <ForgetPassword />
                <SignUpModal />
                <SignInModal />
                <HeaderTwo />
                <PageHeaderOne title={this.props.title} />
                {this.props.children}
                <FooterOne />
                <BackToTop />
            </>
        );
}   