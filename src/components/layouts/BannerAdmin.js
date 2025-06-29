import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function BannerOne() {
  const { t } = useTranslation();

  return (
    <section
      className="banner-1 p-5 has-overlay bg-cover"
      style={{ backgroundImage: "url(assets/images/banner-image-00.jpg)" }}
    >
      <div className="w-100 d-flex flex-row align-items-center justify-content-start">
        <div className="text-white w-100">
          <h2 className="text-lg mb-30">
            <span className="has-line line-primary">{t("welcomeAdmin2")}</span>
          </h2>
          <div className="h1 text-white mb-30">
            {t("adminGuidanceMessage")}
          </div>
          <p
            className="h4 px-2 bg-primary text-white rounded"
            style={{ width: "fit-content" }}
          >
            {t("educationEasy")}
          </p>
        </div>

        <div className="d-flex flex-column w-50 align-items-center mt-5">
          <div className="w-75 mb-3">
            <Link to="/dash?section=dashboard" className="btn btn-lg btn-blue rounded-pill w-100">
              {t("dashboard")}
            </Link>
          </div>
          <div className="w-75 mb-3">
            <Link to="/dash?section=All Users waiting" className="btn btn-lg btn-blue rounded-pill w-100">
              {t("waitingUsers")}
            </Link>
          </div>
          <div className="w-75">
            <Link to="/dash?section=All Formations" className="btn btn-lg btn-blue rounded-pill w-100">
              {t("waitingCourses")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerOne;
