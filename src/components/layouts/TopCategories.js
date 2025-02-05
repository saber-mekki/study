import React, {Component} from "react";
import {Link} from "react-router-dom";

class TopCategories extends Component {
    render() {
        return (
            <section className="section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <h2 className="section-title mb-20">Top Course Categories</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                <img
                                    className="img-fluid border mb-15"
                                    src={process.env.PUBLIC_URL + '/assets/images/course-categories/001.png'}
                                    alt="" />
                                <span>Design</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                <img
                                    className="img-fluid border mb-15"
                                    src={process.env.PUBLIC_URL + '/assets/images/course-categories/002.png'}
                                    alt="" />
                                <span>Development</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                <img
                                    className="img-fluid border mb-15"
                                    src={process.env.PUBLIC_URL + '/assets/images/course-categories/003.png'}
                                    alt="" />
                                <span>Personal Development</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                <img
                                    className="img-fluid border mb-15"
                                    src={process.env.PUBLIC_URL + '/assets/images/course-categories/004.png'}
                                    alt="" />
                                <span>IT & Software</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                <img
                                    className="img-fluid border mb-15"
                                    src={process.env.PUBLIC_URL + '/assets/images/course-categories/005.png'}
                                    alt="" />
                                <span>Marketing</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                <img
                                    className="img-fluid border mb-15"
                                    src={process.env.PUBLIC_URL + '/assets/images/course-categories/006.png'}
                                    alt="" />
                                <span>Photography</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                <img
                                    className="img-fluid border mb-15"
                                    src={process.env.PUBLIC_URL + '/assets/images/course-categories/007.png'}
                                    alt="" />
                                <span>Lifestyle</span>
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                <img
                                    className="img-fluid border mb-15"
                                    src={process.env.PUBLIC_URL + '/assets/images/course-categories/008.png'}
                                    alt="" />
                                <span>Business</span>
                            </Link>
                        </div>
                        <div className="col-12 text-center mt-50">
                            <Link to={'/home-one'} className="btn btn-primary initiate-scripts">Get Start Now</Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default TopCategories;