import React, {Component} from "react";
import SectionTwo from "./layouts/SectionTwo";
import CourseSection from "./layouts/CourseSection";

class Courses extends Component {
    render() {
        return (
            <SectionTwo title={'Courses'}>
                {/* Courses Section imported from layouts */}
                <CourseSection />

                {/*<nav className="mt-70">*/}
                {/*    <ul className="pagination justify-content-center font-weight-600">*/}
                {/*        <li className="page-item"><Link to={'/'} className="page-link"><i className="fas fa-chevron-left" /></Link></li>*/}
                {/*        <li className="page-item"><Link to={'/'} className="page-link">01</Link></li>*/}
                {/*        <li className="page-item active"><Link to={'/'} className="page-link">02</Link></li>*/}
                {/*        <li className="page-item"><Link className="page-link">03</Link></li>*/}
                {/*        <li className="page-item"><Link to={'/'} className="page-link"><i className="fas fa-chevron-right" /></Link></li>*/}
                {/*    </ul>*/}
                {/*</nav>*/}
            </SectionTwo>
        );
    }
}

export default Courses;