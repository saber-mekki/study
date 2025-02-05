import React, {Component} from "react";

class BannerOne extends Component {
    render() {
        return (
            <section
                className="banner-1 has-overlay bg-cover"
                style={{backgroundImage: "url(assets/images/banner-image-00.jpg)"}}>

                <div className="container-lg">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-6 col-sm-8 text-center text-md-left">
                            <div className="text-white">
                                <h2
                                    className="text-lg mb-30">
                                    Find The <span className="has-line line-primary">Perfect Tutor</span> for Online & Offline
                                </h2>
                                <p className="h4">Education now more easy then before</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-10 mt-5 mt-md-0">
                            <form className="search-form rounded">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <select>
                                            <option>Select Districts</option>
                                            <option value="1">Dhaka</option>
                                            <option value="2">Khulna</option>
                                            <option value="3">Kushtia</option>
                                            <option value="4">Bagerhat</option>
                                            <option value="5">Chittagong</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <select name="" id="">
                                            <option value="">Select Area</option>
                                            <option value="1">Dhaka</option>
                                            <option value="2">Khulna</option>
                                            <option value="3">Kushtia</option>
                                            <option value="4">Bagerhat</option>
                                            <option value="5">Chittagong</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <select name="" id="">
                                            <option value="">Select Medium</option>
                                            <option value="1">English</option>
                                            <option value="2">Hindi</option>
                                            <option value="3">Bangla</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <select name="" id="">
                                            <option value="">Select Class</option>
                                            <option value="1">English</option>
                                            <option value="2">Hindi</option>
                                            <option value="3">Bangla</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <select name="" id="">
                                            <option value="">Select Subject</option>
                                            <option value="1">English</option>
                                            <option value="2">Hindi</option>
                                            <option value="3">Bangla</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <select name="" id="">
                                            <option value="">Select Gender</option>
                                            <option value="1">Men</option>
                                            <option value="2">Women</option>
                                            <option value="3">Othes</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-12">
                                        <button type="submit" className="btn btn-primary rounded-pill w-100">
                                            Search Tutor
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default BannerOne;