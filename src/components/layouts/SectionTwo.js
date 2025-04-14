import React, {Component} from "react";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
    /* import HeaderTwo from "./HeaderTwo";
 */
/* import PageHeaderTwo from "./PageHeaderTwo";
 */import FooterOne from "./FooterOne";
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
                <HeaderOne />
{/*                 <PageHeaderTwo title={this.props.title} />
 */}                {this.props.children}
                <FooterOne />
                <BackToTop />
            </>
        );
    }
}

export default SectionTwo;