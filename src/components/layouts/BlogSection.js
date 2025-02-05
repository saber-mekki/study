import React, {Component} from "react";
import {Link} from "react-router-dom";

class BlogSection extends Component {
    render() {
        return (
            <section className="section-padding pt-0 blog-half-bg-gray">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 className="section-title mb-20">Check Out Our Latest Blog</h2>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card blog-card shadow border-0 mt-40 hover-grayscale">
                                <Link className="initiate-scripts" to={'/blog-details'}>
                                    <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/blogs/01.jpg'} alt="" />
                                </Link>
                                <div className="card-body border-top p-30">
                                    <div className="post-meta font-weight-500 small mb-20">
                                        <span className="mr-4"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                        <span><i className="fas fa-user text-primary mr-2" /> Dispatched</span>
                                    </div>
                                    <h5 className="font-weight-600">
                                        <Link
                                            to={'/blog-details'}
                                            className="text-blue initiate-scripts">
                                            Dispatched Entreaties Boister ous Say Why Stimulated
                                        </Link>
                                    </h5>
                                    <p className="mt-3">She exposed painted fifteen are noisier mistake led waiting surprise.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card blog-card shadow border-0 mt-40 hover-grayscale">
                                <Link className="initiate-scripts" to={'/blog-details'}>
                                    <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/blogs/02.jpg'} alt="" />
                                </Link>
                                <div className="card-body border-top p-30">
                                    <div className="post-meta font-weight-500 small mb-20">
                                        <span className="mr-4"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                        <span><i className="fas fa-user text-primary mr-2" /> Dispatched</span>
                                    </div>
                                    <h5 className="font-weight-600">
                                        <Link
                                            to={'/blog-details'}
                                            className="text-blue initiate-scripts">
                                            Dispatched Entreaties Boister ous Say Why Stimulated
                                        </Link>
                                    </h5>
                                    <p className="mt-3">She exposed painted fifteen are noisier mistake led waiting surprise.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card blog-card shadow border-0 mt-40 hover-grayscale">
                                <Link className="initiate-scripts" to={'/blog-details'}>
                                    <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/blogs/03.jpg'} alt="" />
                                </Link>
                                <div className="card-body border-top p-30">
                                    <div className="post-meta font-weight-500 small mb-20">
                                        <span className="mr-4"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                        <span><i className="fas fa-user text-primary mr-2" /> Dispatched</span>
                                    </div>
                                    <h5 className="font-weight-600">
                                        <Link
                                            to={'/blog-details'}
                                            className="text-blue initiate-scripts">
                                            Dispatched Entreaties Boister ous Say Why Stimulated
                                        </Link>
                                    </h5>
                                    <p className="mt-3">She exposed painted fifteen are noisier mistake led waiting surprise.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default BlogSection;