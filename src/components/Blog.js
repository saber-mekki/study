import React, {Component} from "react";
import SectionTwo from "./layouts/SectionTwo";
import {Link} from "react-router-dom";

class Blog extends Component {
    render() {
        return (
            <SectionTwo title={'Blogs'}>
                <section className="section-padding pb-fix">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="card shadow border-0 mb-40 hover-grayscale">
                                    <Link to={'/blog-details'} className="initiate-scripts">
                                        <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/blogs/01.jpg'} alt="" />
                                    </Link>
                                    <div className="card-body border-top p-30">
                                        <div className="post-meta font-weight-500 small mb-20">
                                            <span className="mr-3"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                            <span><i className="fas fa-user text-primary mr-2" /> Dispatched</span>
                                        </div>
                                        <h5 className="font-weight-600">
                                            <Link to={'/blog-details'} className="text-blue initiate-scripts">
                                                Dispatched Entreaties Boister ous Say Why Stimulated
                                            </Link>
                                        </h5>
                                        <p className="mt-3">
                                            She exposed painted fifteen are noisier mistake led waiting surprise.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="card shadow border-0 mb-40 hover-grayscale">
                                    <Link to={'/blog-details'} className="initiate-scripts">
                                        <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/blogs/02.jpg'} alt="" />
                                    </Link>
                                    <div className="card-body border-top p-30">
                                        <div className="post-meta font-weight-500 small mb-20">
                                            <span className="mr-3"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                            <span><i className="fas fa-user text-primary mr-2" /> Dispatched</span>
                                        </div>
                                        <h5 className="font-weight-600">
                                            <Link to={'/blog-details'} className="text-blue initiate-scripts">
                                                Dispatched Entreaties Boister ous Say Why Stimulated
                                            </Link>
                                        </h5>
                                        <p className="mt-3">
                                            She exposed painted fifteen are noisier mistake led waiting surprise.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="card shadow border-0 mb-40 hover-grayscale">
                                    <Link to={'/blog-details'} className="initiate-scripts">
                                        <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/blogs/03.jpg'} alt="" />
                                    </Link>
                                    <div className="card-body border-top p-30">
                                        <div className="post-meta font-weight-500 small mb-20">
                                            <span className="mr-3"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                            <span><i className="fas fa-user text-primary mr-2" /> Incidunt</span>
                                        </div>
                                        <h5 className="font-weight-600">
                                            <Link to={'/'} className="text-blue">
                                                Reiciendis incidunt obcaecati vitae quos enim volupt!
                                            </Link>
                                        </h5>
                                        <p className="mt-3">She exposed painted fifteen are noisier mistake led waiting surprise.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="card shadow border-0 mb-40 hover-grayscale">
                                    <Link to={'/blog-details'} className="initiate-scripts">
                                        <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/blogs/02.jpg'} alt="" />
                                    </Link>
                                    <div className="card-body border-top p-30">
                                        <div className="post-meta font-weight-500 small mb-20">
                                            <span className="mr-3"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                            <span><i className="fas fa-user text-primary mr-2" /> Repelle</span>
                                        </div>
                                        <h5 className="font-weight-600">
                                            <Link to={'/blog-details'} className="text-blue initiate-scripts">
                                                Dispatched Entreaties Boister ous Say Why Stimulated
                                            </Link>
                                        </h5>
                                        <p className="mt-3">
                                            She exposed painted fifteen are noisier mistake led waiting surprise.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="card shadow border-0 mb-40 hover-grayscale">
                                    <Link to={'/blog-details'} className="initiate-scripts">
                                        <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/blogs/03.jpg'} alt="" />
                                    </Link>
                                    <div className="card-body border-top p-30">
                                        <div className="post-meta font-weight-500 small mb-20">
                                            <span className="mr-3"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                            <span><i className="fas fa-user text-primary mr-2" /> Incidunt</span>
                                        </div>
                                        <h5 className="font-weight-600">
                                            <Link to={'/'} className="text-blue">
                                                Reiciendis incidunt obcaecati vitae quos enim volupt!
                                            </Link>
                                        </h5>
                                        <p className="mt-3">She exposed painted fifteen are noisier mistake led waiting
                                            surprise.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="card shadow border-0 mb-40 hover-grayscale">
                                    <Link to={'/blog-details'} className="initiate-scripts">
                                        <img className="card-img-top" src={process.env.PUBLIC_URL + '/assets/images/blogs/01.jpg'} alt="" />
                                    </Link>
                                    <div className="card-body border-top p-30">
                                        <div className="post-meta font-weight-500 small mb-20">
                                            <span className="mr-3"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                            <span><i className="fas fa-user text-primary mr-2" /> Dispatched</span>
                                        </div>
                                        <h5 className="font-weight-600">
                                            <Link to={'/blog-details'} className="text-blue initiate-scripts">
                                                Dispatched Entreaties Boister ous Say Why Stimulated
                                            </Link>
                                        </h5>
                                        <p className="mt-3">
                                            She exposed painted fifteen are noisier mistake led waiting surprise.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <nav className="mt-20">
                                    <ul className="pagination justify-content-center font-weight-600">
                                        <li className="page-item"><Link to={'/'} className="page-link"><i className="fas fa-chevron-left" /></Link></li>
                                        <li className="page-item"><Link to={'/'} className="page-link">01</Link></li>
                                        <li className="page-item active"><Link to={'/'} className="page-link">02</Link></li>
                                        <li className="page-item"><Link to={'/'} className="page-link">03</Link></li>
                                        <li className="page-item"><Link to={'/'} className="page-link"><i className="fas fa-chevron-right" /></Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionTwo>
        );
    }
}

export default Blog;