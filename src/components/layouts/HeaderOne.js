import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";

import ChatBox from "../chatBox";
import LanguageDropdown from "../LanguageDropdown";
import ProfileMenu from "./ProfileMenu";
import { NotificationsDropdown } from "./NotificationDropdown";
import Status from "../../Status";

import { useCart } from "../context/CartContext"; 

import "./HeaderOne.css";

function HeaderOne() {
  const { t } = useTranslation();
  const isAuthenticated = localStorage.getItem("authToken");

  const { cart } = useCart(); 

  useEffect(() => {
    document.querySelectorAll(".dropdown-toggle").forEach((dropdown) => {
      new bootstrap.Dropdown(dropdown);
    });
  }, []);

  return (
    <header className="bg-white shadow">
      <Status />
      <div className="container-lg">
        <nav className="navbar navbar-expand-xl navbar-dark px-0">
          <Link to={"/home-one"} className="navbar-brand">
            <span className="text-logo stacked" aria-label="Edix Academy">
              <span className="line top">Edix</span>
              <span className="line bottom">Academy</span>
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAlt"
            aria-controls="navbarNavAlt"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fas fa-bars" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAlt">
            <ul className="navbar-nav d-flex align-items-center ml-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  {t("Home")}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/about-Two"} className="nav-link">
                  {t("About Us")}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/courses"} className="nav-link">
                  {t("Courses")}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/tutors"} className="nav-link">
                  {t("Tutors")}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/blog"} className="nav-link">
                  {t("Blog")}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/contact"} className="nav-link">
                  {t("Contact Us")}
                </Link>
              </li>


              {!isAuthenticated && (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#!"
                      id="connexionDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {t("Connexion")} <i className="fas fa-angle-down" />
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="connexionDropdown"
                    >
                      <a
                        className="dropdown-item"
                        href="#!"
                        data-toggle="modal"
                        data-target="#signin-modal"
                      >
                        {t("Sign In")}
                      </a>
                      <a
                        className="dropdown-item"
                        href="#!"
                        data-toggle="modal"
                        data-target="#signup-modal"
                      >
                        {t("Sign Up")}
                      </a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="btn btn-sm btn-blue rounded-pill"
                      data-toggle="modal"
                      data-target="#signuptutor"
                    >
                      {t("Become A Tutor")}
                    </a>
                  </li>
                </>
              )}

              {isAuthenticated && <ProfileMenu />}
              {isAuthenticated && <NotificationsDropdown />}
              <LanguageDropdown />
              {isAuthenticated && <ChatBox />}

              {isAuthenticated &&  <li className="nav-item">
                <Link to={"/cart"} className="nav-link position-relative">
                  <i className="fas fa-shopping-cart fa-lg"></i>
                  {cart.length > 0 && (
                    <span
                      className="badge badge-danger position-absolute"
                      style={{ top: "-5px", right: "-10px", fontSize: "12px" }}
                    >
                      {cart.length}
                    </span>
                  )}
                </Link>
              </li>}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default HeaderOne;
