import React, {Component} from "react";

class WeOfferSection extends Component {
    render() {
        return (
            <section className="section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-title">What <span className="has-line">We Offer</span></h2>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/we-offer/01.png'} alt="" />
                                <h3 className="mt-20 font-weight-600 text-secondary">Home Tutoring</h3>
                                <p className="mt-20">His exquisite sincerity education shameless ten earnestly
                                    breakfast. Scale began quiet up short wrong in Personal attention.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/we-offer/02.png'} alt="" />
                                <h3 className="mt-20 font-weight-600 text-secondary">Online Tutoring</h3>
                                <p className="mt-20">His exquisite sincerity education shameless ten earnestly
                                    breakfast. Scale began quiet up short wrong in Personal attention.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/we-offer/03.png'} alt="" />
                                <h3 className="mt-20 font-weight-600 text-secondary">Group Tutoring</h3>
                                <p className="mt-20">His exquisite sincerity education shameless ten earnestly
                                    breakfast. Scale began quiet up short wrong in Personal attention.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/we-offer/04.png'} alt="" />
                                <h3 className="mt-20 font-weight-600 text-secondary">Package Tutoring</h3>
                                <p className="mt-20">His exquisite sincerity education shameless ten earnestly
                                    breakfast. Scale began quiet up short wrong in Personal attention.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/we-offer/05.png'} alt="" />
                                <h3 className="mt-20 font-weight-600 text-secondary">Home Tutoring</h3>
                                <p className="mt-20">His exquisite sincerity education shameless ten earnestly
                                    breakfast. Scale began quiet up short wrong in Personal attention.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="mt-40 text-center hover-grayscale">
                                <img src={process.env.PUBLIC_URL + '/assets/images/we-offer/06.png'} alt="" />
                                <h3 className="mt-20 font-weight-600 text-secondary">Offline Tutoring</h3>
                                <p className="mt-20">His exquisite sincerity education shameless ten earnestly
                                    breakfast. Scale began quiet up short wrong in Personal attention.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default WeOfferSection;