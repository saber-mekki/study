import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FindTutorSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="find-tutor-section section-padding bg-cover has-overlay text-white"
      style={{ backgroundImage: "url(assets/images/find-tutor.jpg)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="section-title text-white mb-30">
              {t("findTutor_title_part1")} <span className="has-line">{t("findTutor_title_part2")}</span>
              <br /> {t("findTutor_title_part3")}
            </h2>
          </div>
        </div>
        <div className="row">
          {[
            { img: "01.png", key: "subject_math" },
            { img: "02.png", key: "subject_english" },
            { img: "03.png", key: "subject_engineering" },
            { img: "04.png", key: "subject_history" },
            { img: "05.png", key: "subject_social_science" },
            { img: "06.png", key: "subject_computer_science" },
            { img: "07.png", key: "subject_data_science" },
            { img: "08.png", key: "subject_medical" },
          ].map(({ img, key }) => (
            <div className="col-lg-3 col-md-4 col-6" key={key}>
              <div className="mt-40 text-center hover-grayscale">
                <img
                  src={process.env.PUBLIC_URL + `/assets/images/subject/${img}`}
                  alt={t(key)}
                />
                <h3 className="mt-15 font-weight-600">{t(key)}</h3>
              </div>
            </div>
          ))}
          <div className="col-lg-12 text-center mt-80">
            <Link to={"/home-one"} className="btn btn-lg btn-primary rounded-pill initiate-scripts">
              {t("findTutor_button")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindTutorSection;
