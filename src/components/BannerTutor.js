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
      <div className="container">
        <div className="row align-items-center text-white">
          {/* Text Section */}
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <h2 className="text-lg mb-3">
              <span className="has-line line-primary">{t("welcomeTutor")}</span>
            </h2>
            <div className="h1 mb-3">{t("appreciationMessage")}</div>
            <p className="h4 px-2 bg-primary text-white rounded w-fit-content">
              {t("educationEasy")}
            </p>
          </div>

          {/* Buttons Section */}
          <div className="col-lg-6 col-md-12 d-flex flex-column align-items-center mt-4 mt-lg-0">
            {[
              { to: "/profile/addcourse", text: t("addClass") },
              { to: "/profile/calendar", text: t("waitingMeetings") },
              { to: "/profile/courses", text: t("myCourses") },
              { to: "/profile/classes", text: t("myClasses") },
            ].map((btn, i) => (
              <div key={i} className="w-75 mb-3">
                <Link
                  to={btn.to}
                  className="btn btn-lg btn-blue rounded-pill w-100 text-center"
                >
                  {btn.text}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerTutor;
