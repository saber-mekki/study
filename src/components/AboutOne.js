import React from "react";
import VideoPopup from "./layouts/VideoPopup";

import { useTranslation } from "react-i18next";
import SectionTwo from "./layouts/SectionTwo";


function AboutOne() {
const { t } = useTranslation();
        return (
            <SectionTwo title={t("Aboddut Us")}>
                {/* start of section */}
                <section className="section-padding">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-7 text-center">
                                <img className="img-fluid rounded" src={process.env.PUBLIC_URL + '/assets/images/about-img.jpg'} alt="" />
                            </div>
                            <div className="col-lg-5 mt-5 mt-lg-0">
                                <h2 className="section-title mb-30"> {t("Who")}<span className="has-line">{t("We Are")}</span></h2>
                                <p className="mb-3">
                                   {t("welcome_message")}
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </section>
                {/* end of section */}

                {/* Video Popup section imported from layouts */}
                <VideoPopup />

                {/* start of our vision section */}
                <section className="section-padding">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5">
                                <h2 className="section-title mb-30 has-line">Our <span className="has-line">Vision</span></h2>
                                <p className="mb-3">
                                   {t("Our Vision")}
                                </p>
                               
                            </div>
                            <div className="col-lg-7 mt-5 mt-lg-0 text-center">
                                <img width="49%" src={process.env.PUBLIC_URL + '/assets/images/our-vision-01.jpg'} alt="" />
                                <img width="49%" src={process.env.PUBLIC_URL + '/assets/images/our-vision-02.jpg'} alt="" />
                            </div>
                        </div>
                    </div>
                </section>
                {/* end of our vision section */}

                {/* start of our map section */}
                {/* <section className="section-padding pt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-title">
                                    You are Always <br /> Welcome to <span className="has-line">Our Place</span>
                                </h2>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <a href="#!" className="map-image" target="_blank" rel="noopener noreferrer">
                                    <img src={process.env.PUBLIC_URL + '/assets/images/map-img.jpg'} alt="" />
                                    <span className="map-text h4"><i className="fas fa-external-link-alt mr-2" /> View us on Map</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/* end of our map section */}
            </SectionTwo>
        );
    }


export default AboutOne;