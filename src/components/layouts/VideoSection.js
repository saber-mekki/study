import React, {Component} from "react";

class VideoSection extends Component {
    render() {
        return (
            <section
                className="video-popup-section has-overlay bg-cover section-padding pb-0 mb-80"
                style={{backgroundImage: "url(assets/images/video-bg.jpg)"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="text-center text-white">
                                <h2 className="h1 font-weight-bold">Intro Video</h2>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=yD7b6R0-LQw"
                                   className="d-block has-overlay has-video-popup">
                                    <img className="img-fluid rounded" src={process.env.PUBLIC_URL + '/assets/images/video-thumb.jpg'} alt="" />
                                    <img className="play-btn" src={process.env.PUBLIC_URL + '/assets/images/video-btn.png'} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default VideoSection;