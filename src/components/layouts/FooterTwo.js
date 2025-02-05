import React, {Component} from "react";
import {Link} from "react-router-dom";

class FooterTwo extends Component {
    render() {
        return (
            <footer className="footer-newsletter-overlap bg-blue">
                <div className="container">
                    <div className="row newsletter-overlap">
                        <div className="col-md-12">
                            <div className="py-5 px-3 px-sm-5 bg-light">
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <div className="p-0 pr-lg-4">
                                            <h2 className="section-title mb-20">Newsletter</h2>
                                            <p>My he houses or months settle remove ladies appear. Engrossed suffering
                                                he recommend.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 mt-4 mt-lg-0">
                                        <div
                                            className="input-group newsletter-input-group rounded-pill overflow-hidden bg-white d-block d-sm-flex">
                                            <input type="email"
                                                   className="form-control px-4 border-0"
                                                   placeholder="youmail@email.com"
                                                   aria-label="Recipient's username"
                                                   aria-describedby="basic-addon2" />
                                            <div className="input-group-append ml-0">
                                                <button className="btn btn-blue rounded-pill">Subscribe Us</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pb-80 text-white">
                        <div className="row justify-content-between">
                            <div className="col-xl-4 col-lg-5 col-sm-8">
                                <h3 className="font-weight-bold mb-30">Latest Courses</h3>
                                <div className="row">
                                    <div className="col-xl-5 col-6">
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <Link to={'/'} className="text-light initiate-scripts">
                                                    <i className="fas fa-chevron-right small mr-2" /> Development
                                                </Link>
                                            </li>
                                            <li className="mb-2">
                                                <Link to={'/'} className="text-light initiate-scripts">
                                                    <i className="fas fa-chevron-right small mr-2" /> Design
                                                </Link>
                                            </li>
                                            <li className="mb-2">
                                                <Link to={'/'} className="text-light initiate-scripts">
                                                    <i className="fas fa-chevron-right small mr-2" /> Marketing
                                                </Link>
                                            </li>
                                            <li className="mb-2">
                                                <Link to={'/'} className="text-light initiate-scripts">
                                                    <i className="fas fa-chevron-right small mr-2" /> Lifestyle
                                                </Link>
                                            </li>
                                            <li className="mb-2">
                                                <Link to={'/'} className="text-light initiate-scripts">
                                                    <i className="fas fa-chevron-right small mr-2" /> IT & Software
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-xl-5 col-6">
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <Link to={'/'} className="text-light initiate-scripts">
                                                    <i className="fas fa-chevron-right small mr-2" /> Photography
                                                </Link>
                                            </li>
                                            <li className="mb-2">
                                                <Link to={'/'} className="text-light initiate-scripts">
                                                    <i className="fas fa-chevron-right small mr-2" /> Personal
                                                </Link>
                                            </li>
                                            <li className="mb-2">
                                                <Link to={'/'} className="text-light initiate-scripts">
                                                    <i className="fas fa-chevron-right small mr-2" /> Development
                                                </Link>
                                            </li>
                                            <li className="mb-2">
                                                <Link to={'/'} className="text-light initiate-scripts">
                                                    <i className="fas fa-chevron-right small mr-2" /> Business
                                                </Link>
                                            </li>
                                            <li className="mb-2">
                                                <Link to={'/'} className="text-light initiate-scripts">
                                                    <i className="fas fa-chevron-right small mr-2" /> Music
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl col-lg-3 col-sm-4 col-6 mt-5 mt-sm-0">
                                <h3 className="font-weight-bold mb-30">Our Pages</h3>
                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <Link to={'/'} className="text-light initiate-scripts">
                                            <i className="fas fa-chevron-right small mr-2" /> About
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to={'/'} className="text-light initiate-scripts">
                                            <i className="fas fa-chevron-right small mr-2" /> Courses
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to={'/'} className="text-light initiate-scripts">
                                            <i className="fas fa-chevron-right small mr-2" /> Gallery
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to={'/'} className="text-light initiate-scripts">
                                            <i className="fas fa-chevron-right small mr-2" /> Career
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to={'/'} className="text-light initiate-scripts">
                                            <i className="fas fa-chevron-right small mr-2" /> Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-xl col-lg-3 col-sm-6 col-6 mt-5 mt-lg-0">
                                <h3 className="font-weight-bold mb-30">Valuable Links</h3>
                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <Link to={'/'} className="text-light initiate-scripts">
                                            <i className="fas fa-chevron-right small mr-2" /> Pricing
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to={'/'} className="text-light initiate-scripts">
                                            <i className="fas fa-chevron-right small mr-2" /> Privacy
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to={'/'} className="text-light initiate-scripts">
                                            <i className="fas fa-chevron-right small mr-2" /> Conditions
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to={'/'} className="text-light initiate-scripts">
                                            <i className="fas fa-chevron-right small mr-2" /> Refund Policy
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to={'/'} className="text-light initiate-scripts">
                                            <i className="fas fa-chevron-right small mr-2" /> Our Product
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-6 mt-5 mt-xl-0">
                                {/*<img src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="" />*/}
                                <p className="mt-15">Silent sir say desire fat him letter. Whatever settling
                                    goodness too and honoured she building.</p>
                                <div className="mt-30">
                                    <li><Link to={'/home-one'} className="text-link initiate-scripts"><i className="fab fa-facebook-f" /></Link></li>
                                    <li><Link to={'/home-one'} className="text-link initiate-scripts"><i className="fab fa-twitter" /></Link></li>
                                    <li><Link to={'/home-one'} className="text-link initiate-scripts"><i className="fab fa-instagram" /></Link></li>
                                    <li><Link to={'/home-one'} className="text-link pr-0 initiate-scripts"><i className="fab fa-skype" /></Link></li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom text-light py-3 border-dark border-top">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-9 text-center text-lg-left mb-3 mb-lg-0">
                                &copy; Copyright All Review <span className="text-primary">Edu</span>Skills
                            </div>
                            <div className="col-lg-3 text-center text-lg-right">
                                <ul className="list-unstyled list-inline">
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

export default FooterTwo;