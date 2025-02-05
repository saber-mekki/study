import React, {Component} from "react";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import HeaderTwo from "./HeaderTwo";
import PageHeaderOne from "./PageHeaderOne";
import FooterOne from "./FooterOne";
import BackToTop from "./BackToTop";

class SectionThree extends Component {
    render() {
        return (
            <>
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
}

export default SectionThree;