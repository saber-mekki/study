import React, {Component} from "react";
import {Link} from "react-router-dom";

class VideoPopup extends Component {
    render() {
        return (
            <section className="section-padding pt-0 bg-light has-white-half">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="text-center">
                                <a
                                    target="_blank" rel="noopener noreferrer"
                                    href="https://www.youtube.com/watch?v=yD7b6R0-LQw"
                                    className="d-block has-overlay has-video-popup tansform-none">
                                    <img
                                        className="img-fluid rounded"
                                        src={process.env.PUBLIC_URL + '/assets/images/video-thumb-3.jpg'}
                                        alt="" />
                                    <img
                                        className="play-btn"
                                        src={process.env.PUBLIC_URL + '/assets/images/video-btn.png'}
                                        alt="" />
                                </a>
                                <h2
                                    className="section-title mt-50 mb-25">
                                    What Some Awesome Parent Says <span className="has-line">About Us</span>
                                </h2>
                                <p className="mb-40">Weddings and any opinions suitable smallest nay. My he houses
                                    or months settle remove <br /> ladies appear. Engrossed suffering supposing he
                                    recommend.</p>
                                <Link to={'/about-one'} className="btn btn-lg btn-secondary rounded-pill">About Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default VideoPopup;