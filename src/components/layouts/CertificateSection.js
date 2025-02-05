import React, {Component} from "react";
import {Link} from "react-router-dom";

class CertificateSection extends Component {
    render() {
        return (
            <section className="section-padding bg-gray">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h2 className="section-title">Get Your Quality Skills Certificate Through Online Exam</h2>
                            <p className="mt-3 mb-40">Dispatched entreaties boisterous say why stimulated. Certain
                                forbade picture now prevent carried she get see sitting. Up twenty limits as months.
                                Inhabit so perhaps of in to certain.</p>
                            <Link to={'/'} className="btn btn-outline-primary initiate-scripts">Get start now</Link>
                        </div>
                        <div className="col-lg-6">
                            <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/images/certificate.png'} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default CertificateSection;