import React, {Component} from "react";

class TutorsCarouselOne extends Component {
    render() {
        return (
            <section
                className="section-padding bg-cover"
                style={{backgroundImage: "url(assets/images/pattern-bg.jpg)"}} >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-title mb-60">Happy <span className="has-line">Tutors Say</span>
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="container-lg">
                    <div className="row">
                        <div className="col-12">
                            <div className="owl-carousel tutors-carousel-alt has-dots-center">
                                <div className="tutor-item-alt bg-white p-30">
                                    <p>Left till here away at to whom past. Feelings laughing at no wondered
                                        repeated provided finished. It acceptance thoro advantages.</p>
                                    <div className="media d-block d-sm-flex mt-25">
                                        <img src={process.env.PUBLIC_URL + '/assets/images/user-01.jpg'} alt="" />
                                        <div className="ml-0 ml-sm-3 mt-3 mt-sm-0">
                                            <h4 className="font-weight-600 text-blue mb-1">James Benzion</h4>
                                            <p>Pittsburgh, USA</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tutor-item-alt bg-white p-30">
                                    <p>Left till here away at to whom past. Feelings laughing at no wondered
                                        repeated provided finished. It acceptance thoro advantages.</p>
                                    <div className="media d-block d-sm-flex mt-25">
                                        <img src={process.env.PUBLIC_URL + '/assets/images/user-05.png'} alt="" />
                                        <div className="ml-0 ml-sm-3 mt-3 mt-sm-0">
                                            <h4 className="font-weight-600 text-blue mb-1">Alex Benzion</h4>
                                            <p>Khulnala, UAE</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tutor-item-alt bg-white p-30">
                                    <p>Left till here away at to whom past. Feelings laughing at no wondered
                                        repeated provided finished. It acceptance thoro advantages.</p>
                                    <div className="media d-block d-sm-flex mt-25">
                                        <img src={process.env.PUBLIC_URL + '/assets/images/user-06.png'} alt="" />
                                        <div className="ml-0 ml-sm-3 mt-3 mt-sm-0">
                                            <h4 className="font-weight-600 text-blue mb-1">Jesmin Walker</h4>
                                            <p>Khulnala, UAE</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tutor-item-alt bg-white p-30">
                                    <p>Left till here away at to whom past. Feelings laughing at no wondered
                                        repeated provided finished. It acceptance thoro advantages.</p>
                                    <div className="media d-block d-sm-flex mt-25">
                                        <img src={process.env.PUBLIC_URL + '/assets/images/user-05.png'} alt="" />
                                        <div className="ml-0 ml-sm-3 mt-3 mt-sm-0">
                                            <h4 className="font-weight-600 text-blue mb-1">Alex Benzion</h4>
                                            <p>Khulnala, UAE</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default TutorsCarouselOne;