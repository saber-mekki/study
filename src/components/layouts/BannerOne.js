import React from "react";
import { useTranslation } from "react-i18next";

function BannerOne() {
  const { t } = useTranslation();

  return (
    <section
      className="banner-1 p-5 has-overlay bg-cover"
      style={{ backgroundImage: "url(assets/images/banner-image-00.jpg)" }}
    >
      <div className="">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 col-sm-8 text-center text-md-left">
            <div className="text-white">
              <h2 className="text-lg mb-30">
                {t("findThe")}{" "}
                <span className="has-line line-primary">
                  {t("perfectTutor")}
                </span>{" "}
                {t("forOnline")} &{" "}
                <span className="has-line">{t("offline")}</span>
              </h2>
              <p
                className="h4 px-2 bg-primary text-white rounded"
                style={{ width: "fit-content" }}
              >
                {t("educationEasy")}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-sm-10 mt-5 mt-md-0">
            <form className="search-form rounded">
              <div className="row">
                <div className="col-lg-6">
                  <select name="subject" className="form-select">
                    <option value="">{t("selectSubject")}</option>
                    <option value="All">{t("all")}</option>
                    <option value="Development">{t("development")}</option>
                    <option value="Design">{t("design")}</option>
                    <option value="Marketing">{t("marketing")}</option>
                    <option value="Lifestyle">{t("lifestyle")}</option>
                    <option value="IT & Software">{t("itSoftware")}</option>
                    <option value="Personal">{t("personal")}</option>
                    <option value="Business">{t("business")}</option>
                    <option value="Music">{t("music")}</option>
                  </select>
                </div>

                <div className="col-lg-6">
                  <select name="country" className="form-select" required>
                    <option value="">{t("selectCountry")}</option>
                    <option value="Tunisia">{t("tunisia")}</option>
                    <option value="Germany">{t("germany")}</option>
                    <option value="USA">{t("usa")}</option>
                    <option value="UK">{t("uk")}</option>
                  </select>
                </div>

                <div className="col-lg-6">
                  <select name="language" className="form-select" required>
                    <option value="">{t("selectLanguage")}</option>
                    <option value="English">{t("english")}</option>
                    <option value="Detush">{t("detush")}</option>
                    <option value="Arabic">{t("arabic")}</option>
                    <option value="French">{t("french")}</option>
                  </select>
                </div>

                <div className="col-lg-6">
                  <select name="price" className="form-select">
                    <option value="">{t("pricePerHour")}</option>
                    <option value="0-10">0 - 10 USD</option>
                    <option value="10-20">10 - 20 USD</option>
                    <option value="20-30">20 - 30 USD</option>
                    <option value="30-50">30 - 50 USD</option>
                    <option value="50+">50+ USD</option>
                  </select>
                </div>

                <div className="col-lg-6">
                  <select name="gender" className="form-select">
                    <option value="">{t("selectGender")}</option>
                    <option value="Male">{t("male")}</option>
                    <option value="Female">{t("female")}</option>
                  </select>
                </div>

                <div className="col-lg-6">
                  <select name="type" className="form-select">
                    <option value="">{t("selectType")}</option>
                    <option value="courses">{t("teachingCourses")}</option>
                    <option value="meetings">{t("onlineMeetings")}</option>
                  </select>
                </div>

                <div className="col-lg-12 mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill w-100"
                  >
                    {t("searchTutor")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerOne;
