import React , { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import SectionTwo from "./layouts/SectionTwo";

function Contact() {
    const { t } = useTranslation();
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
      
        emailjs.sendForm(
            "service_ldkhhmc",
            "template_anzb1re",
            form.current,
            "nqsVC40GNulmPrwi-"
        )
        .then((result) => {
            alert("Message sent successfully!");
            e.target.reset();
        }, (error) => {
            alert("Failed to send message, try again.",error);
        });
    };

        return (
            <SectionTwo title={t("Contact")}>
                <section className="section-padding bg-gray">
                    <div className="container">
                        <div className="row justify-content-between">
                        <div className="col-lg-7 order-1 order-lg-0">
                            <div className="mb-5">
                                <h2 className="text-secondary font-weight-bold mb-2">{t("Send a message")}</h2>
                                <p>{t("email privacy")}
                                    <br /> {t("required fields")}</p>
                            </div>
                            <form ref={form} onSubmit={sendEmail}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-30">
                                            <label htmlFor="name">{t("name")}*</label>
                                            <input type="text" name="name" className="form-control rounded-sm" placeholder={t("name")} required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-30">
                                            <label htmlFor="email">{t("email")}*</label>
                                            <input type="email" name="email" className="form-control rounded-sm" placeholder="exemple@gmail.com" required />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-30">
                                            <label htmlFor="subject">{t("subject")}</label>
                                            <input type="text" name="subject" className="form-control rounded-sm" placeholder={t("know_course")} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-30">
                                            <label htmlFor="message">{t("message")}</label>
                                            <textarea name="message" className="form-control rounded-sm" rows="5" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-primary rounded-sm">{t("Send a message")}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                            <div className="col-xl-4 col-lg-5 mb-5 mb-lg-0 order-0 order-lg-1">
                                <div className="mb-5">
                                    <h2 className="text-secondary font-weight-bold mb-2">{t("contact_info")}</h2>
                                    <p>{t("contact_welcome_message")}. <br /> {t("contact_glad_message")}.</p>
                                </div>
                                <div
                                    className="shadow-sm p-20 mt-4 rounded-sm bg-white d-block d-sm-flex align-items-center">
                                    <i className="fas fa-phone fa-2x text-primary" />
                                    <div className="ml-sm-4 mt-3 mt-sm-0">
                                        <h4 className="text-secondary font-weight-600 mb-1">{t("contact_details")}</h4>
                                        <p>{t("phone")} <a href="tel:+21629438905" className="text-dark">+4915756380335</a> </p>
                                        <p>{t("mail")} <a href="saber.mekki6@gmail.com" className="text-dark">saber.mekki6@gmail.com</a></p>
                                    </div>
                                </div>
                                <div
                                    className="shadow-sm p-20 mt-4 rounded-sm bg-white d-block d-sm-flex align-items-center">
                                    <i className="fas fa-map-marked-alt fa-2x text-primary" />
                                    <div className="ml-sm-4 mr-2 mt-3 mt-sm-0">
                                        <h4 className="text-secondary font-weight-600 mb-1">{t("location")}</h4>
                                        <p>{t("Germany")}</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-title">You are Always <br /> Welcome to <span className="has-line">Our Place</span>
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
            </SectionTwo>
        );
    }


export default Contact;