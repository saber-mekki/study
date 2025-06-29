import React from "react";
import { useTranslation } from "react-i18next";

const HowItWorksTutors = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-title mb-30">
              {t("howItWorksTutors_title_part1")}{" "}
              <span className="has-line">{t("howItWorksTutors_title_part2")}</span>
            </h2>
          </div>
        </div>
        <div className="row">
          {/* Step 1 */}
          <div className="col-lg-4 col-md-6">
            <div className="how-it-works-item works-item-alt shape-style-1 text-center shadow">
              <img
                className="position-static"
                src={process.env.PUBLIC_URL + "/assets/images/how-it-works-tutors/01.png"}
                alt={t("howItWorksTutors_step1_heading_part1")}
              />
              <h3 className="mt-20 font-weight-600 text-secondary">
                {t("howItWorksTutors_step1_heading_part1")}<br />
                {t("howItWorksTutors_step1_heading_part2")}
              </h3>
              <p className="mt-20">{t("howItWorksTutors_step1_description")}</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-lg-4 col-md-6">
            <div className="how-it-works-item works-item-alt shape-style-2 text-center shadow">
              <img
                className="position-static"
                src={process.env.PUBLIC_URL + "/assets/images/how-it-works-tutors/02.png"}
                alt={t("howItWorksTutors_step2_heading_part1")}
              />
              <h3 className="mt-20 font-weight-600 text-secondary">
                {t("howItWorksTutors_step2_heading_part1")}<br />
                {t("howItWorksTutors_step2_heading_part2")}
              </h3>
              <p className="mt-20">{t("howItWorksTutors_step2_description")}</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-lg-4 col-md-6">
            <div className="how-it-works-item works-item-alt shape-style-1 text-center shadow">
              <img
                className="position-static"
                src={process.env.PUBLIC_URL + "/assets/images/how-it-works-tutors/03.png"}
                alt={t("howItWorksTutors_step3_heading_part1")}
              />
              <h3 className="mt-20 font-weight-600 text-secondary">
                {t("howItWorksTutors_step3_heading_part1")}<br />
                {t("howItWorksTutors_step3_heading_part2")}
              </h3>
              <p className="mt-20">{t("howItWorksTutors_step3_description")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksTutors;
