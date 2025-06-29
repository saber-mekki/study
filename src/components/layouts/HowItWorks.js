import React from "react";
import { useTranslation } from "react-i18next";
function HowItWorks(){

    const { t } = useTranslation();
  
    return (
      <section className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="section-title">
                {t("howItWorks_title_part1")} <span className="has-line">{t("howItWorks_title_part2")}</span><br />
                {t("howItWorks_title_part3")}
              </h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-6 mt-40">
              <div className="how-it-works-item text-center shadow">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/how-it-works/01.png"}
                  alt={t("step1_heading")}
                />
                <h3 className="mt-20 font-weight-600 text-secondary">
                  {t("step1_heading_part1")} <br /> {t("step1_heading_part2")}
                </h3>
                <p className="mt-20">{t("step1_description")}</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mt-40">
              <div className="how-it-works-item text-center shadow">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/how-it-works/02.png"}
                  alt={t("step2_heading")}
                />
                <h3 className="mt-20 font-weight-600 text-secondary">
                  {t("step2_heading_part1")} <br /> {t("step2_heading_part2")}
                </h3>
                <p className="mt-20">{t("step2_description")}</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mt-40">
              <div className="how-it-works-item text-center shadow">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/how-it-works/03.png"}
                  alt={t("step3_heading")}
                />
                <h3 className="mt-20 font-weight-600 text-secondary">
                  {t("step3_heading_part1")} <br /> {t("step3_heading_part2")}
                </h3>
                <p className="mt-20">{t("step3_description")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }


export default HowItWorks;
