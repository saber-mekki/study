import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TrialSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding pt-0">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 text-center">
            <img
              className="img-fluid"
              src={process.env.PUBLIC_URL + "/assets/images/free-class.png"}
              alt={t("trialSection_image_alt")}
            />
          </div>
          <div className="col-lg-5 mt-5 mt-lg-0">
            <h2 className="section-title mb-30">
              {t("trialSection_title_part1")}{" "}
              <span className="has-line">{t("trialSection_title_part2")}</span>
            </h2>
            <p className="mb-4">{t("trialSection_description")}</p>
            <Link
              to={"/tutors"}
              onClick={() => window.scrollTo(0, 0)}
              className="btn btn-lg btn-secondary rounded-pill initiate-scripts"
            >
              {t("trialSection_button")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrialSection;
