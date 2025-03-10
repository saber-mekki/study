import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageDropdown from "../LanguageDropdown";
import ProfileMenu from "./ProfileMenu";

function HeaderOne() {
  const { t } = useTranslation();
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <header className="bg-white shadow">
      <div className="container-lg">
        <nav className="navbar navbar-expand-xl navbar-dark px-0">
          <Link to={"/home-one"} className="navbar-brand">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/logo-2.png"}
              alt=""
              style={{ height: "49px" }}
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAlt"
            aria-controls="navbarNavAlt"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fas fa-bars" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAlt">
            <ul className="navbar-nav d-flex align-items-center ml-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">{t("Home")}</Link>
              </li>
              <li className="nav-item">
                <Link to={"/about-one"} className="nav-link">{t("About")}</Link>
              </li>
              <li className="nav-item">
                <Link to={"/courses"} className="nav-link">{t("Courses")}</Link>
              </li>
              <li className="nav-item">
                <Link to={"/blog"} className="nav-link">{t("Blog")}</Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/"}
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {t("Pages")} <i className="fas fa-angle-down" />
                </Link>
                <ul className="dropdown-menu">
                  <li><Link to={"/job-board"} className="dropdown-item">Job Board</Link></li>
                  <li><Link to={"/course-details-one"} className="dropdown-item">Course Details 01</Link></li>
                  <li><Link to={"/course-details-two"} className="dropdown-item">Course Details 02</Link></li>
                  <li><Link to={"/blog-details"} className="dropdown-item">Blog Details</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to={"/contact"} className="nav-link">{t("Contact Us")}</Link>
              </li>

              {!isAuthenticated && (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#!"
                      id="connexionDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {t("Connexion")} <i className="fas fa-angle-down" /> 
                    </a>
                    <div className="dropdown-menu" aria-labelledby="connexionDropdown">
                      <a className="dropdown-item" href="#!" data-toggle="modal" data-target="#signin-modal">
                        {t("Sign In")}
                      </a>
                      <a className="dropdown-item" href="#!" data-toggle="modal" data-target="#signup-modal">
                        {t("Sign Up")}
                      </a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a href="#!" className="btn btn-sm btn-blue rounded-pill" data-toggle="modal" data-target="#signuptutor">
                      {t("Become A Tutor")}
                    </a>
                  </li>
                </>
              )}

              {isAuthenticated && <ProfileMenu />}
              <LanguageDropdown />
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default HeaderOne;
