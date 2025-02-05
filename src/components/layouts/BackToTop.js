import React, {Component} from "react";

class BackToTop extends Component {
    render() {
        return (
            <a href="#top" className="scroll-to-top">
                <span className="fas fa-chevron-up" />
            </a>
        );
    }
}

export default BackToTop;