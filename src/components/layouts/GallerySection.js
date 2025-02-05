import React, {Component} from "react";
import {Link} from "react-router-dom";

class GallerySection extends Component {
    render() {
        return (
            <section className="section-padding">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-4">
                            <h2 className="section-title mb-4">Visit Our Campus With Image Gallery</h2>
                            <p>Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent
                                carried she get see sitting.</p>
                            <div className="nav-arrows mt-4 mt-lg-5">
                                <span className="fas fa-chevron-left gallery-left active" />
                                <span className="fas fa-chevron-right gallery-right" />
                            </div>
                        </div>
                        <div className="col-lg-7 mt-4 mt-lg-0">
                            <div className="owl-carousel image-gallery">
                                <img className="img-fluid rounded" src={process.env.PUBLIC_URL + '/assets/images/gallery/01.jpg'} alt="" />
                                <img className="img-fluid rounded" src={process.env.PUBLIC_URL + '/assets/images/gallery/02.jpg'} alt="" />
                                <img className="img-fluid rounded" src={process.env.PUBLIC_URL + '/assets/images/gallery/03.jpg'} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-115">
                        <div className="col-md-12">
                            <div className="cta-section section-padding has-overlay bg-cover"
                                 style={{backgroundImage: "url(assets/images/cta-bg.jpg)"}}>
                                <div className="row justify-content-center">
                                    <div className="col-lg-6 text-white text-center">
                                        <h2 className="h1 font-weight-bold mb-20">50% Offer For Very First 50 Students</h2>
                                        <p className="mb-30">Dispatched entreaties boisterous say why stimulated.
                                            Certain forbade picture now prevent carried.</p>
                                        <Link to={'/'} className="btn btn-light rounded-pill initiate-scripts">Become A Student</Link>
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

export default GallerySection;