import React from "react";
import { useTranslation } from "react-i18next";

function BannerOne() {
  const { t } = useTranslation();

  return (
    <section
      className="banner-1 p-5 has-overlay bg-cover"
      style={{ backgroundImage: "url(assets/images/banner-image-00.jpg)" }}
    >
      <div className="container">
        <div className="row align-items-center text-white">
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <h2 className="text-lg mb-3">
              <span className="has-line mb-3 line-primary">{t("welcome")}</span>
            </h2>
            <div className="h1 mb-3">{t("explorePlatform")}</div>
            <p className="h4 mb-4 px-2 bg-primary text-white rounded w-fit-content">
              {t("educationMadeEasy")}
            </p>
          </div>
          <div className="col-lg-6 col-md-12 d-flex flex-column align-items-center mt-3 mt-lg-0">
            {[
              { label: t("login"), target: "#signin-modal" },
              { label: t("signup"), target: "#signup-modal" },
              { label: t("Become A Tutor"), target: "#signuptutor" },
            ].map((btn, i) => (
              <button
                key={i}
                className="btn btn-lg btn-blue rounded-pill mb-4 w-75 w-md-100"
                data-toggle="modal"
                data-target={btn.target}
                type="button"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerOne;
