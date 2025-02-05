import React, {Component} from "react";

class BannerThree extends Component {
    render() {
        return (
            <section
                className="banner-1 has-overlay bg-cover"
                style={{backgroundImage: "url(assets/images/banner-image-02.jpg)"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="text-center text-white">
                                <h2 className="text-lg mb-20">The New Way <br /> To Learn University</h2>
                                <p className="h4">However venture pursuit he am mr cordial. Forming musical am
                                    hearingOurselves for attending. Search your Courses.</p>
                                <div
                                    className="input-group newsletter-input-group d-block d-sm-flex mx-auto mt-5 rounded-pill overflow-hidden bg-white"
                                    style={{maxWidth: "500px"}}>
                                    <input
                                        type="email"
                                        className="form-control px-4 border-0"
                                        placeholder="youmail@email.com"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2" />
                                    <div className="input-group-append ml-0">
                                        <button className="btn btn-primary rounded-pill">Subscribe Us</button>
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

export default BannerThree;