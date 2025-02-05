import React, {Component} from "react";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import HeaderOne from "./HeaderOne";
import PageHeaderOne from "./PageHeaderOne";
import FooterOne from "./FooterOne";
import BackToTop from "./BackToTop";

class SectionOne extends Component {
    render() {
        return (
            <>
                <SignUpModal />
                <SignInModal />
                <HeaderOne />
                <PageHeaderOne title={this.props.title} />
                {this.props.children}
                <FooterOne />
                <BackToTop />
            </>
        );
    }
}

export default SectionOne;