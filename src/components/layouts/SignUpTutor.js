import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PasswordStrengthBar from "react-password-strength-bar";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import Select from "react-select";

function SignUpTutor() {
  const { t } = useTranslation();
  const [formIndex, setFormIndex] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordScoreMessage, setPasswordScoreMessage] = useState("");

  const subjects = [
    "English", "French", "Spanish", "German", "Italian", "Latin", "Arabic", "Chinese",
    "Japanese", "Mathematics", "Statistics", "Computer Science", "Information Technology",
    "Physics", "Chemistry", "Biology", "Environmental Science", "Earth Science", "History",
    "Geography", "Economics", "Business", "Political Science", "Sociology", "Psychology",
    "Philosophy", "Religious Studies", "Civics", "Visual Arts", "Music", "Drama", "Dance",
    "Media Studies", "Physical Education", "Health Education", "Sports Science",
    "Design & Technology", "Engineering", "Culinary Arts", "Agriculture", "Entrepreneurship"
  ];

  const [selectedSubject, setSelectedSubject] = useState([]);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [pricePerHour, setPricePerHour] = useState("");
  const [currency, setCurrency] = useState({ value: "TND", label: "TND" });

  const currencyOptions = [
    { value: "TND", label: "TND" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
  ];
  const [languages, setLanguages] = useState("");

  const [subjectError, setSubjectError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [idFile, setIdFile] = useState(null);
  const [degreeFile, setDegreeFile] = useState(null);
  const [degree, setDegree] = useState("");
  const [dragActiveId, setDragActiveId] = useState(false);
  const [dragActiveDegree, setDragActiveDegree] = useState(false);

  const [captchaToken, setCaptchaToken] = useState(null);
  const [robotMessage, setRobotMessage] = useState("");
  const [verifMessage, setVerifMessage] = useState("");
  const recaptchaRef = useRef(null);

  const handleBack = () => setFormIndex(1);
  const handleStepChange = (newStep) => {
    if (newStep >= 1 && newStep <= 4) setFormIndex(newStep);
  };

  const handleFileChange = (
    e,
    setFile
  ) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
  };

  const handleDragOver = (e, setDrag) => {
    e.preventDefault();
    setDrag(true);
  };
  const handleDragLeave = (setDrag) => setDrag(false);
  const handleDrop = (
    e,
    setFile,
    setDrag
  ) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    setFile(file);
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordScoreMessage("");
    setEmailError("");

    try {
      const emailCheckResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/checkEmail`,
        { email }
      );

      if (emailCheckResponse.data.exists) {
        setEmailError(t("emailError"));
        return;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setEmailError(t("errorOccurred"));
      return;
    }


    if (passwordScore < 3) {
      setPasswordScoreMessage(
        t(
          "Password must be strong (8+ chars incl. uppercase, lowercase, number, special char)."
        )
      );
      return;
    }

    if (password !== rePassword) {
      setPasswordError(t("passwordError"));
      return;
    }

    handleStepChange(2);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setApiError("");
    setSubjectError("");
    setRobotMessage("");

    if (!selectedCountry.trim()) {
      setApiError(t("Please enter your country"));
      return;
    }

    const price = parseFloat(pricePerHour);
    if (Number.isNaN(price) || price <= 0) {
      setApiError(t("Please enter a valid price per hour"));
      return;
    }

    if (!degree) {
      setApiError(t("Please select your degree"));
      return;
    }

    if (!degreeFile) {
      setApiError(t("Please upload your degree certificate."));
      return;
    }
    if (!idFile) {
      setApiError(t("Please select your university degree."));
      return;
    }

    if (!captchaToken) {
      setRobotMessage(t("Please confirm you are not a robot."));
      return;
    }

    if (!coverLetter) {
      setApiError(t("cover letter *"));
      return;
    }
    const userPayload = {
      name,
      email,
      password,
      type_register: "tutor",
      phone_number,
      gender,
      captchaToken
      
    };

    try {
      setIsLoading(true);

      const userRes = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/addUser`,
        userPayload
      );
      toast.success(userRes.data.message);
      setVerifMessage(userRes.data.message);

      const tutorData = {
        email,
        country: selectedCountry.trim(),
        price_per_hour: price,
        currency: currency,
        specialty: selectedSubject[0],
        degree,
        languages: languages
          ? languages
            .split(",")
            .map((l) => l.trim())
            .filter(Boolean)
          : [],
        availability: "available",
        coverLetter
      };

      const tutorRes = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/addTutor`,
        tutorData
      );

      if (tutorRes.data?.error) {
        setApiError(tutorRes.data.message || t("Failed to save tutor details"));
        return;
      }

      const uploadFiles = async (file, type) => {
        if (!file) return null;

        const formData = new FormData();
        formData.append("tutor_email", email);
        formData.append("type", type);
        formData.append("file", file);

        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/tutors/upload-pdf`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        return res.data;
      };

      await uploadFiles(idFile, "ID");
      await uploadFiles(degreeFile, "Degree");


      handleStepChange(4);

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaToken(null);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setApiError(error?.response?.data?.message || error?.response?.data.error || t("Error"));
    } finally {
      setIsLoading(false);
    }
  };


  const handleClose = () => {
    setFormIndex(1);
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRePassword("");
    setSelectedSubject([]);
    setIdFile(null);
    setDegreeFile(null);
    setSelectedCountry("");
    setPricePerHour("");
    setCurrency("TND");
    setLanguages("");
    setDegree("");
    setApiError("");
    setSubjectError("");
    setCoverLetter("")
  };


  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca3")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
          );
          setCountries(sorted);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div
      className=" mt-25 modal  fade rounded "
      id="signuptutor"
      tabIndex={-1}
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
            <div className="modal-body" style={{ maxHeight: "80vh", overflowY: "auto" }}>
              <form method="POST" className="SignUptutorForm" onSubmit={handleSubmitStep1}>
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
                      <label className="text-secondary h6 mb-2" htmlFor="password">
                        {t("Password")}*
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
                      <PasswordStrengthBar
                        password={password}
                        onChangeScore={(score) => {
                          setPasswordScore(score);
                          setPasswordScoreMessage("");
                        }}
                      />

                      <label className="text-secondary h6 mb-2" htmlFor="Repassword">
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
                      {passwordError && <div className="text-danger">{passwordError}</div>}
                      {passwordScoreMessage && (
                        <div className="text-danger">{passwordScoreMessage}</div>
                      )}
                    </div>
                  </div>

                  <div className="signForm">
                    <div className="form-group mb-2 col-12">
                      <label className="text-secondary h6 mb-2" htmlFor="email2">
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
                      {EmailError && <div className="text-danger mt-2">{EmailError}</div>}
                    </div>

                    <div className="form-group mb-2 col-12">
                      <label className="text-secondary h6 mb-2" htmlFor="fnumber">
                        {t("phoneNumber")}
                      </label>
                      <input
                        className="form-control shadow-none rounded-sm"
                        type="number"
                        placeholder={t("phoneNumber")}
                        id="fnumber"
                        value={phone_number}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
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
                  </div>
                </div>

                <div className="d-flex justify-content-end w-100" style={{ direction: "ltr" }}>
                  <button className="btn btn-primary w-20 rounded-sm mr-5" type="submit">
                    {t("next")} <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </form>
            </div>
          )}

          {formIndex === 2 && (
            <>
              <div className="modal-body">
                <form
                  method="POST"
                  className="SignUptutorForm"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="form-group" style={{ display: "grid" }}>
                        <label className="text-secondary h6 mb-2">
                          {t("subject")}:
                        </label>
                        <select
                          value={selectedSubject[0] ?? ""}
                          onChange={(e) =>
                            setSelectedSubject(
                              e.target.value ? [e.target.value] : []
                            )
                          }
                          className="form-control subject-list shadow-none rounded-sm"
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

                      <div className="form-group" style={{ display: "grid" }}>
                        <label
                          htmlFor="country"
                          className="text-secondary h6 mb-2"
                        >
                          {t("Select Country")}:
                        </label>
                        <select
                          id="country"
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          className="form-control shadow-none rounded-sm subject-list"
                          required
                        >
                          <option value="">{t("Select Country")}</option>
                          {countries.map((c) => (
                            <option key={c.cca3} value={c.name.common}>
                              {c.name.common}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group" style={{ display: "grid" }}>
                        <label
                          htmlFor="pricePerHour"
                          className="text-secondary h6 mb-2"
                        >
                          {t("Price per hour")}:
                        </label>
                        <div className="d-flex" style={{ gap: "10px" }}>
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
                          <Select
                            options={currencyOptions}
                            value={currency}
                            onChange={(selectedOption) => {
                              console.log("Selected:", selectedOption);
                              setCurrency(selectedOption);
                            }}
                            styles={{
                              control: (base) => ({
                                ...base,
                                width: "80px",
                                minWidth: "80px",
                                border: "1px solid #ced4da",
                                backgroundColor: "transparent",
                              }),
                              menu: (base) => ({
                                ...base,
                                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                zIndex: 9999,
                              }),
                              menuList: (base) => ({
                                ...base,
                                maxHeight: "200px",
                              }),
                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused
                                  ? "#ddd"
                                  : "#fff",
                                cursor: "pointer",
                              }),
                              singleValue: (base) => ({
                                ...base,
                                display: "flex",
                                alignItems: "center",
                              }),
                              dropdownIndicator: (base) => ({
                                ...base,
                                alignItems: "center",
                                padding: "4px",
                              }),
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="form-group" style={{ display: "grid" }}>
                        <label className="text-secondary h6 mb-2">
                          {t("University Degree:")}
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

                      <div className="form-group" style={{ display: "grid" }}>
                        <label
                          htmlFor="languages"
                          className="text-secondary h6 mb-2"
                        >
                          {t("Languages (comma separated)")}:
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

                  {apiError && (
                    <div className="text-danger my-2">{apiError}</div>
                  )}
                  {subjectError && (
                    <div className="text-danger mt-2">{subjectError}</div>
                  )}
                </form>
              </div>
              <div className="modal-footer" style={{ flexShrink: "0" }}>
                <button
                  className="btn btn-outline-primary rounded-sm flex-fill"
                  type="button"
                  onClick={() => {
                    setVerifMessage("");
                    handleStepChange(1);
                  }}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  {t("back")}
                </button>

                <button
                  className="btn btn-primary rounded-sm flex-fill"
                  type="button"
                  onClick={() => {
                    if (
                      selectedSubject.length === 0 ||
                      !selectedCountry ||
                      !pricePerHour ||
                      !currency ||
                      !degree ||
                      !languages.trim()
                    ) {
                      setSubjectError(
                        t("Please fill all fields before proceeding.")
                      );
                    } else {
                      setApiError("");
                      setSubjectError("");
                      handleStepChange(3);
                    }
                  }}
                >
                  {t("next")} <i className="fas fa-arrow-right ms-2"></i>
                </button>
              </div>
            </>
          )}

          {formIndex === 3 && (
            <div className="container mt-1 p-3 bg-white shadow rounded" style={{ maxHeight: "80vh", overflowY: "auto" }}>
              <h4 className="mb-3">{t("Identity & Education")}</h4>
              <p className="text-muted mb-4">
                {t("Please upload the required documents for verification.")}
              </p>

              <form onSubmit={handleFinish}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label text-dark">{t("ID or Passport")}:</label>
                    <div
                      className={`upload-zone border rounded-3 p-4 text-center ${dragActiveId ? "drag-active" : ""}`}
                      onDragOver={(e) => handleDragOver(e, setDragActiveId)}
                      onDragLeave={() => handleDragLeave(setDragActiveId)}
                      onDrop={(e) => handleDrop(e, setIdFile, setDragActiveId)}
                    >
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        id="idUploadId"
                        className="d-none"
                        onChange={(e) => handleFileChange(e, setIdFile)}
                      />
                      <label htmlFor="idUploadId" className="w-100 cursor-pointer">
                        <i className="bi bi-cloud-upload display-4 text-primary"></i>
                        <p className="mt-2 mb-0 text-muted">
                          {t("Drag & Drop your file here or")}{" "}
                          <span className="text-primary fw-bold">{t("Browse")}</span>
                        </p>
                        <small className="text-secondary">{t("Accepted formats: JPG, PNG, PDF")}</small>
                      </label>
                    </div>

                    {idFile && (
                      <div className="mt-3 p-2 border rounded bg-light d-flex align-items-center flex-wrap justify-content-between">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          <span className="text-muted small">
                            {t("Uploaded")}: <strong>{idFile.name}</strong>
                          </span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setIdFile(null)}
                        >
                          {t("Delete")}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label text-dark">{t("Upload Degree Certificate")}:</label>
                    <div
                      className={`upload-zone border rounded-3 p-4 text-center ${dragActiveDegree ? "drag-active" : ""}`}
                      onDragOver={(e) => handleDragOver(e, setDragActiveDegree)}
                      onDragLeave={() => handleDragLeave(setDragActiveDegree)}
                      onDrop={(e) => handleDrop(e, setDegreeFile, setDragActiveDegree)}
                    >
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        id="idUploadDegree"
                        className="d-none"
                        onChange={(e) => handleFileChange(e, setDegreeFile)}
                      />
                      <label htmlFor="idUploadDegree" className="w-100 cursor-pointer">
                        <i className="bi bi-cloud-upload display-4 text-primary"></i>
                        <p className="mt-2 mb-0 text-muted">
                          {t("Drag & Drop your file here or")}{" "}
                          <span className="text-primary fw-bold">{t("Browse")}</span>
                        </p>
                        <small className="text-secondary">{t("Accepted formats: JPG, PNG, PDF")}</small>
                      </label>
                    </div>

                    {degreeFile && (
                      <div className="mt-3 p-2 border rounded bg-light d-flex align-items-center flex-wrap justify-content-between">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          <span className="text-muted small">
                            {t("Uploaded:")} <strong>{degreeFile.name}</strong>
                          </span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setDegreeFile(null)}
                        >
                          {t("Delete")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="message" className="form-label text-dark">
                    {t("Send a cover letter")}:
                  </label>
                  <textarea
                    id="message"
                    className="form-control"
                    rows={4}
                    placeholder={t("Introduce yourself and explain why you're applying")}
                    value={coverLetter} 
                    onChange={(e) => setCoverLetter(e.target.value)} 
                    required
                  />
                </div>

                <div className="form-group col-12 mt-3">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={(token) => {
                      setCaptchaToken(token);
                      setRobotMessage("");
                    }}
                  />
                </div>
                {robotMessage && <div className="text-danger mt-2">{robotMessage}</div>}
                {verifMessage && <div className="text-success mb-2">{verifMessage}</div>}
                {apiError && <div className="text-danger mb-2">{apiError}</div>}

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch mt-4 gap-2">
                  <button
                    className="btn btn-primary flex-fill rounded-sm"
                    type="button"
                    onClick={() => handleStepChange(2)}
                    disabled={isLoading}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    {t("back")}
                  </button>

                  <button
                    className="btn btn-primary flex-fill rounded-sm"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? t("Please wait...") : t("next")}{" "}
                    {!isLoading && <i className="fas fa-arrow-right ms-2"></i>}
                  </button>
                </div>
              </form>
            </div>
          )}


          {formIndex === 4 && (
            <div className="d-flex flex-column align-items-center p-4" style={{ maxHeight: "80vh", overflowY: "auto" }}>
              <div className="mb-4 text-center">
                <h3 className="mb-3 text-primary">{t("Success!")}</h3>
                <p className="mb-2 text-secondary">
                  {t(
                    "Your registration was successful. We are currently reviewing your information and will confirm your account shortly."
                  )}
                </p>
                <p className="mb-4 text-secondary">
                  {t("Thank you for joining us and for your patience")}!
                </p>
                <button
                  onClick={handleClose}
                  className="btn btn-success"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  {t("Got it")}!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .upload-zone {
          transition: all 0.2s ease;
          background-color: #f9f9f9;
          cursor: pointer;
          border: 2px dashed transparent;
        }
        .upload-zone.drag-active {
          border-color: #0d6efd;
          background-color: #eef6ff;
        }
        .cursor-pointer { cursor: pointer; }
        .devise-select.nice-select {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 80px;
        width: 80px;
        border: 1px solid #ced4da;
        }
        .subject-list.nice-select .list {
        position: absolute !important;  
        top: 100%;                      
        left: 0;
        right: 0;
        max-height: 200px;              
        overflow-y: auto;                
        z-index: 9999;                  
        background: #fff;               
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
}

export default SignUpTutor;
