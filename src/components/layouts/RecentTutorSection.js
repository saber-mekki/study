import React, {Component} from "react";
import {Link} from "react-router-dom";

class RecentTutorSection extends Component {
    render() {
        return (
            <section className="section-padding">
                <div className="container">
                    <div className="row align-items-center mb-30">
                        <div className="col-lg-9 text-center text-lg-left">
                            <h2 className="section-title mb-0">Tutors <span
                                className="has-line">Joined Recently</span></h2>
                        </div>
                        <div className="col-lg-3 mt-4 mt-lg-0 text-center text-lg-right">
                            <Link to={'/home-one'} className="text-primary font-weight-600 initiate-scripts">Show More</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="card shadow-sm mt-40">
                                <div className="card-body p-30">
                                    <div className="d-flex justify-content-between align-items-end">
                                        <div className="media d-block">
                                            <img className="mx-auto mx-sm-0" src={process.env.PUBLIC_URL + '/assets/images/user-01.jpg'} alt="" />
                                            <div className="mt-3">
                                                <h4 className="font-weight-600 text-blue mb-1">James
                                                    Benzion</h4>
                                                <p>Pittsburgh, USA</p>
                                            </div>
                                        </div>
                                        <div className="text-primary text-center">
                                            <span className="h2 d-block font-weight-bold line-hight-1">$30</span>
                                            <span className="h4">Hours</span>
                                        </div>
                                    </div>
                                    <ul className="list-inline my-4 pt-3 pb-4 border-top border-bottom">
                                        <li className="list-inline-item p-2 bg-gray rounded mt-2">English</li>
                                        <li className="list-inline-item p-2 bg-gray rounded mt-2">American English</li>
                                        <li className="list-inline-item p-2 bg-gray rounded mt-2">Business English</li>
                                        <li className="list-inline-item p-2 bg-gray rounded mt-2">Grammar</li>
                                    </ul>

                                    <Link to={'/home-one'} className="btn btn-outline-primary rounded-pill initiate-scripts">Send Message</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card shadow-sm mt-40">
                                <div className="card-body p-30">
                                    <div className="d-flex justify-content-between align-items-end">
                                        <div className="media d-block">
                                            <img className="mx-auto mx-sm-0" src={process.env.PUBLIC_URL + '/assets/images/user-05.png'} alt="" />
                                            <div className="mt-3">
                                                <h4 className="font-weight-600 text-blue mb-1">Jack Baker</h4>
                                                <p>Pittsburgh, USA</p>
                                            </div>
                                        </div>
                                        <div className="text-primary text-center">
                                            <span className="h2 d-block font-weight-bold line-hight-1">$30</span>
                                            <span className="h4">Hours</span>
                                        </div>
                                    </div>
                                    <ul className="list-inline my-4 pt-3 pb-4 border-top border-bottom">
                                        <li className="list-inline-item p-2 bg-gray rounded mt-2">English</li>
                                        <li className="list-inline-item p-2 bg-gray rounded mt-2">American English</li>
                                        <li className="list-inline-item p-2 bg-gray rounded mt-2">Business English</li>
                                        <li className="list-inline-item p-2 bg-gray rounded mt-2">Grammar</li>
                                    </ul>

                                    <Link to={'/home-one'} className="btn btn-outline-primary rounded-pill initiate-scripts">Send Message</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card shadow-sm mt-40">
                                <div className="card-body p-30">
                                    <div className="d-flex justify-content-between align-items-end">
                                        <div className="media d-block">
                                            <img className="mx-auto mx-sm-0" src={process.env.PUBLIC_URL + '/assets/images/user-06.png'} alt="" />
                                            <div className="mt-3">
                                                <h4 className="font-weight-600 text-blue mb-1">Jesica
                                                    Walker</h4>
                                                <p>Pittsburgh, USA</p>
                                            </div>
                                        </div>
                                        <div className="text-primary text-center">
                                            <span className="h2 d-block font-weight-bold line-hight-1">$30</span>
                                            <span className="h4">Hours</span>
                                        </div>
                                    </div>
                                    <ul className="list-inline my-4 pt-3 pb-4 border-top border-bottom">
                                        <li className="list-inline-item p-2 bg-gray rounded mt-2">English</li>
                                        <li className="list-inline-item p-2 bg-gray rounded mt-2">American English</li>
                                        <li className="list-inline-item p-2 bg-gray rounded mt-2">Business English</li>
                                        <li className="list-inline-item p-2 bg-gray rounded mt-2">Grammar</li>
                                    </ul>

                                    <Link to={'/home-one'} className="btn btn-outline-primary rounded-pill initiate-scripts">Send Message</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default RecentTutorSection;