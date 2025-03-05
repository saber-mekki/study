import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function SignUpTutor() {
  const { t } = useTranslation();
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formIndex, setFormIndex] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [check, setcheck] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [Phone, setPhone] = useState("");
  const subjects = [
    "English",
    "Physics",
    "Italian",
    "French",
    "Spanish",
    "Psychology",
    "Business",
    "Geography",
    "Latin",
    "Religious_Studies",
    "Economics",
    "Biology",
    "Chemistry",
    "Maths_Higher_Level",
    "Economic",
  ];

  const handleNext = () => {
    setFormIndex(2);
  };

  const handleBack = () => {
    setFormIndex(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailCheckResponse = await axios.post(
      "http://localhost:5000/api/v1/checkEmail",
      { email }
    );
    if (emailCheckResponse.data.exists) {
      setEmailError(t("emailError"));
      return;
    }
    setEmailError("");

    if (password !== rePassword) {
      setEmailError("");

      setPasswordError(t("passwordError"));
      return;
    }

    setPasswordError("");

    handleNext();
  };

  const handleFinish = async (e) => {
    e.preventDefault();

    if (selectedSubject.length === 0) {
      setSubjectError(t("pleaseSelectSubject"));
      return;
    } else {
      setSubjectError("");
    }

    const data = {
      name,
      email,
      password,
      type_register: "tutor",
      selectedSubjects: selectedSubject,
    };

    try {
      await axios.post("http://localhost:5000/api/v1/addUser", data);

      alert("Form submitted!");
    } catch (error) {
      console.error("Error during user registration:", error);
      alert("There was an error during registration. Please try again.");
    }
  };

  return (
    <div
      className="modal fade rounded"
      id="signuptutor"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered mt-0"
        style={{ maxWidth: "90%", Height: "400px" }}
      >
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h4 className="section-title mb-0">
              <span className="has-line"> {t("registerNow")} </span>
            </h4>
            <button
              onClick={handleBack}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {formIndex === 1 && (
            <div className="modal-body p-3 p-sm-4">
              <form
                method="POST"
                className="SignUptutorForm"
                onSubmit={handleSubmit}
              >
                <div>
                  <p className="mt-20 font-weight-600 text-secondary">
                    {t("welcomeMessage")} <br /> {t("welcomeMessage2")} :
                  </p>
                </div>

                <div className="Inputs">
                  <div className="signForm">
                    <div className="form-group mb-20 col-12">
                      <label className="text-secondary h6 mb-2" htmlFor="fname">
                        {t("yourName")}
                      </label>
                      <input
                        className="form-control shadow-none rounded-sm"
                        type="text"
                        placeholder={t("name")}
                        id="fname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mb-20 col-12">
                      <label className="text-secondary h6 mb-2" htmlFor="fname">
                        {t("phoneNumber")}
                      </label>
                      <input
                        className="form-control shadow-none rounded-sm"
                        type="number"
                        placeholder={t("phoneNumber")}
                        id="fname"
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mb-20 col-12">
                      <label
                        className="text-secondary h6 mb-2"
                        htmlFor="pnumber"
                      >
                        {t("Password*")}
                      </label>
                      <input
                        className="form-control shadow-none rounded-sm"
                        type="password"
                        placeholder={t("password")}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div className="text-danger">{passwordError}</div>
                    </div>
                  </div>

                  <div className="signForm">
                    <div className="form-group mb-20 col-12">
                      <label
                        className="text-secondary h6 mb-2"
                        htmlFor="email2"
                      >
                        {t("email")}
                      </label>
                      <input
                        className="form-control shadow-none rounded-sm"
                        type="email"
                        placeholder={t("Enter your email")}
                        id="email2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {EmailError && (
                        <div className="text-danger mt-2">{EmailError}</div>
                      )}
                    </div>

                    <div className="form-group mb-20 col-12">
                      <label className="text-secondary h6 mb-2 d-block">
                        {t("gender")}
                      </label>
                      <div className="d-flex custom-radio-group rounded-sm">
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customRadio1"
                            name="gender"
                            className="custom-control-input"
                            value="Male"
                            checked={gender === "Male"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio1"
                          >
                            {t("male")}
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customRadio2"
                            name="gender"
                            className="custom-control-input"
                            value="Female"
                            checked={gender === "Female"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio2"
                          >
                            {t("female")}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-20 col-12">
                      <label
                        className="text-secondary h6 mb-2"
                        htmlFor="Repassword"
                      >
                        {t("retypePassword")}*
                      </label>
                      <input
                        className="form-control shadow-none rounded-sm"
                        type="password"
                        placeholder={t("retypePassword")}
                        id="Repassword"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="d-flex justify-content-end w-100"
                  style={{ direction: "ltr" }}
                >
                  <button
                    className="btn btn-primary w-20 rounded-sm mr-5"
                    type="submit"
                    style={{ direction: "ltr" }}
                  >
                    {t("next")} <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </form>
            </div>
          )}

          {formIndex === 2 && (
            <div className="modal-body p-0">
              <form method="POST" className="SignUptutorForm d-flex gap-5">
                <div
                  className="d-flex flex-column p-5 Inputs"
                  style={{ height: "auto", gap: "24px" }}
                >
                  <p>{t("messagesubject")}</p>
                  <div className="d-flex flex-wrap gap-4 justify-content-center align-items-center">
                    {subjects.map((subject) => (
                      <label
                        key={subject}
                        className="d-flex align-items-center gap-3"
                        style={{ width: "240px", maxWidth: "100%" }}
                      >
                        <input
                          type="checkbox"
                          name="subject"
                          value={subject}
                          checked={selectedSubject.includes(subject)}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (selectedSubject.includes(value)) {
                              setSelectedSubject(
                                selectedSubject.filter((item) => item !== value)
                              );
                              setcheck("");
                            } else {
                              if (selectedSubject.length < 3) {
                                setSelectedSubject([...selectedSubject, value]);
                                setcheck("");
                              } else {
                                setcheck(
                                  t("subjectLimitError")

                                );
                              }
                            }
                          }}
                          className="form-check-input"
                          style={{
                            width: "20px",
                            height: "20px",
                            margin: "5px",
                          }} 
                        />
                        <span
                          className={
                            document.documentElement.dir === "rtl"
                              ? "mr-5"
                              : "ml-5"
                          }
                        >
                          {t(subject)}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div
                    className="d-flex flex-column"
                    style={{ width: "100%", height: "40px" }}
                  >
                    {subjectError && (
                      <div className="text-danger m-0">{subjectError}</div>
                    )}
                    {check && <div className="text-danger m-0">{check}</div>}
                  </div>
                </div>
                <div
                  className="d-flex justify-content-between w-100"
                  style={{ direction: "ltr" }}
                >
                  <button
                    className="btn btn-primary w-20 rounded-sm ml-5"
                    type="button"
                    onClick={handleBack}
                    style={{ direction: "ltr" }}
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    {t("back")}
                  </button>
                  <button
                    className="btn btn-primary w-20 rounded-sm"
                    type="submit"
                    onClick={handleFinish}
                    style={{ direction: "ltr" }}
                  >
                    {t("finish")} <i className="fas fa-check ml-2"></i>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUpTutor;
