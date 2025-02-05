import React, {Component} from "react";
import {Link} from "react-router-dom";

class InstructorsCarousel extends Component {
    render() {
        return (
            <section className="section-padding">
                <div className="container">
                    <div className="row align-items-center mb-50">
                        <div className="col-lg-9 text-center text-lg-left">
                            <h2 className="section-title mb-0">Our Skilled Instructors</h2>
                        </div>
                        <div className="col-lg-3 mt-4 mt-lg-0 text-center text-lg-right">
                            <div className="nav-arrows">
                                <span className="fas fa-chevron-left instructors-left" />
                                <span className="fas fa-chevron-right instructors-right" />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="owl-carousel instructors-carousel">
                                <div className="card instructors-item border-0">
                                    <div className="position-relative">
                                        <img
                                            src={process.env.PUBLIC_URL + '/assets/images/instructors/01.jpg'}
                                            alt=""
                                            className="card-img-top" />
                                        <div className="instructor-social text-center">
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-facebook-f" /></Link>
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-twitter" /></Link>
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-instagram" /></Link>
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-linkedin-in" /></Link>
                                        </div>
                                    </div>
                                    <div className="card-body px-0 pb-0">
                                        <h4 className="font-weight-600 text-blue mb-1">Jack Benzion</h4>
                                        <p>Pittsburgh, USA</p>
                                    </div>
                                </div>
                                <div className="card instructors-item border-0">
                                    <div className="position-relative">
                                        <img
                                            src={process.env.PUBLIC_URL + '/assets/images/instructors/02.jpg'}
                                            alt=""
                                            className="card-img-top" />
                                        <div className="instructor-social text-center">
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-facebook-f" /></Link>
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-twitter" /></Link>
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-instagram" /></Link>
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-linkedin-in" /></Link>
                                        </div>
                                    </div>
                                    <div className="card-body px-0 pb-0">
                                        <h4 className="font-weight-600 text-blue mb-1">Jesmin Walkaer</h4>
                                        <p>Pittsburgh, USA</p>
                                    </div>
                                </div>
                                <div className="card instructors-item border-0">
                                    <div className="position-relative">
                                        <img
                                            src={process.env.PUBLIC_URL + '/assets/images/instructors/03.jpg'}
                                            alt=""
                                            className="card-img-top" />
                                        <div className="instructor-social text-center">
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-facebook-f" /></Link>
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-twitter" /></Link>
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-instagram" /></Link>
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-linkedin-in" /></Link>
                                        </div>
                                    </div>
                                    <div className="card-body px-0 pb-0">
                                        <h4 className="font-weight-600 text-blue mb-1">James Benzion</h4>
                                        <p>Pittsburgh, USA</p>
                                    </div>
                                </div>
                                <div className="card instructors-item border-0">
                                    <div className="position-relative">
                                        <img
                                            src={process.env.PUBLIC_URL + '/assets/images/instructors/02.jpg'}
                                            alt=""
                                            className="card-img-top" />
                                        <div className="instructor-social text-center">
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-facebook-f" /></Link>
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-twitter" /></Link>
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-instagram" /></Link>
                                            <Link to={'/'} className="p-3 text-link initiate-scripts"><i className="fab fa-linkedin-in" /></Link>
                                        </div>
                                    </div>
                                    <div className="card-body px-0 pb-0">
                                        <h4 className="font-weight-600 text-blue mb-1">James Benzion</h4>
                                        <p>Pittsburgh, USA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default InstructorsCarousel;