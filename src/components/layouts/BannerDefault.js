import React from "react";
import { useTranslation } from "react-i18next";

function BannerOne() {
  const { t } = useTranslation();

  return (
    <section
      className="banner-1 p-5 has-overlay bg-cover "
      style={{ backgroundImage: "url(assets/images/banner-image-00.jpg)" }}
    >
      <div className="w-100 d-flex flex-row align-items-center justify-content-start">
        <div className="w-100 d-flex flex-row align-items-center justify-content-start">
          <div className="text-white w-100">
            <h2 className="text-lg mb-30">
              <span className="has-line mb-3 line-primary">{t("welcome")}</span>
            </h2>
            <div className="h1 text-white mb-30">{t("explorePlatform")}</div>
            <p
              className="h4 mb-5 px-2 bg-primary text-white rounded"
              style={{ width: "fit-content" }}
            >
              {t("educationMadeEasy")}
            </p>
          </div>
        </div>

        <div className="d-flex flex-column w-50 gap align-items-center mt-5">
          <div
            className="btn mb-5 btn-lg btn-blue rounded-pill"
            style={{ width: "300px" }}
            data-toggle="modal"
            data-target="#signin-modal"
          >
            {t("login")}
          </div>
          <div
            className="btn mb-5 btn-lg btn-blue rounded-pill"
            style={{ width: "300px" }}
            data-toggle="modal"
            data-target="#signup-modal"
          >
            {t("signup")}
          </div>
          <div
            className="btn btn-lg btn-blue rounded-pill"
            style={{ width: "300px" }}
            data-toggle="modal"
            data-target="#signuptutor"
          >
            {t("Become A Tutor")}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerOne;
