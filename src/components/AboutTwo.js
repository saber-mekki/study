import React, {Component} from "react";
import SectionTwo from "./layouts/SectionTwo";
import {Link} from "react-router-dom";
import TutorsCarouselTwo from "./layouts/TutorsCarouselTwo";

class AboutTwo extends Component {
    render() {
        return (
            <SectionTwo title={'About Us'}>
                <section className="section-padding">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 text-center">
                                <img
                                    className="img-fluid rounded pr-lg-3"
                                    src={process.env.PUBLIC_URL + '/assets/images/tms.png'}
                                    alt="" />
                            </div>
                            <div className="col-lg-6 mt-5 mt-lg-0">
                                <h2 className="section-title mb-30">
                                    About Our <br />Tutor Management <br />System Online
                                </h2>
                                <p className="mb-4">Dispatched entreaties boisterous say why stimulated. Certain forbade
                                    pcture now prevent carried she get see sitting.</p>
                                <ul className="list-unstyled">
                                    <li className="mb-2"><i className="fas fa-star mr-2 text-primary" />
                                        Uneasy barton seeing remark happen hi has.
                                    </li>
                                    <li className="mb-2"><i className="fas fa-star mr-2 text-primary" />Am possible
                                        offering contempt mr distance stronger an.
                                    </li>
                                    <li><i className="fas fa-star mr-2 text-primary" />Attachment excellence
                                        announcing or reasonable.
                                    </li>
                                </ul>
                                <div className="media has-outline-primary align-items-center mt-35">
                                    <img
                                        className="rounded-circle"
                                        src={process.env.PUBLIC_URL + '/assets/images/user-07.jpg'}
                                        alt="" />
                                    <div className="ml-3">
                                        <h5 className="text-blue font-weight-600 mb-1">Pianoforall</h5>
                                        <p>Released: 2/5/2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="overflow-hidden">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="pt-60 pb-30 counter-section text-white text-center">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 col-sm-6 mb-30">
                                            <h2 className="h1 font-weight-600 mb-2 text-primary jsCounter">9456</h2>
                                            <p className="h5 font-weight-600">Active People</p>
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-6 mb-30">
                                            <h2 className="h1 font-weight-600 mb-2 text-primary jsCounter">154</h2>
                                            <p className="h5 font-weight-600">Award Winning</p>
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-6 mb-30">
                                            <h2 className="h1 font-weight-600 mb-2 text-primary jsCounter">2563</h2>
                                            <p className="h5 font-weight-600">Active Coach</p>
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-6 mb-30">
                                            <h2 className="h1 font-weight-600 mb-2 text-primary jsCounter">2817</h2>
                                            <p className="h5 font-weight-600">Certify People</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-padding">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <h2 className="section-title">Get Your Quality Skills Certificate Through Online
                                    Exam</h2>
                                <p className="mt-3 mb-40">Dispatched entreaties boisterous say why stimulated. Certain
                                    forbade picture now prevent carried she get see sitting. Up twenty limits as months.
                                    Inhabit so perhaps of in to certain.</p>
                                <Link to={'/about-one'} className="btn btn-outline-primary initiate-scripts">Get start now</Link>
                            </div>
                            <div className="col-lg-6">
                                <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/images/certificate.png'} alt="" />
                            </div>
                        </div>
                    </div>
                </section>

                <TutorsCarouselTwo />

                <section className="section-padding">
                    <div className="container">
                        <div className="row align-items-center mb-50">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-title mb-0">Our Management Team</h2>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-4 col-sm-6">
                                <div className="card text-center border-0 mt-30">
                                    <div className="hover-grayscale">
                                        <img
                                            src={process.env.PUBLIC_URL + '/assets/images/instructors/01.jpg'}
                                            alt=""
                                            className="card-img-top" />
                                    </div>
                                    <div className="card-body px-0 pb-0">
                                        <h4 className="font-weight-600 text-blue mb-1">Jack Benzion</h4>
                                        <p>Pittsburgh, USA</p>
                                        <ul className="social-icons list-unstyled mt-3">
                                            <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-facebook-f" /></Link></li>
                                            <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-twitter" /></Link></li>
                                            <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-instagram" /></Link></li>
                                            <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-skype" /></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="card text-center border-0 mt-30">
                                    <div className="hover-grayscale">
                                        <img
                                            src={process.env.PUBLIC_URL + '/assets/images/instructors/02.jpg'}
                                            alt=""
                                            className="card-img-top" />
                                    </div>
                                    <div className="card-body px-0 pb-0">
                                        <h4 className="font-weight-600 text-blue mb-1">Jesmin Walkaer</h4>
                                        <p>Pittsburgh, USA</p>
                                        <ul className="social-icons list-unstyled mt-3">
                                            <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-facebook-f" /></Link></li>
                                            <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-twitter" /></Link></li>
                                            <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-instagram" /></Link></li>
                                            <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-skype" /></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="card text-center border-0 mt-30">
                                    <div className="hover-grayscale">
                                        <img
                                            src={process.env.PUBLIC_URL + '/assets/images/instructors/03.jpg'}
                                            alt=""
                                            className="card-img-top" />
                                    </div>
                                    <div className="card-body px-0 pb-0">
                                        <h4 className="font-weight-600 text-blue mb-1">James Benzion</h4>
                                        <p>Pittsburgh, USA</p>
                                        <ul className="social-icons list-unstyled mt-3">
                                            <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-facebook-f" /></Link></li>
                                            <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-twitter" /></Link></li>
                                            <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-instagram" /></Link></li>
                                            <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-skype" /></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionTwo>
        );
    }
}

export default AboutTwo;