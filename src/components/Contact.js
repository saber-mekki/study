import React, {Component} from "react";
import SectionOne from "./layouts/SectionOne";

class Contact extends Component {
    render() {
        return (
            <SectionOne title={'Contact'}>
                <section className="section-padding bg-gray">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-lg-7 order-1 order-lg-0">
                                <div className="mb-5">
                                    <h2 className="text-secondary font-weight-bold mb-2">Send a Message</h2>
                                    <p>Your email address will not be published. <br /> Required fields are marked.</p>
                                </div>
                                <form action="#">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-30">
                                                <label htmlFor="name">Name*</label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded-sm"
                                                    id="name"
                                                    placeholder="Jack Barker" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-30">
                                                <label htmlFor="email">Email*</label>
                                                <input
                                                    type="email"
                                                    className="form-control rounded-sm"
                                                    id="emailL"
                                                    placeholder="jack@email.com" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="mb-30">
                                                <label htmlFor="sub">Subject</label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded-sm"
                                                    id="sub"
                                                    placeholder="I want to know about course." />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="mb-30">
                                                <label htmlFor="message">Message</label>
                                                <textarea className="form-control rounded-sm" id="message" rows="5" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <button type="submit" className="btn btn-primary rounded-sm">Send Message
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="col-xl-4 col-lg-5 mb-5 mb-lg-0 order-0 order-lg-1">
                                <div className="mb-5">
                                    <h2 className="text-secondary font-weight-bold mb-2">Contact Info</h2>
                                    <p>Welcome to our Website. <br /> We are glad to have you around.</p>
                                </div>
                                <div
                                    className="shadow-sm p-20 mt-4 rounded-sm bg-white d-block d-sm-flex align-items-center">
                                    <i className="fas fa-phone fa-2x text-primary" />
                                    <div className="ml-sm-4 mt-3 mt-sm-0">
                                        <h4 className="text-secondary font-weight-600 mb-1">Contact Details</h4>
                                        <p>Phone: <a href="tel:+7800123452" className="text-dark">+780 123 452</a></p>
                                        <p>Mail: <a href="mailto:contact@eduskill.com" className="text-dark">contact@eduskill.com</a></p>
                                    </div>
                                </div>
                                <div
                                    className="shadow-sm p-20 mt-4 rounded-sm bg-white d-block d-sm-flex align-items-center">
                                    <i className="fas fa-map-marked-alt fa-2x text-primary" />
                                    <div className="ml-sm-4 mt-3 mt-sm-0">
                                        <h4 className="text-secondary font-weight-600 mb-1">Location</h4>
                                        <p>PO Box 97845 Baker st. 567, Los Angeles, California, US.</p>
                                    </div>
                                </div>
                                <div
                                    className="shadow-sm p-20 mt-4 rounded-sm bg-white d-block d-sm-flex align-items-center">
                                    <i className="fas fa-user-clock fa-2x text-primary" />
                                    <div className="ml-sm-4 mt-3 mt-sm-0">
                                        <h4 className="text-secondary font-weight-600 mb-1">Opening Hours</h4>
                                        <p>Monday-Friday</p>
                                        <p>10:30a.m-7:00p.m</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-title">You are Always <br /> Welcome to <span className="has-line">Our Place</span>
                                </h2>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <a href="#!" className="map-image" target="_blank" rel="noopener noreferrer">
                                    <img src={process.env.PUBLIC_URL + '/assets/images/map-img.jpg'} alt="" />
                                    <span className="map-text h4"><i className="fas fa-external-link-alt mr-2" /> View us on Map</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionOne>
        );
    }
}

export default Contact;