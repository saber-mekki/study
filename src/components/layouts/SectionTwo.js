import React, { Component } from "react";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
/* import HeaderTwo from "./HeaderTwo";
*/
import PageHeaderTwo from "./PageHeaderTwo";
import FooterOne from "./FooterOne";
import BackToTop from "./BackToTop";
import ForgetPassword from "./ForgetPassword";
import HeaderOne from "./HeaderOne";

class SectionTwo extends Component {
    render() {
        return (
            <>
                <ForgetPassword />
                <SignUpModal />
                <SignInModal />
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999 }}>
                    <HeaderOne />
                </div>
                <div style={{ paddingTop: "80px" }}></div>
                <PageHeaderTwo title={this.props.title} />
                {this.props.children}
                <FooterOne />
                <BackToTop />
            </>
        );
    }
}

export default SectionTwo;