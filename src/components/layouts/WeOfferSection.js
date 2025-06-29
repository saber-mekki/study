import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class WeOfferSection extends Component {
  render() {
    const { t } = this.props;

    return (
      <section className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <h2 className="section-title">
                {t("what")} <span className="has-line">{t("weOffer")}</span>
              </h2>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="mt-40 text-center hover-grayscale">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/we-offer/05.png"}
                  alt={t("examPrep")}
                />
                <h3 className="mt-20 font-weight-600 text-secondary">{t("examPrep")}</h3>
                <p className="mt-20">{t("examPrepDesc")}</p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="mt-40 text-center hover-grayscale">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/we-offer/02.png"}
                  alt={t("onlineTutoring")}
                />
                <h3 className="mt-20 font-weight-600 text-secondary">{t("onlineTutoring")}</h3>
                <p className="mt-20">{t("onlineTutoringDesc")}</p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="mt-40 text-center hover-grayscale">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/we-offer/03.png"}
                  alt={t("groupTutoring")}
                />
                <h3 className="mt-20 font-weight-600 text-secondary">{t("groupTutoring")}</h3>
                <p className="mt-20">{t("groupTutoringDesc")}</p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="mt-40 text-center hover-grayscale">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/we-offer/04.png"}
                  alt={t("packageTutoring")}
                />
                <h3 className="mt-20 font-weight-600 text-secondary">{t("packageTutoring")}</h3>
                <p className="mt-20">{t("packageTutoringDesc")}</p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="mt-40 text-center hover-grayscale">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/we-offer/05.png"}
                  alt={t("homeTutoring")}
                />
                <h3 className="mt-20 font-weight-600 text-secondary">{t("homeTutoring")}</h3>
                <p className="mt-20">{t("homeTutoringDesc")}</p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="mt-40 text-center hover-grayscale">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/we-offer/06.png"}
                  alt={t("offlineTutoring")}
                />
                <h3 className="mt-20 font-weight-600 text-secondary">{t("offlineTutoring")}</h3>
                <p className="mt-20">{t("offlineTutoringDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation()(WeOfferSection);
