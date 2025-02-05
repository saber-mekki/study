import React, {Component} from "react";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import HeaderTwo from "./HeaderTwo";
import PageHeaderTwo from "./PageHeaderTwo";
import FooterOne from "./FooterOne";
import BackToTop from "./BackToTop";

class SectionTwo extends Component {
    render() {
        return (
            <>
                <SignUpModal />
                <SignInModal />
                <HeaderTwo />
                <PageHeaderTwo title={this.props.title} />
                {this.props.children}
                <FooterOne />
                <BackToTop />
            </>
        );
    }
}

export default SectionTwo;