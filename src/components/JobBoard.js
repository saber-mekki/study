import React, {Component} from "react";
import SectionOne from "./layouts/SectionOne";
import {Link} from "react-router-dom";

class JobBoard extends Component {
    render() {
        return (
            <SectionOne title={'Job Board'}>
                <section className="section-padding bg-gray">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4">
                                <ul className="nav nav-pills nav-justified tab-nav">
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link active"
                                            id="tutor-tab"
                                            data-toggle="tab"
                                            href="#tutor"
                                            role="tab"
                                            aria-controls="tutor"
                                            aria-selected="true">
                                            Looking Tutor</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link"
                                            id="student-tab"
                                            data-toggle="tab"
                                            href="#student"
                                            role="tab"
                                            aria-controls="student"
                                            aria-selected="false">
                                            Looking Student</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div
                                        className="tab-pane fade show active"
                                        id="tutor"
                                        role="tabpanel"
                                        aria-labelledby="tutor-tab">
                                        <form className="search-form px-30 rounded bg-white shadow">
                                            <h4 className="font-weight-600 mb-25 text-blue">
                                                Search Tutor & Happy Learn
                                            </h4>
                                            <select name="" id="">
                                                <option value="">Select Districts</option>
                                                <option value="1">Dhaka</option>
                                                <option value="2">Khulna</option>
                                                <option value="3">Kushtia</option>
                                                <option value="4">Bagerhat</option>
                                                <option value="5">Chittagong</option>
                                            </select>

                                            <select name="" id="">
                                                <option value="">Select Area</option>
                                                <option value="1">Dhaka</option>
                                                <option value="2">Khulna</option>
                                                <option value="3">Kushtia</option>
                                                <option value="4">Bagerhat</option>
                                                <option value="5">Chittagong</option>
                                            </select>

                                            <select name="" id="">
                                                <option value="">Select Medium</option>
                                                <option value="1">English</option>
                                                <option value="2">Hindi</option>
                                                <option value="3">Bangla</option>
                                            </select>

                                            <select name="" id="">
                                                <option value="">Select Class</option>
                                                <option value="1">English</option>
                                                <option value="2">Hindi</option>
                                                <option value="3">Bangla</option>
                                            </select>

                                            <select name="" id="">
                                                <option value="">Select Subject</option>
                                                <option value="1">English</option>
                                                <option value="2">Hindi</option>
                                                <option value="3">Bangla</option>
                                            </select>

                                            <select name="" id="">
                                                <option value="">Select Gender</option>
                                                <option value="1">Men</option>
                                                <option value="2">Women</option>
                                                <option value="3">Othes</option>
                                            </select>

                                            <button type="submit" className="btn btn-primary rounded-pill w-100">
                                                Search Tutor
                                            </button>
                                        </form>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="student"
                                        role="tabpanel"
                                        aria-labelledby="student-tab">
                                        <form className="search-form px-30 rounded bg-white shadow">
                                            <h4 className="font-weight-600 mb-25 text-blue">
                                                Search Student for Teaching
                                            </h4>
                                            <select name="" id="">
                                                <option value="">Select Districts</option>
                                                <option value="1">Dhaka</option>
                                                <option value="2">Khulna</option>
                                                <option value="3">Kushtia</option>
                                                <option value="4">Bagerhat</option>
                                                <option value="5">Chittagong</option>
                                            </select>

                                            <select name="" id="">
                                                <option value="">Select Area</option>
                                                <option value="1">Dhaka</option>
                                                <option value="2">Khulna</option>
                                                <option value="3">Kushtia</option>
                                                <option value="4">Bagerhat</option>
                                                <option value="5">Chittagong</option>
                                            </select>

                                            <select name="" id="">
                                                <option value="">Select Medium</option>
                                                <option value="1">English</option>
                                                <option value="2">Hindi</option>
                                                <option value="3">Bangla</option>
                                            </select>

                                            <select name="" id="">
                                                <option value="">Select Class</option>
                                                <option value="1">English</option>
                                                <option value="2">Hindi</option>
                                                <option value="3">Bangla</option>
                                            </select>

                                            <select name="" id="">
                                                <option value="">Select Subject</option>
                                                <option value="1">English</option>
                                                <option value="2">Hindi</option>
                                                <option value="3">Bangla</option>
                                            </select>

                                            <select name="" id="">
                                                <option value="">Select Gender</option>
                                                <option value="1">Men</option>
                                                <option value="2">Women</option>
                                                <option value="3">Othes</option>
                                            </select>

                                            <button type="submit" className="btn btn-primary rounded-pill w-100">
                                                Search Student
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 mt-5 mt-lg-0">
                                <div className="p-30 mb-35 bg-white shadow rounded">
                                    <Link
                                        to={'/'}
                                        className="h3 text-blue font-weight-600 initiate-scripts">
                                        Need Two Bangla Medium Tutor For Standard 9 Student - 3 Days / Week
                                    </Link>
                                    <div className="job-meta mt-3">
                                        <span className="mr-3">Job ID : 43080</span>
                                        <span>Sep 21, 2023</span>
                                    </div>
                                    <div className="border-top mt-30">
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-home text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Tuition Type</h5>
                                                        <p>Home Tutoring</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-book text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Subject</h5>
                                                        <p>English</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="far fa-calendar-alt text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Tutoring Days</h5>
                                                        <p>3 days/week</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-book-reader text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Class</h5>
                                                        <p>Standard 9</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-hand-holding-usd text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Salary</h5>
                                                        <p>$599 USD</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-map-marker-alt text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Location</h5>
                                                        <p>Bangladesh</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mt-30">
                                                <Link to={'/'} className="btn bg-blue text-white rounded-pill initiate-scripts">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-30 mb-35 bg-white shadow rounded">
                                    <Link to={'/'} className="h3 text-blue font-weight-600 initiate-scripts">
                                        Need Three English Medium Tutor For Standard 9 Student - 3 Days / Week
                                    </Link>
                                    <div className="job-meta mt-3">
                                        <span className="mr-3">Job ID : 43080</span>
                                        <span>Sep 21, 2023</span>
                                    </div>
                                    <div className="border-top mt-30">
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-home text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Tuition Type</h5>
                                                        <p>Home Tutoring</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-book text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Subject</h5>
                                                        <p>English</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="far fa-calendar-alt text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Tutoring Days</h5>
                                                        <p>3 days/week</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-book-reader text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Class</h5>
                                                        <p>Standard 9</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-hand-holding-usd text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Salary</h5>
                                                        <p>$599 USD</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-map-marker-alt text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Location</h5>
                                                        <p>Bangladesh</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mt-30">
                                                <Link to={'/'} className="btn bg-blue text-white rounded-pill initiate-scripts">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-30 mb-35 bg-white shadow rounded">
                                    <Link to={'/'} className="h3 text-blue font-weight-600 initiate-scripts">
                                        Need Social Science Tutor For Standard 9 Student - 3 Days / Week
                                    </Link>
                                    <div className="job-meta mt-3">
                                        <span className="mr-3">Job ID : 43080</span>
                                        <span>Sep 21, 2023</span>
                                    </div>
                                    <div className="border-top mt-30">
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-home text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Tuition Type</h5>
                                                        <p>Home Tutoring</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-book text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Subject</h5>
                                                        <p>English</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="far fa-calendar-alt text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Tutoring Days</h5>
                                                        <p>3 days/week</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-book-reader text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Class</h5>
                                                        <p>Standard 9</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-hand-holding-usd text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Salary</h5>
                                                        <p>$599 USD</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-map-marker-alt text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Location</h5>
                                                        <p>Bangladesh</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mt-30">
                                                <Link to={'/'} className="btn bg-blue text-white rounded-pill initiate-scripts">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-30 mb-35 bg-white shadow rounded">
                                    <Link to={'/'} className="h3 text-blue font-weight-600 initiate-scripts">
                                        Need Three English Medium Tutor For Standard 9 Student - 3 Days / Week
                                    </Link>
                                    <div className="job-meta mt-3">
                                        <span className="mr-3">Job ID : 43080</span>
                                        <span>Sep 21, 2023</span>
                                    </div>
                                    <div className="border-top mt-30">
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-home text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Tuition Type</h5>
                                                        <p>Home Tutoring</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-book text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Subject</h5>
                                                        <p>English</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="far fa-calendar-alt text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Tutoring Days</h5>
                                                        <p>3 days/week</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-book-reader text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Class</h5>
                                                        <p>Standard 9</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-hand-holding-usd text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Salary</h5>
                                                        <p>$599 USD</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6">
                                                <div className="media mt-25 align-items-center">
                                                    <i className="fas fa-map-marker-alt text-primary fa-2x" />
                                                    <div className="ml-3">
                                                        <h5 className="font-weight-600 text-blue">Location</h5>
                                                        <p>Bangladesh</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mt-30">
                                                <Link to={'/'} className="btn bg-blue text-white rounded-pill initiate-scripts">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <nav className="mt-70">
                                    <ul className="pagination font-weight-600">
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
            </SectionOne>
        );
    }
}

export default JobBoard;