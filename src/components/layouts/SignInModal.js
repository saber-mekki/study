import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function SignInModal() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  let type_register = "";
  const { t } = useTranslation();
  const resetForm = () => {
    setEmail("");

    setPassword("");

    setPasswordError("");
    setEmailError("");
  };
  const handleTabClick = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        { email, password, type_register }
      );

      const token = response.data.tokens.accessToken;
      const decodedToken = jwtDecode(token);
      const user_name = decodedToken.user_name;

      Cookies.set("role", role);
      Cookies.set("name", user_name);

      localStorage.setItem("authToken", token);

      if (
        role !== response.data.result.type_register &&
        response.data.result.type_register !== "admin"
      ) {
        setPasswordError(t("Role mismatch. Please login as the correct role."));
        return;
      }

      document.querySelector("#signin-modal").classList.remove("show");
      document.body.classList.remove("modal-open");
      document.querySelector(".modal-backdrop")?.remove();
      document.body.style.backdropFilter = "none";
      document.body.style.filter = "none";

      setTimeout(() => {
        window.location.href =
          response.data.result.type_register === "admin" ? "/dash/admin" : "/s";
      }, 100);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setEmailError(t("Email not found. Please check."));
        } else if (err.response.status === 401) {
          setPasswordError(t("Invalid password. Please try again."));
        } else {
          setPasswordError(t("An error occurred. Please try again."));
        }
      } else {
        setPasswordError(t("Server not responding. Please try later."));
      }
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target.id === "signin-modal") resetForm();
      }}
      className="modal fade rounded"
      id="signin-modal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title text-secondary font-weight-600">
              {t("Welcome back")}
            </h4>
            <button
              onClick={() => resetForm()}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body p-3 p-sm-4">
            <ul
              className="nav nav-pills nav-justified tab-nav"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link ${role === "student" ? "active" : ""}`}
                  id="student-tab"
                  data-toggle="tab"
                  href="#student"
                  role="tab"
                  aria-controls="student"
                  aria-selected={role === "student"}
                  onClick={() => handleTabClick("student")}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/guardian.png"}
                    className="mr-2"
                    alt=""
                    style={{ height: "45px" }}
                  />
                  {t("Login")} <br /> {t("Student")}
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link ${role === "tutor" ? "active" : ""}`}
                  id="tutor-tab"
                  data-toggle="tab"
                  href="#tutor"
                  role="tab"
                  aria-controls="tutor"
                  aria-selected={role === "tutor"}
                  onClick={() => handleTabClick("tutor")}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/tutor.png"}
                    className="mr-2"
                    alt=""
                    style={{ height: "45px" }}
                  />
                  {t("Login")}
                  <br />
                  {t("Tutor")}
                </a>
              </li>
            </ul>

            <form onSubmit={handleSubmit} className="row">
              <div className="form-group col-12">
                <label
                  className="text-secondary h6 font-weight-600 mb-2"
                  htmlFor="email"
                >
                  {t("Email Address*")}
                </label>
                <input
                  placeholder={`${role}@gmail.com`}
                  className="form-control shadow-none rounded-sm"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && (
                  <div className="center-error">
                    <div className="text-danger">{emailError}</div>
                  </div>
                )}
              </div>

              <div className="form-group mb-20 col-12">
                <label
                  className="text-secondary h6 font-weight-600 mb-2"
                  htmlFor="passwordSignIn"
                >
                  {t("Password*")}
                </label>
                <input
                  className="form-control shadow-none rounded-sm"
                  type="password"
                  id="passwordSignIn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordError && (
                  <div className="center-error">
                    <div className="text-danger">{passwordError}</div>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="forgot-password"
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#forget"
              >
                {t("Forgot password?")}
              </button>

              <div className="form-group col-12">
                <button
                  style={{ marginBottom: "15px" }}
                  className={`btn ${role === "student" ? "btn-blue" : "btn-primary"
                    } w-100 rounded-sm`}
                  type="submit"
                >
                  {t("Sign In")}
                </button>

                <button
                  className={`btn ${role === "student" ? "btn-blue" : "btn-primary"
                    } w-100 rounded-sm`}
                  type="submit"
                  data-toggle="modal"
                  data-target="#signup-modal"
                  data-dismiss="modal"
                >
                  {t("Sign Up")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
