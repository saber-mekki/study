import React from "react";
import { useTranslation } from "react-i18next";

const MobileAppSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <h2 className="section-title mb-30">
              {t("mobileApp_title_part1")} <span className="has-line">{t("mobileApp_title_part2")}</span>
            </h2>
            <p className="mb-4">{t("mobileApp_description")}</p>
            
          </div>
          <div className="col-lg-7 mt-5 mt-lg-0 text-center">
            <img
              className="img-fluid"
              src={process.env.PUBLIC_URL + "/assets/images/mobile-app.png"}
              alt={t("mobileApp_alt")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
