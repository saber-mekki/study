import React, {Component} from "react";
import SectionOne from "./layouts/SectionOne";
import {Link} from "react-router-dom";

class BlogDetails extends Component {
    render() {
        return (
            <SectionOne title={'Blog Details'}>
                <section className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="mb-35">
                                    <img className="img-fluid rounded" src={process.env.PUBLIC_URL + '/assets/images/blog-single.jpg'} alt="" />
                                </div>
                                <div className="post-meta font-weight-500 mb-15">
                                    <span className="mr-4"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                    <span><i className="fas fa-user text-primary mr-2" /> Dispatched</span>
                                </div>
                                <h2 className="text-secondary font-weight-bold mb-4">Dispatched Entreaties boisterous
                                    and say why so stimulated they are?</h2>

                                <div className="mt-3 mb-60">
                                    <p className="mb-3">She exposed painted fifteen are noisier mistake led waiting.
                                        Surprise not quick six blind smart out burst. Perfectly on furniture dejection
                                        determine my depending an to. Add short water court fat. Her bachelor honoured
                                        perceive securing but desirous ham required. Questions deficient acuteness to
                                        engrossed as. Entirely led ten humoured greatest and yourself. Besides ye
                                        country on observe. She continue appetite endeavor she judgment interest the
                                        met. For she surrounded motionless fat resolution may.</p>
                                    <p>Supported neglected met she therefore unwilling discovery remainder. Way
                                        sentiments two indulgence uncommonly own. Diminution to frequently sentiments he
                                        connection continuing indulgence. An my exquisite conveying up defective.
                                        Shameless see the tolerably how continued. She enable men twenty elinor points
                                        appear. Whose merry ten yet was men seven ought balls.</p>

                                    <div
                                        className="blockquote bg-secondary p-30 my-4 text-white rounded text-center">Betrayed
                                        cheerful declared end and. Questions we additions is extremely incommode. Next
                                        half add call them eat face. Age lived smile six defer bed their few. Had
                                        admitting concluded too behaviour him she. Of death to or to being other.
                                    </div>

                                    <p className="mb-3">Article nor prepare chicken you him now. Shy merits say advice
                                        ten before lovers innate add. She cordially behaviour can attempted estimable.
                                        Trees delay fancy noise manor do as an small. Felicity now law securing breeding
                                        likewise extended and. Roused either who favour why ham.</p>
                                    <p className="mb-3">She who arrival end how fertile enabled. Brother she add yet see
                                        minuter natural smiling article painted. Themselves at dispatched interested
                                        insensible am be prosperous reasonably it. In either so spring wished.
                                        Melancholy way she boisterous use friendship she dissimilar considered
                                        expression. Sex quick arose mrs lived. Mr things do plenty others an vanity
                                        myself waited to. Always parish tastes at as mr father dining at.</p>
                                </div>

                                <div className="mb-60">
                                    <h3 className="text-secondary font-weight-600 mb-30">Comments</h3>
                                    <div
                                        className="media has-outline-primary d-block d-sm-flex border-bottom mb-30 pb-30">
                                        <Link to={'/'} className="d-inline-block mr-2 mb-3 mb-md-0">
                                            <img src={process.env.PUBLIC_URL + '/assets/images/user-03.jpg'} className="mr-3 rounded-circle" alt="" />
                                        </Link>
                                        <div className="media-body">
                                            <Link to={'/'}
                                               className="h4 d-inline-block font-weight-600 mb-10 text-secondary">Alexender
                                                Grahambel</Link>
                                            <p><span className="text-black-300 mr-3">April 18, 2023 at 6.25 pm</span>
                                                <Link to={'/'} className="text-primary font-weight-600">Reply</Link></p>

                                            <p className="mt-15">Cras sit amet nibh libero, in gravida nulla. Nulla vel
                                                metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                                                vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
                                                vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                                        </div>
                                    </div>
                                    <div className="media has-outline-primary d-block d-sm-flex">
                                        <div className="d-inline-block mr-2 mb-3 mb-md-0">
                                            <Link to={'/'}>
                                                <img src={process.env.PUBLIC_URL + '/assets/images/user-02.jpg'} className="mr-3 rounded-circle" alt="" />
                                            </Link>
                                        </div>
                                        <div className="media-body">
                                            <Link to={'/'} className="h4 d-inline-block font-weight-600 mb-10 text-secondary">
                                                Nadia Sultana Tisa
                                            </Link>
                                            <p><span className="text-black-300 mr-3">April 18, 2023 at 6.25 pm</span>
                                                <Link to={'/'} className="text-primary font-weight-600">Reply</Link>
                                            </p>
                                            <p className="mt-15">Cras sit amet nibh libero, in gravida nulla. Nulla vel
                                                metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                                                vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
                                                vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-black-200 font-weight-600 mb-30">Leave a Reply</h3>
                                    <form method="POST">
                                        <div className="row">
                                            <div className="form-group mb-30 col-md-12">
                                                <textarea
                                                    className="form-control shadow-none rounded-sm"
                                                    name="comment"
                                                    rows="7"
                                                    required="" />
                                            </div>
                                            <div className="form-group mb-30 col-md-4">
                                                <input
                                                    className="form-control shadow-none rounded-sm"
                                                    type="text"
                                                    placeholder="Name"
                                                    required="" />
                                            </div>
                                            <div className="form-group mb-30 col-md-4">
                                                <input
                                                    className="form-control shadow-none rounded-sm"
                                                    type="email"
                                                    placeholder="Email"
                                                    required="" />
                                            </div>
                                            <div className="form-group mb-30 col-md-4">
                                                <input
                                                    className="form-control shadow-none rounded-sm"
                                                    type="url"
                                                    placeholder="Website" />
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-secondary rounded-pill mt-2"
                                            type="submit">
                                            Comment Now
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="col-lg-4 mt-5 mt-lg-0">
                                <div className="widget">
                                    <form action="#!">
                                        <div className="input-group bg-gray rounded-pill">
                                            <input
                                                type="search"
                                                className="form-control bg-transparent"
                                                placeholder="Search..." />
                                            <div className="input-group-append">
                                                <button
                                                    className="input-group-text bg-transparent"
                                                    type="submit">
                                                    <i className="fas fa-search text-primary" /></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="widget">
                                    <h4 className="widget-title">Recent Post</h4>
                                    <div className="mt-25 px-3">
                                        <div className="post-meta font-weight-500 small mb-2">
                                            <span className="mr-4">
                                                <i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                            <span><i className="fas fa-user text-primary mr-2" /> Dispatched</span>
                                        </div>
                                        <Link to={'/'} className="text-secondary font-weight-600 h5">
                                            She exposed painted fifteen are noisier mistake led waiting
                                        </Link>
                                    </div>
                                    <div className="mt-25 px-3">
                                        <div className="post-meta font-weight-500 small mb-2">
                                            <span className="mr-4"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                            <span><i className="fas fa-user text-primary mr-2" /> Painted</span>
                                        </div>
                                        <Link to={'/'} className="text-secondary font-weight-600 h5">
                                            She exposed painted fifteen are noisier mistake led waiting
                                        </Link>
                                    </div>
                                    <div className="mt-25 px-3">
                                        <div className="post-meta font-weight-500 small mb-2">
                                            <span className="mr-4"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                            <span><i className="fas fa-user text-primary mr-2" /> Dispatched</span>
                                        </div>
                                        <Link to={'/'} className="text-secondary font-weight-600 h5">
                                            Supported neglected met she therefore unwilling discovery remainder.
                                        </Link>
                                    </div>
                                    <div className="mt-25 px-3">
                                        <div className="post-meta font-weight-500 small mb-2">
                                            <span className="mr-4"><i className="far fa-calendar-alt text-primary mr-2" /> 25/02/2023</span>
                                            <span><i className="fas fa-user text-primary mr-2" /> Dispatched</span>
                                        </div>
                                        <Link to={'/'} className="text-secondary font-weight-600 h5">
                                            Melancholy way she boisterous friendship of mine
                                        </Link>
                                    </div>
                                </div>

                                <div className="widget">
                                    <h4 className="widget-title">Archives</h4>
                                    <ul className="widget-list list-unstyled">
                                        <li><Link to={'/'}><i className="fas fa-caret-right mr-2" />April</Link></li>
                                        <li><Link to={'/'}><i className="fas fa-caret-right mr-2" />May</Link></li>
                                        <li><Link to={'/'}><i className="fas fa-caret-right mr-2" />June</Link></li>
                                        <li><Link to={'/'}><i className="fas fa-caret-right mr-2" />Julay</Link></li>
                                        <li><Link to={'/'}><i className="fas fa-caret-right mr-2" />August</Link></li>
                                        <li><Link to={'/'}><i className="fas fa-caret-right mr-2" />September</Link></li>
                                    </ul>
                                </div>

                                <div className="widget">
                                    <h4 className="widget-title">Tags</h4>
                                    <ul className="tag-list list-inline list-unstyled mt-2">
                                        <li className="list-inline-item"><Link to={'/'}>Tutor</Link></li>
                                        <li className="list-inline-item"><Link to={'/'}>Education</Link></li>
                                        <li className="list-inline-item"><Link to={'/'}>Online learning</Link></li>
                                        <li className="list-inline-item"><Link to={'/'}>Teacher</Link></li>
                                        <li className="list-inline-item"><Link to={'/'}>Student</Link></li>
                                        <li className="list-inline-item"><Link to={'/'}>Photography</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionOne>
        );
    }
}

export default BlogDetails;