import React, {Component} from "react";
import SectionThree from "./layouts/SectionThree";
import InstructorsCarousel from "./layouts/InstructorsCarousel";
import StudentTestimonial from "./layouts/StudentTestimonial";

class AboutThree extends Component {
    render() {
        return (
            <SectionThree title={'About Us'}>
                <section className="section-padding">
                    <div className="container">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-lg-6">
                                <h2 className="section-title mb-30">
                                    Online University <br /> System, Learn With <br /> Us Smart & Easily
                                </h2>
                                <p className="mb-4">
                                    Dispatched entreaties boisterous say why stimulated. Certain forbade
                                    pcture now prevent carried she get see sitting.
                                </p>
                                <ul className="list-unstyled">
                                    <li className="mb-2"><i className="fas fa-star mr-2 text-primary" />Uneasy barton
                                        seeing remark happen hi has.
                                    </li>
                                    <li className="mb-2"><i className="fas fa-star mr-2 text-primary" />Am possible
                                        offering contempt mr distance stronger an.
                                    </li>
                                    <li><i className="fas fa-star mr-2 text-primary" />Attachment excellence
                                        announcing or reasonable.
                                    </li>
                                </ul>
                                <div className="d-sm-flex">
                                    <div className="media align-items-center mt-35 mr-5">
                                        <img src={process.env.PUBLIC_URL + '/assets/images/icon-winner.png'} alt="" />
                                        <div className="ml-3">
                                            <h2 className="text-primary font-weight-bold jsCounter">374</h2>
                                            <p className="text-blue">Award Win</p>
                                        </div>
                                    </div>
                                    <div className="media align-items-center mt-35">
                                        <img src={process.env.PUBLIC_URL + '/assets/images/icon-tutor.png'} alt="" />
                                        <div className="ml-3">
                                            <h2 className="text-primary font-weight-bold jsCounter">623</h2>
                                            <p className="text-blue">Experts Tutor</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 mt-5 mt-lg-0 text-center">
                                <div className="img-line-box">
                                    <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/images/online-eu.jpg'} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gray overflow-hidden">
                    <div className="container">
                        <div className="no-gutters d-block d-lg-flex align-items-center justify-content-end">
                            <div className="col-lg-10 col-12 mb-5 mb-lg-0 text-center">
                                <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/images/admission-open.jpg'} alt="" />
                            </div>
                            <div className="col-lg-6">
                                <div className="pl-lg-5 pb-5 mb-5 mb-lg-0 pb-lg-0">
                                    <h2 className="section-title mb-30">Admission Open <br /> For 2023-2021</h2>
                                    <p className="mb-4">Dispatched entreaties boisterous say why stimulated. Certain
                                        forbade pcture now prevent carried shegetsee.</p>
                                    <p>Terminated principles sentiments of no pianoforte if projection impossible.
                                        Horses pulled nature favour number yet highly his has old. Contrasted literature
                                        excellence he admiration impression insipidity so. Scale ought who terms after
                                        own quick since. Servants margaret husbands to screened in throwing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Instructor Carousel imported from layouts */}
                <InstructorsCarousel />

                {/* Student Testimonial imported from layouts */}
                <StudentTestimonial />
            </SectionThree>
        );
    }
}

export default AboutThree;