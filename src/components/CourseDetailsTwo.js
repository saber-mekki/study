import React, {Component} from "react";
import SectionTwo from "./layouts/SectionTwo";
import {Link} from "react-router-dom";

class CourseDetailsTwo extends Component {
    render() {
        return (
            <SectionTwo title={'Course Details'}>
                <section className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <h2 className="text-secondary font-weight-bold">
                                    Statistics of Data Science and Business Analysis 2023
                                </h2>

                                <div className="d-flex align-items-center mt-20">
                                    <h4 className="text-secondary font-weight-600">$12.99 <s
                                        className="font-weight-normal text-muted">$22.99</s></h4>
                                    <div className="rating text-primary ml-4">
                                        <span className="font-weight-600">4.3</span>
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                    </div>
                                </div>

                                <div className="mt-4 mb-4">
                                    <img
                                        className="img-fluid rounded"
                                        src={process.env.PUBLIC_URL + '/assets/images/course-single.jpg'}
                                        alt="" />
                                </div>

                                <p className="mb-3">She exposed painted fifteen are noisier mistake led waiting.
                                    Surprise not quick six blind smart out burst. Perfectly on furniture dejection
                                    determine my depending an to. Add short water court fat. Her bachelor honoured
                                    perceive securing but desirous ham required. Questions deficient acuteness to
                                    engrossed as. Entirely led ten humoured greatest and yourself. Besides ye country on
                                    observe. She continue appetite endeavor she judgment interest the met. For she
                                    surrounded motionless fat resolution may.</p>
                                <p className="mb-3">Supported neglected met she therefore unwilling discovery remainder.
                                    Way sentiments two indulgence uncommonly own. Diminution to frequently sentiments he
                                    connection continuing indulgence. An my exquisite conveying up defective. Shameless
                                    see the tolerably how continued. She enable men twenty elinor points appear. Whose
                                    merry ten yet was men seven ought balls.</p>
                                <p className="mb-3">Betrayed cheerful declared end and. Questions we additions is
                                    extremely incommode. Next half add call them eat face. Age lived smile six defer bed
                                    their few. Had admitting concluded too behaviour him she. Of death to or to being
                                    other.</p>
                                <p className="mb-3">Article nor prepare chicken you him now. Shy merits say advice ten
                                    before lovers innate add. She cordially behaviour can attempted estimable. Trees
                                    delay fancy noise manor do as an small. Felicity now law securing breeding likewise
                                    extended and. Roused either who favour why ham.</p>
                                <p className="mb-3">She who arrival end how fertile enabled. Brother she add yet see
                                    minuter natural smiling article painted. Themselves at dispatched interested
                                    insensible am be prosperous reasonably it. In either so spring wished. Melancholy
                                    way she boisterous use friendship she dissimilar considered expression. Sex quick
                                    arose mrs lived. Mr things do plenty others an vanity myself waited to. Always
                                    parish tastes at as mr father dining at.</p>

                                <Link to={'/'} className="btn btn-lg btn-secondary rounded-pill mt-30">Appy Online</Link>
                            </div>

                            <div className="col-lg-4 mt-5 mt-lg-0">
                                <div className="widget">
                                    <h4 className="widget-title">Related Courses</h4>
                                    <div className="card course-card shadow mt-10">
                                        <img
                                            className="card-img-top"
                                            src={process.env.PUBLIC_URL + '/assets/images/courses/03.jpg'}
                                            alt="" />
                                        <div className="card-body p-30">
                                            <h5 className="font-weight-600">
                                                <Link to={'/'} className="text-blue">The Business Intelligence Analyst Course 2023</Link>
                                            </h5>
                                            <p className="mt-2">She exposed painted fifteen are noisier mistake led
                                                waiting surprise.</p>
                                        </div>
                                        <div className="px-30">
                                            <div
                                                className="card-footer px-0 bg-transparent mb-10 d-flex justify-content-between align-items-center">
                                                <div className="rating text-primary">
                                                    <span className="font-weight-600">4.3</span>
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                </div>
                                                <p className="price h6">
                                                    $12.99 <s>$12.99</s>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card course-card shadow mt-30">
                                        <img
                                            className="card-img-top"
                                            src={process.env.PUBLIC_URL + '/assets/images/courses/02.jpg'}
                                            alt="" />
                                        <div className="card-body p-30">
                                            <h5 className="font-weight-600">
                                                <Link to={'/'} className="text-blue">The Business Intelligence Analyst Course 2023</Link>
                                            </h5>
                                            <p className="mt-2">She exposed painted fifteen are noisier mistake led
                                                waiting surprise.</p>
                                        </div>
                                        <div className="px-30">
                                            <div
                                                className="card-footer px-0 bg-transparent mb-10 d-flex justify-content-between align-items-center">
                                                <div className="rating text-primary">
                                                    <span className="font-weight-600">4.3</span>
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                </div>
                                                <p className="price h6">
                                                    $12.99 <s>$12.99</s>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card course-card shadow mt-30">
                                        <img
                                            className="card-img-top"
                                            src={process.env.PUBLIC_URL + '/assets/images/courses/06.jpg'}
                                            alt="" />
                                        <div className="card-body p-30">
                                            <h5 className="font-weight-600">
                                                <Link to={'/'} className="text-blue">Java Programming Masterclass For Software Developers</Link>
                                            </h5>
                                            <p className="mt-2">She exposed painted fifteen are noisier mistake led
                                                waiting surprise.</p>
                                        </div>
                                        <div className="px-30">
                                            <div
                                                className="card-footer px-0 bg-transparent mb-10 d-flex justify-content-between align-items-center">
                                                <div className="rating text-primary">
                                                    <span className="font-weight-600">4.3</span>
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                </div>
                                                <p className="price h6">
                                                    $12.99 <s>$12.99</s>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-100">
                                <div
                                    className="cta-section section-padding has-overlay bg-cover"
                                    style={{backgroundImage: "url(assets/images/cta-bg.jpg)"}}>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 text-white text-center">
                                            <h2 className="h1 font-weight-bold mb-20">50% Offer For Very First 50
                                                Students</h2>
                                            <p className="mb-30">Dispatched entreaties boisterous say why stimulated.
                                                Certain forbade picture now prevent carried.</p>
                                            <Link to={'/'} className="btn btn-light rounded-pill">Become A Student</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionTwo>
        );
    }
}

export default CourseDetailsTwo;