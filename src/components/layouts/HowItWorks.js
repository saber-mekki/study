import React, {Component} from "react";

class HowItWorks extends Component {
    render() {
        return (
            <section className="section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2
                                className="section-title">
                                How <span className="has-line">It Works</span> <br /> For Students/Parents?
                            </h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-sm-6 mt-40">
                            <div className="how-it-works-item text-center shadow">
                                <img src={process.env.PUBLIC_URL + '/assets/images/how-it-works/01.png'} alt="" />
                                <h3 className="mt-20 font-weight-600 text-secondary">
                                    Tell Us Where You <br /> Need Help
                                </h3>
                                <p className="mt-20">His exquisite sincerity education shameless ten earnestly
                                    breakfast. Scale began quiet up short wrong in Personal attention.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mt-40">
                            <div className="how-it-works-item text-center shadow">
                                <img src={process.env.PUBLIC_URL + '/assets/images/how-it-works/02.png'} alt="" />
                                <h3 className="mt-20 font-weight-600 text-secondary">
                                    Choose The Tutor <br /> You Want
                                </h3>
                                <p className="mt-20">His exquisite sincerity education shameless ten earnestly
                                    breakfast. Scale began quiet up short wrong in Personal attention.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mt-40">
                            <div className="how-it-works-item text-center shadow">
                                <img src={process.env.PUBLIC_URL + '/assets/images/how-it-works/03.png'} alt="" />
                                <h3 className="mt-20 font-weight-600 text-secondary">
                                    Book A Tutor <br /> Start Lesson
                                </h3>
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

export default HowItWorks;