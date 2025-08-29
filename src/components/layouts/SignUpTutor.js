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
  const [, setcheck] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [, setSubjectError] = useState("");
  const [phone_number, setPhone] = useState("");

const [country, setCountry] = useState("");
const [pricePerHour, setPricePerHour] = useState("");
const [languages, setLanguages] = useState("");

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
        `${process.env.REACT_APP_API_BASE_URL}/checkEmail`,
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

// Add this state variable with your other useState hooks
const [, setIsLoading] = useState(false);
const [, setApiError] = useState("");



// Add error display in your JSX - place this after the languages input

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
      await axios.post(  `${process.env.REACT_APP_API_BASE_URL}/addUser` , data);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRePassword("");
      setSelectedSubject([]);
      setIdFile(null);
      setDegreeFile(null);
      setFormIndex(4);
      if (selectedSubject.length === 0) {
        setSubjectError(t("pleaseSelectSubject"));
        return;
      }
      
      if (!country.trim()) {
        setApiError(t("Please enter your country"));
        return;
      }
      
      if (!pricePerHour || pricePerHour <= 0) {
        setApiError(t("Please enter a valid price per hour"));
        return;
      }
      
      if (!degree) {
        setApiError(t("Please select your degree"));
        return;
      }
    
      // Clear previous errors
      setSubjectError("");
      setApiError("");
      setIsLoading(true);
    
      try {
        const tutorData = {
          email: email, 
          country: country.trim(),
          price_per_hour: parseFloat(pricePerHour),
          specialty: selectedSubject[0], 
          degree: degree,
          languages: languages ? languages.split(',').map(lang => lang.trim()).filter(lang => lang) : [],
          availability: "available" 
        };
    
        console.log("Sending tutor data:", tutorData); // Debug log
    
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/addTutor`,
          tutorData
        );
    
        console.log("Response received:", response.data); // Debug log
    
        if (!response.data.error) {
          console.log("Success! Moving to next step"); // Debug log
          setcheck(""); 
          handleStepChange(formIndex + 1);
        } else {
          console.log("API Error:", response.data.message); // Debug log
          setApiError(response.data.message || t("Failed to save tutor details"));
        }
      } catch (error) {
        console.error('Error submitting tutor details:', error);
        console.error('Error response:', error.response?.data); // Debug log
        setApiError(error.response?.data?.message || t("Network error. Please try again."));
      } finally {
        setIsLoading(false);
      }
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
      style={{ maxHeight: "100vh", margin: "0" }}
    >
      <div
        className="modal-dialog custom-modal modal-dialog-centered mt-0 w-100 w-md-50 "
        style={{ maxHeight: "100vh" }}

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
                      <label className="text-secondary h6 mb-2 d-block">{t("gender")}</label>
                      <div className="d-flex flex-column flex-md-row custom-radio-group rounded-sm">
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customRadioMaleTutor"
                            name="gender"
                            className="custom-control-input"
                            value="male"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "male"}
                          />
                          <label className="custom-control-label" htmlFor="customRadioMaleTutor">
                            {t("male")}
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customRadioFemaleTutor"
                            name="gender"
                            className="custom-control-input"
                            value="female"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "female"}
                          />
                          <label className="custom-control-label" htmlFor="customRadioFemaleTutor">
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
  <div className="modal-body">
    <form
      method="POST"
      className="SignUptutorForm"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="Inputs">
        <div className="signForm">
          <div className="form-group mb-2 col-12">
            <label className="text-secondary h6 mb-2">{t("Subject")}</label>
            <select
              value={selectedSubject.length > 0 ? selectedSubject[0] : ""}
              onChange={(e) =>
                setSelectedSubject(e.target.value ? [e.target.value] : [])
              }
              className="form-control shadow-none rounded-sm"
              required
            >
              <option value="">{t("Select your subject")}</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {t(subject)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-2 col-12">
            <label htmlFor="country" className="text-secondary h6 mb-2">
              {t("Country")}
            </label>
            <input
              type="text"
              id="country"
              placeholder={t("Enter country")}
              className="form-control shadow-none rounded-sm"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-2 col-12">
            <label
              htmlFor="pricePerHour"
              className="text-secondary h6 mb-2"
            >
              {t("Price per hour")}
            </label>
            <input
              type="number"
              id="pricePerHour"
              placeholder={t("Enter price")}
              className="form-control shadow-none rounded-sm"
              value={pricePerHour}
              onChange={(e) => setPricePerHour(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="signForm">
          <div className="form-group mb-2 col-12">
            <label className="text-secondary h6 mb-2">
              {t("University Degree")}
            </label>
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="form-control shadow-none rounded-sm"
              required
            >
              <option value="">{t("Select your degree")}</option>
              <option value="bachelor">{t("Bachelor's")}</option>
              <option value="master">{t("Master's")}</option>
              <option value="phd">{t("PhD")}</option>
              <option value="other">{t("Other")}</option>
            </select>
          </div>

          <div className="form-group mb-2 col-12">
            <label htmlFor="languages" className="text-secondary h6 mb-2">
              {t("Languages (comma separated)")}
            </label>
            <input
              type="text"
              id="languages"
              placeholder={t("e.g. English, French")}
              className="form-control shadow-none rounded-sm"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between w-100" style={{ direction: "ltr" }}>
        <button
          className="btn btn-outline-primary rounded-sm"
          type="button"
          onClick={() => handleStepChange(formIndex - 1)}
        >
          <i className="fas fa-arrow-left me-2"></i>
          {t("back")}
        </button>
        <button
          className="btn btn-primary w-20 rounded-sm mr-5"
          type="button"
          style={{ direction: "ltr" }}
          onClick={() => {
            if (selectedSubject.length === 0) {
              setSubjectError(t("pleaseSelectSubject"));
            } else {
              setSubjectError("");
              setcheck("");
              handleStepChange(formIndex + 1);
            }
          }}
        >
          {t("next")} <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </form>
  </div>
)}



{formIndex === 3 && (
  <div className="container mt-1 p-3 bg-white shadow rounded">
    <h4 className="mb-3">{t("Identity & Education")}</h4>
    <p className="text-muted mb-4">
      {t("Please upload the required documents for verification.")}
    </p>

    <form onSubmit={handleFinish}>
      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <label className="form-label text-dark">{t("ID or Passport:")}</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, setIdFile)}
            className="form-control"
            required
          />
          {idFile && (
            <p className="form-text text-muted small">{t("Uploaded:")} {idFile.name}</p>
          )}
        </div>

        <div className="col-12 col-md-6 mb-3">
          <label className="form-label text-dark">{t("Upload Degree Certificate:")}</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, setDegreeFile)}
            className="form-control"
            required
          />
          {degreeFile && (
            <p className="form-text text-muted small">{t("Uploaded:")} {degreeFile.name}</p>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <label className="form-label text-dark">{t("University Degree:")}</label>
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="form-select"
            required
          >
            <option value="">{t("Select your degree")}</option>
            <option value="bachelor">{t("Bachelor's")}</option>
            <option value="master">{t("Master's")}</option>
            <option value="phd">{t("PhD")}</option>
            <option value="other">{t("Other")}</option>
          </select>
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="message" className="form-label text-dark">{t("Send a cover letter:")}</label>
          <textarea
            id="message"
            className="form-control"
            rows="4"
            placeholder={t("Introduce yourself and explain why you're applying")}
            required
          />
        </div>
      </div>

      <div className="d-flex justify-content-between w-100">
        <button
          className="btn btn-primary w-20 rounded-sm"
          type="button"
          onClick={() => handleStepChange(formIndex - 1)}
        >
          <i className="fas fa-arrow-left mr-2"></i>
          {t("back")}
        </button>

        <button
          className="btn btn-primary w-20 rounded-sm"
          type="submit"
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
