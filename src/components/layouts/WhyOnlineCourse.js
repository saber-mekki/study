import React, {Component} from "react";
import {Link} from "react-router-dom";

class WhyOnlineCourse extends Component {
    render() {
        return (
            <section className="section-padding bg-light overflow-hidden">
                <div className="container">
                    <div className="d-block d-lg-flex align-items-center">
                        <div className="col-lg-7">
                            <div className="pr-0 pr-lg-5">
                                <h2 className="section-title mb-35">Why Create An Online Course With Us?</h2>
                                <p>Dispatched entreaties boisterous say why stimulated. Certain forbade picture now
                                    prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps
                                    of in to certain.</p>
                                <ul className="list-unstyled mt-3">
                                    <li className="mb-2"><i className="fas fa-check text-tertiary mr-2" /> Certain
                                        forbade picture now prevent carried she get see
                                    </li>
                                    <li className="mb-2"><i className="fas fa-check text-tertiary mr-2" /> Inhabit so
                                        perhaps of in to certain.
                                    </li>
                                    <li className="mb-2"><i className="fas fa-check text-tertiary mr-2" /> Passed
                                        edward two talent effect seemed engage six.
                                    </li>
                                    <li className="mb-2"><i className="fas fa-check text-tertiary mr-2" /> Improved
                                        sensible servants children striking in surprise.
                                    </li>
                                </ul>
                                <h3 className="mt-4 font-weight-600 text-blue">Download The App & Start Leaning</h3>
                                <p className="mt-3 mb-4">Dispatched entreaties boisterous say why stimulated. Certain
                                    forbade picture now prevent carried she get see sitting.</p>
                                <Link to={'/home-one'} className="mr-3 initiate-scripts"><img src={process.env.PUBLIC_URL + '/assets/images/google-play-btn.png'} alt="" /></Link>
                                <Link to={'/home-one'} className="initiate-scripts" ><img src={process.env.PUBLIC_URL + '/assets/images/app-store-btn.png'} alt="" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-8 mt-5 mt-lg-0">
                            <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/images/why-course.png'} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default WhyOnlineCourse;