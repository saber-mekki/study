import React from "react";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";

function PageHeaderOne ({title}) {
    
    
    const { t } = useTranslation();

        
        return (
            <section
                className="page-header bg-cover has-overlay"
                style={{backgroundImage: "url(assets/images/page-header-03.jpg)"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 className="section-title text-white font-weight-bold mb-20">{title}</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-transparent justify-content-center p-0 font-weight-600 mb-0">
                                    <li className="breadcrumb-item active" aria-current="page">
                                        <Link to={'/'} className="initiate-scripts">{t("Home")}</Link>
                                    </li>
                                    <li className="breadcrumb-item">{title}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        );
    }


export default PageHeaderOne;