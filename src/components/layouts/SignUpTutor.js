import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PasswordStrengthBar from "react-password-strength-bar";

function SignUpTutor() {
  const { t } = useTranslation();
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formIndex, setFormIndex] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [check, setcheck] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [phone_number, setPhone] = useState("");

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
  ];
  const [idFile, setIdFile] = useState(null);
  const [degreeFile, setDegreeFile] = useState(null);
  const [degree, setDegree] = useState("");

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleBack = () => {
    setFormIndex(1);
  };
  const handleStepChange = (newStep) => {
    if (newStep >= 1 && newStep <= 3) {
      setFormIndex(newStep);
    }
  };
  const handleSubmitStep1 = async (e) => {
    e.preventDefault();

    // Check if email already exists
    try {
      const emailCheckResponse = await axios.post(
        "http://localhost:5000/api/v1/checkEmail",
        { email }
      );
      if (emailCheckResponse.data.exists) {
        setEmailError(t("emailError"));
        return;
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }

    // Check password match
    if (password !== rePassword) {
      setPasswordError(t("passwordError"));
      return;
    } else {
      setPasswordError("");
    }

    // Move to step 2 after successful validation
    handleStepChange(2);
  };

  const handleSubmitStep2 = (e) => {
    e.preventDefault();

    if (selectedSubject.length === 0) {
      setSubjectError(t("pleaseSelectSubject"));
      return;
    } else {
      setSubjectError("");
    }

    // Move to step 3 after successful validation
    handleStepChange(3);
  };

  const handleClose = (e) => {
    setFormIndex(1);

    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRePassword("");
    setSelectedSubject([]);
    setIdFile(null);
    setDegreeFile(null);
  };

  const handleFinish = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      type_register: "tutor",
      phone_number,
      gender,
    };

    try {
      await axios.post("http://localhost:5000/api/v1/addUser", data);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRePassword("");
      setSelectedSubject([]);
      setIdFile(null);
      setDegreeFile(null);
      setFormIndex(4);
    } catch (error) {
      console.error("Error during user registration:", error);
      alert(t("registrationError"));
    }
  };

  return (
    <div
      className=" mt-25 modal  fade rounded "
      id="signuptutor"
      tabIndex="-1"
      aria-hidden="true"
      style={{ maxHeight: "92vh" }}
    >
      <div
        className="modal-dialog modal-dialog-centered mt-0"
        style={{ maxWidth: "50%" }}
      >
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h2 className="mb-0 text-secondary">
              <span>{t("registerNow")}</span>
            </h2>

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
            <div className="modal-body">
              <form
                method="POST"
                className="SignUptutorForm"
                onSubmit={handleSubmitStep1}
              >
                <div>
                  <p className="mt-0 text-secondary fw-bold">
                    {t("welcomeMessage")} <br /> {t("welcomeMessage2")} :
                  </p>
                </div>

                <div className="Inputs">
                  <div className="signForm">
                    <div className="form-group mb-2 col-12">
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
                    <div className="form-group mb-2 col-12">
                      <label
                        className="text-secondary h6 mb-2"
                        htmlFor="fnumber"
                      >
                        {t("phoneNumber")}
                      </label>
                      <input
                        className="form-control shadow-none rounded-sm"
                        type="number"
                        placeholder={t("phoneNumber")}
                        id="fname"
                        value={phone_number}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mb-2 col-12">
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
                      <PasswordStrengthBar password={password} />
                      <div className="text-danger">{passwordError}</div>
                    </div>
                  </div>

                  <div className="signForm">
                    <div className="form-group mb-2 col-12">
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

                    <div className="form-group mb-2 col-12">
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
                            checked={gender === "male"}
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
                            checked={gender === "female"}
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
              <form
                method="POST"
                className="SignUptutorForm d-flex gap-5"
                onSubmit={handleSubmitStep2}
              >
                <div
                  className="d-flex flex-column p-0 Inputs"
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
                            setSubjectError("");
                            setcheck("");
                            const value = e.target.value;
                            if (selectedSubject.includes(value)) {
                              setSelectedSubject(
                                selectedSubject.filter((item) => item !== value)
                              );
                              setcheck("");
                            } else {
                              if (selectedSubject.length < 3) {
                                setSelectedSubject([...selectedSubject, value]);
                              } else {
                                setcheck(t("subjectLimitError"));
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
                    onClick={() => handleStepChange(formIndex - 1)}
                    style={{ direction: "ltr" }}
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    {t("back")}
                  </button>
                  <button
                    className="btn btn-primary w-20 rounded-sm"
                    type="button"
                    onClick={() => {
                      if (selectedSubject.length === 0) {
                        setSubjectError(t("pleaseSelectSubject"));
                      } else {
                        handleStepChange(formIndex + 1);
                      }
                    }}
                    style={{ direction: "ltr" }}
                  >
                    {t("next")} <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </form>
            </div>
          )}

          {formIndex === 3 && (
            <div className="container mt-1 p-1 bg-white shadow rounded">
              <h4 className="mb-3">{t("Identity & Education")}</h4>
              <p className="text-muted mb-4">
                {t("Please upload the required documents for verification.")}
              </p>

              <form onSubmit={handleFinish}>
                <div className="d-flex flex-row ml-5" style={{ gap: "50px" }}>
                  <div className="d-flex flex-column">
                    <div className="mb-3">
                      <label className="form-label text-dark">
                        {t("ID or Passport:")}
                      </label>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => handleFileChange(e, setIdFile)}
                        className="form-control"
                        style={{ display: "block", maxWidth: "200px" }}
                        required
                      />
                      {idFile && (
                        <p className="form-text text-muted small">
                          {t("Uploaded:")} {idFile.name}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark ">
                        {t("Upload Degree Certificate:")}
                      </label>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => handleFileChange(e, setDegreeFile)}
                        className="form-control"
                        style={{ display: "block", maxWidth: "200px" }}
                        required
                      />
                      {degreeFile && (
                        <p className="form-text text-muted small">
                          {t("Uploaded:")} {degreeFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="d-flex flex-column">
                    <div className="mb-3">
                      <label className="form-label text-dark">
                        {t("University Degree:")}
                      </label>
                      <select
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        className="form-select"
                        style={{ maxWidth: "200px" }}
                        required
                      >
                        <option value="">{t("Select your degree")}</option>
                        <option value="bachelor">{t("Bachelor's")}</option>
                        <option value="master">{t("Master's")}</option>
                        <option value="phd">{t("PhD")}</option>
                        <option value="other">{t("Other")}</option>
                      </select>
                    </div>

                    <label htmlFor="message" className="form-label text-dark">
                      {t("Send a cover letter:")}
                    </label>
                    <textarea
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder={t(
                        "Introduce yourself and explain why you're applying"
                      )}
                      style={{ marginBottom: "10px" }}
                      required
                    />
                  </div>
                </div>

                <div
                  className="d-flex justify-content-between w-100"
                  style={{ direction: "ltr" }}
                >
                  <button
                    className="btn btn-primary w-20 rounded-sm ml-5"
                    type="button"
                    onClick={() => handleStepChange(formIndex - 1)}
                    style={{ direction: "ltr" }}
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    {t("back")}
                  </button>

                  <button
                    className="btn btn-primary w-20 rounded-sm"
                    type="submit"
                    style={{ direction: "ltr" }}
                  >
                    {t("next")} <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </form>
            </div>
          )}

          {formIndex === 4 && (
            <div className="d-flex flex-column align-items-center p-4">
              <div className="mb-4 text-center">
                <h3 className="mb-3 text-primary">{t("Success!")}</h3>
                <p className="mb-2 text-secondary">
                  {t(
                    "Your registration was successful. We are currently reviewing your information and will confirm your account shortly."
                  )}
                </p>
                <p className="mb-4 text-secondary">
                  {t("Thank you for joining us and for your patience!")}
                </p>
                <button
                  onClick={handleClose}
                  className="btn btn-success"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  {t("Got it!")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUpTutor;
