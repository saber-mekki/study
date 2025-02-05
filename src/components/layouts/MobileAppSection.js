import React, {Component} from "react";
import {Link} from "react-router-dom";

class MobileAppSection extends Component {
    render() {
        return (
            <section className="section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <h2 className="section-title mb-30">Our <span className="has-line">Mobile App</span>
                            </h2>
                            <p className="mb-4">Weddings and any opinions suitable smallest nay. My he houses or
                                months settle remove ladies appear. Engrossed suffering supposing he recommend.
                                Commanded no of depending extremity recommend attention tolerably.</p>
                            <Link to={'/home-one'} className="btn btn-lg btn-secondary rounded-pill initiate-scripts">Search Tutor</Link>
                        </div>
                        <div className="col-lg-7 mt-5 mt-lg-0 text-center">
                            <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/images/mobile-app.png'} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default MobileAppSection;