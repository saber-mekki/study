import React, {Component} from "react";

class StudentTestimonial extends Component {
    render() {
        return (
            <section
                className="section-padding bg-cover"
                style={{backgroundImage: "url(assets/images/pattern-bg.jpg)"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 position-relative">
                            <div className="owl-carousel student-says-carousel">
                                <div className="text-center bg-white py-5 px-4 px-md-5 rounded shadow">
                                    <img className="mb-30 mx-auto" src={process.env.PUBLIC_URL + '/assets/images/quote.jpg'} alt="" />
                                    <p>Announcing say boy precaution unaffected difficulty alteration him. Above be
                                        would at so going heard. Engaged at village at am equally proceed. Settle
                                        nay length almost ham direct extent. Agreement for listening remainder get
                                        attention law acuteness day. Now whatever surprise resolved elegance
                                        indulged own way outlived. </p>
                                    <div
                                        className="media d-block d-sm-flex text-center text-sm-left justify-content-center mt-25">
                                        <img className="mx-auto mx-sm-0" src={process.env.PUBLIC_URL + '/assets/images/user-01.jpg'} alt="" />
                                        <div className="ml-0 ml-sm-3 mt-3 mt-sm-0">
                                            <h4 className="font-weight-600 text-blue mb-1">James Benzion</h4>
                                            <p>Pittsburgh, USA</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center bg-white py-5 px-4 px-md-5 rounded shadow">
                                    <img className="mb-30 mx-auto" src={process.env.PUBLIC_URL + '/assets/images/quote.jpg'} alt="" />
                                    <p>Announcing say boy precaution unaffected difficulty alteration him. Above be
                                        would at so going heard. Engaged at village at am equally proceed. Settle
                                        nay length almost ham direct extent. Agreement for listening remainder get
                                        attention law acuteness day. Now whatever surprise resolved elegance
                                        indulged own way outlived. </p>
                                    <div
                                        className="media d-block d-sm-flex text-center text-sm-left justify-content-center mt-25">
                                        <img className="mx-auto mx-sm-0" src={process.env.PUBLIC_URL + '/assets/images/user-05.png'} alt="" />
                                        <div className="ml-0 ml-sm-3 mt-3 mt-sm-0">
                                            <h4 className="font-weight-600 text-blue mb-1">JAck Barker</h4>
                                            <p>Pittsburgh, USA</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center bg-white py-5 px-4 px-md-5 rounded shadow">
                                    <img className="mb-30 mx-auto" src={process.env.PUBLIC_URL + '/assets/images/quote.jpg'} alt="" />
                                    <p>Announcing say boy precaution unaffected difficulty alteration him. Above be
                                        would at so going heard. Engaged at village at am equally proceed. Settle
                                        nay length almost ham direct extent. Agreement for listening remainder get
                                        attention law acuteness day. Now whatever surprise resolved elegance
                                        indulged own way outlived. </p>
                                    <div
                                        className="media d-block d-sm-flex text-center text-sm-left justify-content-center mt-25">
                                        <img className="mx-auto mx-sm-0" src={process.env.PUBLIC_URL + '/assets/images/user-06.png'} alt="" />
                                        <div className="ml-0 ml-sm-3 mt-3 mt-sm-0">
                                            <h4 className="font-weight-600 text-blue mb-1">Jesmin Benzion</h4>
                                            <p>Pittsburgh, USA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nav-arrows arrow-vcentered">
                                <span className="fas fa-chevron-left student-says-left" />
                                <span className="fas fa-chevron-right student-says-right" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default StudentTestimonial;