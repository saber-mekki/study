import React from "react";
import SectionTwo from "./layouts/SectionTwo";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutTwo = () => {
  const { t } = useTranslation();

  return (
    <SectionTwo title={t('aboutUs_title')}>
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center">
              <img
                className="img-fluid rounded pr-lg-3"
                src={process.env.PUBLIC_URL + '/assets/images/tms.png'}
                alt={t('aboutUs_altImage')}
              />
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <h2 className="section-title mb-30">
                {t('aboutUs_title_part1')} <br /> {t('aboutUs_title_part2')} <br /> {t('aboutUs_title_part3')}
              </h2>
              <p className="mb-4">{t('aboutUs_description')}</p>
              <ul className="list-unstyled">
                <li className="mb-2"><i className="fas fa-star mr-2 text-primary" />
                  {t('aboutUs_feature1')}
                </li>
                <li className="mb-2"><i className="fas fa-star mr-2 text-primary" />
                  {t('aboutUs_feature2')}
                </li>
                <li><i className="fas fa-star mr-2 text-primary" />
                  {t('aboutUs_feature3')}
                </li>
              </ul>
              <div className="media has-outline-primary align-items-center mt-35">
                <img
                  className="rounded-circle"
                  src={process.env.PUBLIC_URL + '/assets/images/user-07.jpg'}
                  alt={t('aboutUs_authorAlt')}
                />
                <div className="ml-3">
                  <h5 className="text-blue font-weight-600 mb-1">{t('aboutUs_authorName')}</h5>
                  <p>{t('aboutUs_authorDate')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="pt-60 pb-30 counter-section text-white text-center">
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-sm-6 mb-30">
                    <h2 className="h1 font-weight-600 mb-2 text-primary jsCounter">9456</h2>
                    <p className="h5 pl-5 font-weight-600 mb-2 text-primary jsCounter">{t('aboutUs_counter1')}</p>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 mb-30">
                    <h2 className="h1 font-weight-600 mb-2 text-primary jsCounter">154</h2>
                    <p className="h5 pl-5 font-weight-600 mb-2 text-primary jsCounter">{t('aboutUs_counter2')}</p>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 mb-30">
                    <h2 className="h1 font-weight-600 mb-2 text-primary jsCounter">2563</h2>
                    <p className="h5 pl-5 font-weight-600 mb-2 text-primary jsCounter">{t('aboutUs_counter3')}</p>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 mb-30">
                    <h2 className="h1 font-weight-600 mb-2 text-primary jsCounter">2817</h2>
                    <p className="h5 pl-5 font-weight-600 mb-2 text-primary jsCounter font-weight-600">{t('aboutUs_counter4')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">{t('aboutUs_certificate_title')}</h2>
              <p className="mt-3 mb-40">{t('aboutUs_certificate_description')}</p>
              <Link to={'/about-one'} className="btn btn-outline-primary initiate-scripts">{t('aboutUs_getStarted')}</Link>
            </div>
            <div className="col-lg-6">
              <img
                className="img-fluid"
                src={process.env.PUBLIC_URL + '/assets/images/certificate.png'}
                alt={t('aboutUs_certificate_alt')}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center mb-50">
            <div className="col-lg-12 text-center">
              <h2 className="section-title mb-0">{t('aboutUs_team_title')}</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            {[
              {
                img: '/assets/images/instructors/03.jpg',
                alt: t('aboutUs_team_member1_alt'),
                name: t('aboutUs_team_member1_name'),
                role: t('aboutUs_team_member1_role'),
                facebook: "https://www.facebook.com/souhail.leaderi",
                twitter: "#",
                linkedin: "#",
              },
              {
                img: '/assets/images/instructors/01.jpg',
                alt: t('aboutUs_team_member2_alt'),
                name: t('aboutUs_team_member2_name'),
                role: t('aboutUs_team_member2_role'),
                facebook: "#",
                twitter: "#",
                linkedin: "#",
              },
              {
                img: '/assets/images/instructors/02.jpg',
                alt: t('aboutUs_team_member3_alt'),
                name: t('aboutUs_team_member3_name'),
                role: t('aboutUs_team_member3_role'),
                facebook: "#",
                twitter: "#",
                linkedin: "#",
              },
            ].map(({ img, alt, name, role, facebook, twitter, linkedin }, idx) => (
              <div key={idx} className="col-md-4 col-sm-6">
                <div className="card text-center border-0 mt-30">
                  <div className="hover-grayscale">
                    <img
                      src={process.env.PUBLIC_URL + img}
                      alt={alt}
                      className="card-img-top"
                    />
                  </div>
                  <div className="card-body px-0 pb-0">
                    <h4 className="font-weight-600 text-blue mb-1">{name}</h4>
                    <h6>{role}</h6>
                    <ul className="social-icons list-unstyled mt-3">
                      <li><a href={facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" /></a></li>
                      <li><a href={twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a></li>
                      <li><a href={linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionTwo>
  );
};

export default AboutTwo;
