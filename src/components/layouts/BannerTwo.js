import React, {Component} from "react";
import {Link} from "react-router-dom";

class BannerTwo extends Component {
    render() {
        return (
            <section className="banner-2 mt-115">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <h3 className="font-weight-500 text-tertiary">Subscribe To Premium Plan</h3>
                                <h2 className="text-lg mt-20 mb-40 text-secondary">Learn At Your Own Pace!</h2>
                                <Link to={'/'} className="btn btn-primary">Check it now</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <img className="banner-illustration" src={process.env.PUBLIC_URL + '/assets/images/banner-image-01.png'} alt="" />
            </section>
        );
    }
}

export default BannerTwo;