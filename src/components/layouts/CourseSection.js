import React, {Component} from "react";
import {Link} from "react-router-dom";

class CourseSection extends Component {
    render() {
        return (
            <section className="section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-30">
                            <h2 className="section-title">Largest Selection Of Courses</h2>
                        </div>
                        <div className="col-lg-12">
                            <div className="nav-scrollable">
                                <nav className="nav d-flex justify-content-between">
                                    <Link to={'/'} className="active">All</Link>
                                    <Link to={'/'}>Development</Link>
                                    <Link to={'/'}>Design</Link>
                                    <Link to={'/'}>Marketing</Link>
                                    <Link to={'/'}>Lifestyle</Link>
                                    <Link to={'/'}>IT & Software</Link>
                                    <Link to={'/'}>Personal</Link>
                                    <Link to={'/'}>Development</Link>
                                    <Link to={'/'}>Business</Link>
                                    <Link to={'/'}>Music</Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            <div className="card course-card shadow mt-40">
                                <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/courses/01.jpg'} alt="" />
                                <div className="card-body p-30">
                                    <h5 className="font-weight-600">
                                        <Link to={'/home-one'} className="text-blue">Machine Learning A-Z: hands-On Python In Data Science</Link>
                                    </h5>
                                    <p className="mt-2">She exposed painted fifteen are noisier mistake led waiting surprise.</p>
                                </div>
                                <div className="px-30">
                                    <div
                                        className="card-footer px-0 bg-transparent mb-10 d-flex justify-content-between align-items-center">
                                        <div className="rating text-primary">
                                            <span className="font-weight-600">4.3</span>
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <p className="price h6">
                                            $12.99 <s>$12.99</s>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            <div className="card course-card shadow mt-40">
                                <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/courses/02.jpg'} alt="" />
                                <div className="card-body p-30">
                                    <h5 className="font-weight-600">
                                        <Link to={'/'} className="text-blue">
                                            The Business Intelligence Analyst Course 2023
                                        </Link>
                                    </h5>
                                    <p className="mt-2">She exposed painted fifteen are noisier mistake led waiting
                                        surprise.</p>
                                </div>
                                <div className="px-30">
                                    <div
                                        className="card-footer px-0 bg-transparent mb-10 d-flex justify-content-between align-items-center">
                                        <div className="rating text-primary">
                                            <span className="font-weight-600">4.3</span>
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <p className="price h6">
                                            $12.99 <s>$12.99</s>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            <div className="card course-card shadow mt-40">
                                <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/courses/03.jpg'} alt="" />
                                <div className="card-body p-30">
                                    <h5 className="font-weight-600">
                                        <Link to={'/'} className="text-blue">The Business Intelligence Analyst Course 2023</Link>
                                    </h5>
                                    <p className="mt-2">She exposed painted fifteen are noisier mistake led waiting
                                        surprise.</p>
                                </div>
                                <div className="px-30">
                                    <div
                                        className="card-footer px-0 bg-transparent mb-10 d-flex justify-content-between align-items-center">
                                        <div className="rating text-primary">
                                            <span className="font-weight-600">4.3</span>
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <p className="price h6">
                                            $12.99 <s>$12.99</s>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            <div className="card course-card shadow mt-40">
                                <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/courses/04.jpg'} alt="" />
                                <div className="card-body p-30">
                                    <h5 className="font-weight-600">
                                        <Link to={'/'} className="text-blue">Pianoforall - Incredible New Way To Learn Pano & Keyboard course</Link>
                                    </h5>
                                    <p className="mt-2">She exposed painted fifteen are noisier mistake led waiting
                                        surprise.</p>
                                </div>
                                <div className="px-30">
                                    <div
                                        className="card-footer px-0 bg-transparent mb-10 d-flex justify-content-between align-items-center">
                                        <div className="rating text-primary">
                                            <span className="font-weight-600">4.3</span>
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <p className="price h6">
                                            $12.99 <s>$12.99</s>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            <div className="card course-card shadow mt-40">
                                <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/courses/05.jpg'} alt="" />
                                <div className="card-body p-30">
                                    <h5 className="font-weight-600">
                                        <Link to={'/'} className="text-blue">MLP Practitioner Certificate Course (Beginner To Advanced)</Link>
                                    </h5>
                                    <p className="mt-2">She exposed painted fifteen are noisier mistake led waiting
                                        surprise.</p>
                                </div>
                                <div className="px-30">
                                    <div
                                        className="card-footer px-0 bg-transparent mb-10 d-flex justify-content-between align-items-center">
                                        <div className="rating text-primary">
                                            <span className="font-weight-600">4.3</span>
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <p className="price h6">
                                            $12.99 <s>$12.99</s>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            <div className="card course-card shadow mt-40">
                                <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/courses/06.jpg'} alt="" />
                                <div className="card-body p-30">
                                    <h5 className="font-weight-600">
                                        <Link to={'/'} className="text-blue">
                                            Java Programming Masterclass For Software Developers
                                        </Link>
                                    </h5>
                                    <p className="mt-2">She exposed painted fifteen are noisier mistake led waiting
                                        surprise.</p>
                                </div>
                                <div className="px-30">
                                    <div
                                        className="card-footer px-0 bg-transparent mb-10 d-flex justify-content-between align-items-center">
                                        <div className="rating text-primary">
                                            <span className="font-weight-600">4.3</span>
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                        </div>
                                        <p className="price h6">
                                            $12.99 <s>$12.99</s>
                                        </p>
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

export default CourseSection;