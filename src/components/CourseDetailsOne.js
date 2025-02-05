import React, {Component} from "react";
import SectionTwo from "./layouts/SectionTwo";
import {Link} from "react-router-dom";

class CourseDetailsOne extends Component {
    render() {
        return (
            <SectionTwo title={'Course Details'}>
                <section className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <h2 className="text-secondary font-weight-bold mb-4">
                                    Machine Learning A-Z: Learn Hands-On Python Language In Data Science
                                </h2>

                                <div className="mb-5">
                                    <a target="_blank" rel="noopener noreferrer"
                                        href="https://www.youtube.com/watch?v=yD7b6R0-LQw"
                                        className="d-block has-overlay has-video-popup tansform-none rounded-0">
                                        <img
                                            className="img-fluid"
                                            src={process.env.PUBLIC_URL + '/assets/images/video-thumb-2.jpg'}
                                            alt="" />
                                        <img
                                            className="play-btn"
                                            src={process.env.PUBLIC_URL + '/assets/images/video-btn.png'}
                                            alt="" />
                                    </a>
                                </div>

                                <ul
                                    className="nav nav-pills mb-4 bg-gray tab-nav nav-justified"
                                    id="pills-tab"
                                    role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link active"
                                            id="pills-overview-tab"
                                            data-toggle="pill"
                                            href="#pills-overview"
                                            role="tab"
                                            aria-controls="pills-overview"
                                            aria-selected="true">Overview</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link"
                                            id="pills-transcript-tab"
                                            data-toggle="pill"
                                            href="#pills-transcript"
                                            role="tab"
                                            aria-controls="pills-transcript"
                                            aria-selected="false">Transcript</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link"
                                            id="pills-exercise-tab"
                                            data-toggle="pill"
                                            href="#pills-exercise"
                                            role="tab"
                                            aria-controls="pills-exercise"
                                            aria-selected="false">Exercise File</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="pills-overview"
                                        role="tabpanel"
                                        aria-labelledby="pills-overview-tab">
                                        <p className="mb-3">She exposed painted fifteen are noisier mistake led waiting.
                                            Surprise not quick six blind smart out burst. Perfectly on furniture
                                            dejection determine my depending an to. Add short water court fat. Her
                                            bachelor honoured perceive securing but desirous ham required. Questions
                                            deficient acuteness to engrossed as. Entirely led ten humoured greatest and
                                            yourself. Besides ye country on observe. She continue appetite endeavor she
                                            judgment interest the met. For she surrounded motionless fat resolution
                                            may.</p>
                                        <p className="mb-3">Supported neglected met she therefore unwilling discovery
                                            remainder. Way sentiments two indulgence uncommonly own. Diminution to
                                            frequently sentiments he connection continuing indulgence. An my exquisite
                                            conveying up defective. Shameless see the tolerably how continued. She
                                            enable men twenty elinor points appear. Whose merry ten yet was men seven
                                            ought balls.</p>
                                        <p className="mb-3">Betrayed cheerful declared end and. Questions we additions
                                            is extremely incommode. Next half add call them eat face. Age lived smile
                                            six defer bed their few. Had admitting concluded too behaviour him she. Of
                                            death to or to being other.</p>
                                        <p className="mb-3">Article nor prepare chicken you him now. Shy merits say
                                            advice ten before lovers innate add. She cordially behaviour can attempted
                                            estimable. Trees delay fancy noise manor do as an small. Felicity now law
                                            securing breeding likewise extended and. Roused either who favour why
                                            ham.</p>
                                        <p className="mb-3">She who arrival end how fertile enabled. Brother she add yet
                                            see minuter natural smiling article painted. Themselves at dispatched
                                            interested insensible am be prosperous reasonably it. In either so spring
                                            wished. Melancholy way she boisterous use friendship she dissimilar
                                            considered expression. Sex quick arose mrs lived. Mr things do plenty others
                                            an vanity myself waited to. Always parish tastes at as mr father dining
                                            at.</p>

                                        <div className="media has-outline-primary align-items-center mt-40">
                                            <img
                                                className="rounded-circle"
                                                src={process.env.PUBLIC_URL + '/assets/images/user-07.jpg'}
                                                alt="" />
                                            <div className="ml-3">
                                                <h5 className="text-blue font-weight-600 mb-1">Pianoforall</h5>
                                                <p>Released: 2/5/2023</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="pills-transcript"
                                        role="tabpanel"
                                        aria-labelledby="pills-transcript-tab">
                                        <p className="mb-3">Supported neglected met she therefore unwilling discovery
                                            remainder. Way sentiments two indulgence uncommonly own. Diminution to
                                            frequently sentiments he connection continuing indulgence. An my exquisite
                                            conveying up defective. Shameless see the tolerably how continued. She
                                            enable men twenty elinor points appear. Whose merry ten yet was men seven
                                            ought balls.</p>
                                        <p className="mb-3">Betrayed cheerful declared end and. Questions we additions
                                            is extremely incommode. Next half add call them eat face. Age lived smile
                                            six defer bed their few. Had admitting concluded too behaviour him she. Of
                                            death to or to being other.</p>
                                        <p className="mb-3">She exposed painted fifteen are noisier mistake led waiting.
                                            Surprise not quick six blind smart out burst. Perfectly on furniture
                                            dejection determine my depending an to. Add short water court fat. Her
                                            bachelor honoured perceive securing but desirous ham required. Questions
                                            deficient acuteness to engrossed as. Entirely led ten humoured greatest and
                                            yourself. Besides ye country on observe. She continue appetite endeavor she
                                            judgment interest the met. For she surrounded motionless fat resolution
                                            may.</p>
                                        <p className="mb-3">Article nor prepare chicken you him now. Shy merits say
                                            advice ten before lovers innate add. She cordially behaviour can attempted
                                            estimable. Trees delay fancy noise manor do as an small. Felicity now law
                                            securing breeding likewise extended and. Roused either who favour why
                                            ham.</p>
                                        <p className="mb-3">She who arrival end how fertile enabled. Brother she add yet
                                            see minuter natural smiling article painted. Themselves at dispatched
                                            interested insensible am be prosperous reasonably it. In either so spring
                                            wished. Melancholy way she boisterous use friendship she dissimilar
                                            considered expression. Sex quick arose mrs lived. Mr things do plenty others
                                            an vanity myself waited to. Always parish tastes at as mr father dining
                                            at.</p>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="pills-exercise"
                                        role="tabpanel"
                                        aria-labelledby="pills-exercise-tab">
                                        <p className="mb-3">Article nor prepare chicken you him now. Shy merits say
                                            advice ten before lovers innate add. She cordially behaviour can attempted
                                            estimable. Trees delay fancy noise manor do as an small. Felicity now law
                                            securing breeding likewise extended and. Roused either who favour why
                                            ham.</p>
                                        <p className="mb-3">Betrayed cheerful declared end and. Questions we additions
                                            is extremely incommode. Next half add call them eat face. Age lived smile
                                            six defer bed their few. Had admitting concluded too behaviour him she. Of
                                            death to or to being other.</p>
                                        <p className="mb-3">Supported neglected met she therefore unwilling discovery
                                            remainder. Way sentiments two indulgence uncommonly own. Diminution to
                                            frequently sentiments he connection continuing indulgence. An my exquisite
                                            conveying up defective. Shameless see the tolerably how continued. She
                                            enable men twenty elinor points appear. Whose merry ten yet was men seven
                                            ought balls.</p>
                                        <p className="mb-3">She exposed painted fifteen are noisier mistake led waiting.
                                            Surprise not quick six blind smart out burst. Perfectly on furniture
                                            dejection determine my depending an to. Add short water court fat. Her
                                            bachelor honoured perceive securing but desirous ham required. Questions
                                            deficient acuteness to engrossed as. Entirely led ten humoured greatest and
                                            yourself. Besides ye country on observe. She continue appetite endeavor she
                                            judgment interest the met. For she surrounded motionless fat resolution
                                            may.</p>
                                        <p className="mb-3">She who arrival end how fertile enabled. Brother she add yet
                                            see minuter natural smiling article painted. Themselves at dispatched
                                            interested insensible am be prosperous reasonably it. In either so spring
                                            wished. Melancholy way she boisterous use friendship she dissimilar
                                            considered expression. Sex quick arose mrs lived. Mr things do plenty others
                                            an vanity myself waited to. Always parish tastes at as mr father dining
                                            at.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 mt-5 mt-lg-0">
                                <div className="widget">
                                    <div className="d-flex align-items-center mb-20">
                                        <h2 className="text-blue font-weight-600">$12.99</h2>
                                        <div className="rating text-primary ml-4">
                                            <span className="font-weight-600">4.3</span>
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                        </div>
                                    </div>

                                    <Link to={'/'} className="btn btn-sm btn-primary initiate-scripts">Buy Now</Link>
                                    <Link to={'/'} className="btn btn-sm btn-secondary ml-2 initiate-scripts">Add to Cart</Link>
                                </div>

                                <div className="widget shadow">
                                    <h4 className="widget-title">Course Curriculum</h4>
                                    <ul className="courser-curriculum widget-list list-unstyled">
                                        <li><Link to={'/'} className="initiate-scripts"><i className="fas fa-caret-right mr-2" />Introduction</Link></li>
                                        <li><Link to={'/'} className="initiate-scripts"><i className="fas fa-caret-right mr-2" />Installation</Link></li>
                                        <li><Link to={'/'} className="initiate-scripts"><i className="fas fa-caret-right mr-2" />Language Overview</Link></li>
                                        <li><Link to={'/'} className="initiate-scripts"><i className="fas fa-caret-right mr-2" />Types and Values</Link></li>
                                        <li><Link to={'/'} className="initiate-scripts"><i className="fas fa-caret-right mr-2" />Conditionals</Link></li>
                                        <li><Link to={'/'} className="initiate-scripts"><i className="fas fa-caret-right mr-2" />Operations</Link></li>
                                        <li><Link to={'/'} className="initiate-scripts"><i className="fas fa-caret-right mr-2" />Loops</Link></li>
                                        <li><Link to={'/'} className="initiate-scripts"><i className="fas fa-caret-right mr-2" />Array</Link></li>
                                        <li><Link to={'/'} className="initiate-scripts"><i className="fas fa-caret-right mr-2" />Function</Link></li>
                                        <li><Link to={'/'} className="initiate-scripts"><i className="fas fa-caret-right mr-2" />Constructor</Link></li>
                                        <li><Link to={'/'} className="initiate-scripts"><i className="fas fa-caret-right mr-2" />Destructor</Link></li>
                                        <li><Link to={'/'} className="initiate-scripts"><i className="fas fa-caret-right mr-2" />Break and Continue</Link></li>
                                    </ul>
                                </div>

                                <div className="widget">
                                    <h4 className="widget-title">Related Courses</h4>
                                    <div className="card course-card shadow mt-10">
                                        <img
                                            className="card-img-top"
                                            src={process.env.PUBLIC_URL + '/assets/images/courses/03.jpg'}
                                            alt="" />

                                        <div className="card-body p-30">
                                            <h5 className="font-weight-600">
                                                <Link
                                                    to={'/'}
                                                    className="text-blue initiate-scripts">
                                                    The Business Intelligence Analyst Course 2023</Link>
                                            </h5>
                                            <p className="mt-2">
                                                She exposed painted fifteen are noisier mistake led waiting surprise.
                                            </p>
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
                                                <Link
                                                    to={'/'}
                                                    className="text-blue initiate-scripts">
                                                    The Business Intelligence Analyst Course 2023</Link>
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
                        </div>
                    </div>
                </section>
            </SectionTwo>
        );
    }
}

export default CourseDetailsOne;