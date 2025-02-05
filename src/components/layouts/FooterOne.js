import React, {Component} from "react";
import {Link} from "react-router-dom";

class FooterOne extends Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="py-5 px-3 px-sm-5 bg-light">
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <div className="p-0 pr-lg-4">
                                            <h2 className="section-title mb-20">Newsletter</h2>
                                            <p>My he houses or months settle remove ladies appear. Engrossed
                                                suffering he recommend.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 mt-4 mt-lg-0">
                                        <div className="input-group newsletter-input-group d-block d-sm-flex">
                                            <input
                                                type="email"
                                                className="form-control px-4"
                                                placeholder="youmail@email.com"
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2" />
                                            <div className="input-group-append">
                                                <button className="btn btn-blue">Subscribe Us</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-3">
                        <div className="row align-items-center">
                            <div className="col-lg-9 text-center text-lg-left mb-4 mb-lg-0">
                                <ul className="list-unstyled list-inline font-weight-500">
                                    <li className="list-inline-item">
                                        <Link to={'/home-one'} className="p-2 d-block text-link initiate-scripts">HomeTutor</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to={'/home-one'} className="p-2 d-block text-link initiate-scripts">Online Class</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to={'/about-one'} className="p-2 d-block text-link initiate-scripts">About</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to={'/about-two'} className="p-2 d-block text-link initiate-scripts">Courses</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to={'/blog'} className="p-2 d-block text-link initiate-scripts">Blog</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to={'contact'} className="p-2 d-block text-link initiate-scripts">Contact us</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 text-center text-lg-right">
                                <ul className="social-icons list-unstyled mr-2">
                                    <li><Link to={'/home-one'} className="text-link initiate-scripts"><i className="fab fa-facebook-f" /></Link></li>
                                    <li><Link to={'/home-one'} className="text-link initiate-scripts"><i className="fab fa-twitter" /></Link></li>
                                    <li><Link to={'/home-one'} className="text-link initiate-scripts"><i className="fab fa-instagram" /></Link></li>
                                    <li><Link to={'/home-one'} className="text-link pr-0 initiate-scripts"><i className="fab fa-skype" /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom py-3 border-top">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-9 text-center text-lg-left mb-3 mb-lg-0">
                                &copy; Copyright All Review <span className="text-primary">Edu</span>Skills
                            </div>
                            <div className="col-lg-3 text-center text-lg-right">
                                <ul className="list-unstyled list-inline font-weight-500">
                                    <li className="list-inline-item"><Link to={'/home-one'} className="p-2 d-block text-link initiate-scripts">Privacy</Link></li>
                                    <li className="list-inline-item"><Link to={'/home-one'} className="p-2 d-block text-link initiate-scripts">Contact us</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default FooterOne;