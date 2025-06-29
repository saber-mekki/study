import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function BannerTutor() {
  const { t } = useTranslation();

  return (
    <section
      className="banner-1 p-5 has-overlay bg-cover"
      style={{ backgroundImage: "url(assets/images/banner-image-00.jpg)" }}
    >
      <div className="w-100 d-flex flex-row align-items-center justify-content-start">
        <div className="text-white w-100">
          <h2 className="text-lg mb-30">
            <span className="has-line line-primary">{t("welcomeTutor")}</span>
          </h2>
          <div className="h1 text-white mb-30">{t("appreciationMessage")}</div>
          <p
            className="h4 px-2 bg-primary text-white rounded"
            style={{ width: "fit-content" }}
          >
            {t("educationEasy")}
          </p>
        </div>

        <div className="d-flex flex-column w-50 align-items-center mt-5">
          <div className="w-75 mb-3">
            <Link to="/profile/addcourse" className="btn btn-lg btn-blue rounded-pill w-100">
              {t("addClass")}
            </Link>
          </div>
          <div className="w-75 mb-3">
            <Link to="/profile/calendar" className="btn btn-lg btn-blue rounded-pill w-100">
              {t("waitingMeetings")}
            </Link>
          </div>
          <div className="w-75 mb-3">
            <Link to="/profile/courses" className="btn btn-lg btn-blue rounded-pill w-100">
              {t("myCourses")}
            </Link>
          </div>
          <div className="w-75">
            <Link to="/profile/classes" className="btn btn-lg btn-blue rounded-pill w-100">
              {t("myClasses")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerTutor;
