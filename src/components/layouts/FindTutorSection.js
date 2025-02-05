import React, {Component} from "react";
import {Link} from "react-router-dom";

class FindTutorSection extends Component {
    render() {
        return (
            <section
                className="find-tutor-section section-padding bg-cover has-overlay text-white"
                style={{backgroundImage: "url(assets/images/find-tutor.jpg)"}}>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="section-title text-white mb-30">Find <span className="has-line">Online Tutors</span>
                                <br /> In Any Subject</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/subject/01.png'} alt="" />
                                <h3 className="mt-15 font-weight-600">Math</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/subject/02.png'} alt="" />
                                <h3 className="mt-15 font-weight-600">English</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/subject/03.png'} alt="" />
                                <h3 className="mt-15 font-weight-600">Engneering</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/subject/04.png'} alt="" />
                                <h3 className="mt-15 font-weight-600">History</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/subject/05.png'} alt="" />
                                <h3 className="mt-15 font-weight-600">Social Science</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/subject/06.png'} alt="" />
                                <h3 className="mt-15 font-weight-600">Computer Science</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/subject/07.png'} alt="" />
                                <h3 className="mt-15 font-weight-600">Data Science</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/subject/08.png'} alt="" />
                                <h3 className="mt-15 font-weight-600">Medical</h3>
                            </div>
                        </div>
                        <div className="col-lg-12 text-center mt-80">
                            <Link to={'/home-one'} className="btn btn-lg btn-primary rounded-pill initiate-scripts">See all Subjects</Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default FindTutorSection;