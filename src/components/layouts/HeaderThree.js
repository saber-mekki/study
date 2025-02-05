import React, {Component} from "react";
import {Link} from "react-router-dom";

class HeaderThree extends Component {
    render() {
        return (
            <header className="bg-blue shadow">
                <div className="container-lg">
                    <nav className="navbar navbar-expand-xl navbar-dark px-0">
                        <Link to={'/home-one'} className="navbar-brand initiate-scripts">
                            <img
                                src={process.env.PUBLIC_URL + '/assets/images/logo.png'}
                                alt=""
                                style={{height: "49px"}} />
                        </Link>
                        <form className="navbar-form search-only d-none d-md-flex" method="post">
                            <div className="input-group">
                                <input
                                    className="form-control border-0 bg-transparent"
                                    type="search"
                                    placeholder="Search"
                                    required />
                                <div className="input-group-append">
                                    <button className="border-0 bg-transparent" type="submit"><i className="fas fa-search" /></button>
                                </div>
                            </div>
                        </form>

                        <div className="d-none d-xl-flex align-items-center ml-auto">
                            <ul className="social-icons text-white list-unstyled mr-4">
                                <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-facebook-f" /></Link></li>
                                <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-twitter" /></Link></li>
                                <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-instagram" /></Link></li>
                                <li><Link to={'/'} className="initiate-scripts"><i className="fab fa-skype" /></Link></li>
                            </ul>
                            <a
                                href="#!"
                                className="btn btn-sm btn-primary rounded-pill"
                                data-toggle="modal"
                                data-target="#signup-modal">
                                Become A Tutor</a>
                        </div>

                        <button
                            className="navbar-toggler ml-3"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNavAlt"
                            aria-controls="navbarNavAlt"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="fas fa-bars" />
                        </button>
                    </nav>
                </div>
                <div className="bg-white">
                    <div className="container-lg">
                        <nav className="navbar navbar-expand-xl has-nav-left navbar-light px-0 py-0 py-xl-3">
                            <div className="collapse navbar-collapse navbar-collapse-two" id="navbarNavAlt">
                                <ul className="navbar-nav mt-4 mt-xl-0 mx-auto ml-xl-0">
                                    <li className="nav-item dropdown active">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            to={'/'}
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false">
                                            Home <i className="fas fa-angle-down" />
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link to={'/home-one'} className="dropdown-item active initiate-scripts">HomeTutor</Link></li>
                                            <li><Link to={'/home-two'} className="dropdown-item initiate-scripts">Online Course</Link></li>
                                            <li><Link to={'/home-three'} className="dropdown-item initiate-scripts">Online University</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            to={'/'}
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false">
                                            About <i className="fas fa-angle-down" />
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link to={'/about-one'} className="dropdown-item initiate-scripts">About Us 01</Link></li>
                                            <li><Link to={'/about-two'} className="dropdown-item initiate-scripts">About Us 02</Link></li>
                                            <li><Link to={'/about-three'} className="dropdown-item initiate-scripts">About Us 03</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/courses'} className="nav-link initiate-scripts">Courses</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/blog'} className="nav-link initiate-scripts">Blog</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            to={'/'}
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false">
                                            Pages <i className="fas fa-angle-down" />
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link to={'/job-board'} className="dropdown-item initiate-scripts">Job Board</Link></li>
                                            <li><Link to={'/course-details-one'} className="dropdown-item initiate-scripts">Course Details 01</Link></li>
                                            <li><Link to={'/course-details-two'} className="dropdown-item initiate-scripts">Course Details 02</Link></li>
                                            <li><Link to={'/blog-details'} className="dropdown-item initiate-scripts">Blog Details</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/contact'} className="nav-link initiate-scripts">Contact Us</Link>
                                    </li>
                                </ul>

                                <div className="ml-auto mt-3 mt-xl-0 mb-3 mb-xl-0 text-center text-xl-right">
                                    <a
                                        href="#!"
                                        className="btn btn-sm btn-link text-dark px-3"
                                        data-toggle="modal"
                                        data-target="#signin-modal">
                                        Signin</a>
                                    <a
                                        href="#!"
                                        className="btn btn-sm btn-link text-dark px-3"
                                        data-toggle="modal"
                                        data-target="#signup-modal">
                                        Signup</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}

export default HeaderThree;