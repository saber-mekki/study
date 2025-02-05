import React, {Component} from "react";

class HowItWorksTutors extends Component {
    render() {
        return (
            <section className="section-padding pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-title mb-30">How It Works <span
                                className="has-line">for Tutors?</span></h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="how-it-works-item works-item-alt shape-style-1 text-center shadow">
                                <img
                                    className="position-static"
                                    src={process.env.PUBLIC_URL + '/assets/images/how-it-works-tutors/01.png'}
                                    alt="" />
                                <h3 className="mt-20 font-weight-600 text-secondary">Create A Free <br /> Account Now</h3>
                                <p className="mt-20">Advantage old hTad otherwise sincerity dependent additions.
                                    Six draw you him full not mean evil. Prepare garrets it expense.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="how-it-works-item works-item-alt shape-style-2 text-center shadow">
                                <img
                                    className="position-static"
                                    src={process.env.PUBLIC_URL + '/assets/images/how-it-works-tutors/02.png'}
                                    alt="" />
                                <h3 className="mt-20 font-weight-600 text-secondary">Apply to Your <br /> Tuition Job</h3>
                                <p className="mt-20">Advantage old hTad otherwise sincerity dependent additions.
                                    Six draw you him full not mean evil. Prepare garrets it expense.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="how-it-works-item works-item-alt shape-style-1 text-center shadow">
                                <img
                                    className="position-static"
                                    src={process.env.PUBLIC_URL + '/assets/images/how-it-works-tutors/03.png'}
                                    alt="" />
                                <h3 className="mt-20 font-weight-600 text-secondary">Start Tutoring <br />With Happiness</h3>
                                <p className="mt-20">Advantage old hTad otherwise sincerity dependent additions.
                                    Six draw you him full not mean evil. Prepare garrets it expense.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default HowItWorksTutors;