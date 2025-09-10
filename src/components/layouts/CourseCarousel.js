import React from "react";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";

 const CourseCarousel=()=>  {
    const { t } = useTranslation();

        return (
            <section className="section-padding pb-fix">
                <div className="container">
                    <div className="row align-items-center mb-30">
                        <div className="col-lg-9 text-center text-lg-left">
                            <h2 className="section-title mb-0">{t("Top Course Categories")}</h2>
                        </div>
                        <div className="col-lg-3 mt-4 mt-lg-0 text-center text-lg-right">
                            <div className="nav-arrows">
                                <span className="fas fa-chevron-left course-left" />
                                <span className="fas fa-chevron-right course-right" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="owl-carousel course-carousel">
                                <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                    <img
                                        className="img-fluid border mb-15"
                                        src={process.env.PUBLIC_URL + '/assets/images/course-categories/001.png'}
                                        alt="" />
                                    <span>{t("Design")}</span>
                                </Link>

                                <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                    <img
                                        className="img-fluid border mb-15"
                                        src={process.env.PUBLIC_URL + '/assets/images/course-categories/002.png'}
                                        alt="" />
                                    <span>{t("Development")}</span>
                                </Link>

                                <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                    <img
                                        className="img-fluid border mb-15"
                                        src={process.env.PUBLIC_URL + '/assets/images/course-categories/003.png'}
                                        alt="" />
                                    <span>{t("Personal Development")}</span>
                                </Link>

                                <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                    <img
                                        className="img-fluid border mb-15"
                                        src={process.env.PUBLIC_URL + '/assets/images/course-categories/004.png'}
                                        alt="" />
                                    <span>{t("IT & Software")}</span>
                                </Link>

                                <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                    <img
                                        className="img-fluid border mb-15"
                                        src={process.env.PUBLIC_URL + '/assets/images/course-categories/005.png'}
                                        alt="" />
                                    <span>{t("Marketing")}</span>
                                </Link>

                                <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                    <img
                                        className="img-fluid border mb-15"
                                        src={process.env.PUBLIC_URL + '/assets/images/course-categories/006.png'}
                                        alt="" />
                                    <span>{t("Photography")}</span>
                                </Link>

                                <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                    <img
                                        className="img-fluid border mb-15"
                                        src={process.env.PUBLIC_URL + '/assets/images/course-categories/007.png'}
                                        alt="" />
                                    <span>{t("Lifestyle")}</span>
                                </Link>

                                <Link className="h5 font-weight-600 text-blue text-center d-block mt-30 initiate-scripts" to={'/'}>
                                    <img
                                        className="img-fluid border mb-15"
                                        src={process.env.PUBLIC_URL + '/assets/images/course-categories/008.png'}
                                        alt="" />
                                    <span>{t("Business")}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }


export default CourseCarousel;