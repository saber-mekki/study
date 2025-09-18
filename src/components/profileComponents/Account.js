import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { updateUserStore } from "../../redux/userSlice";

export default function Account({ onAccountUpdate, email }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [Succ, SetSucc] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [errorCode, setErrorCode] = useState(false);

  const [securityCode, setSecurityCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [fullName, setFullName] = useState(user.name);
  const [birthDate, setBirthDate] = useState(user.dateOfBirth);
  const [gender, setGender] = useState(user.gender);
  const [country, setCountry] = useState(user.country || "");
  const [pricePerHour, setPricePerHour] = useState(user.price_per_hour || "");
  const [specialty, setSpecialty] = useState(user.specialty || "");
  const [degree, setDegree] = useState(user.degree || "");
  const [languages, setLanguages] = useState(user.languages.length !== 0 ? user.languages.join(", ") : "");
  const [dateError, setDateError] = useState("");
  const [countries, setCountries] = useState([]);
  const subjects = [
    "English", "French", "Spanish", "German", "Italian", "Latin", "Arabic", "Chinese",
    "Japanese", "Mathematics", "Statistics", "Computer Science", "Information Technology",
    "Physics", "Chemistry", "Biology", "Environmental Science", "Earth Science", "History",
    "Geography", "Economics", "Business", "Political Science", "Sociology", "Psychology",
    "Philosophy", "Religious Studies", "Civics", "Visual Arts", "Music", "Drama", "Dance",
    "Media Studies", "Physical Education", "Health Education", "Sports Science",
    "Design & Technology", "Engineering", "Culinary Arts", "Agriculture", "Entrepreneurship"
  ];
  const [dialCode, setDialCode] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca3,idd")
      .then((res) => res.json())
      .then((data) =>
        setCountries(
          data
            .filter(c => c.idd?.root) // keep only those with a calling code
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
        )
      )
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const updateUser = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/updateUser`, {
        name: fullName,
        gender,
        date_of_birth: birthDate,
        phone_number: dialCode + phoneNumber,
        idUser: user.idUser,
      });
      const token = response.data.tokens.accessToken;
      localStorage.setItem("authToken", token);

      if (response.data.error) {
        setError(response.data.message || t("Error updating user"));
        return;
      }
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/updateTutor`, {
        tutor_email: user.email,
        country,
        price_per_hour: parseFloat(pricePerHour),
        specialty,
        degree,
        languages: languages.split(",").map(l => l.trim()),
      });

      dispatch(updateUserStore({
        name: fullName,
        phone: dialCode + phoneNumber,
        dateOfBirth: birthDate,
        gender,
        country,
        price_per_hour: pricePerHour,
        specialty,
        degree,
        languages: languages.split(",").map(l => l.trim()),
      }));

      setShowModal(false);
      setIsEditing(false);
      SetSucc(true);
      onAccountUpdate();
    } catch (err) {
      console.error(err);
      setError(t("An error occurred while updating user details."));
    }
  };


  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (selectedDate > minAgeDate) {
      setDateError(t("You must be at least 18 years old."));
      setError("");
    } else {
      setDateError("");
      setBirthDate(e.target.value);
    }

  };


  const openModal = (action, status = "") => {
    SetSucc("");
    if (!fullName || !phoneNumber) {
      setError(t("All fields are required."));
      return;
    } else {
      setError("");
    }
    setShowModal(true);
    setSecurityCode("");
  };

  const handleConfirm = async () => {

    try {
      const token = localStorage.getItem("authToken");
      const verifyRes = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/verifyPassword`,
        {
          password: securityCode,
          id: user.idUser
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!verifyRes.data.valid) {
        setErrorCode(true);
        return;
      }


      updateUser();
    } catch (err) {
      console.error("Action failed:", err);
      alert("Action failed. See console for error.");
    }

  };

  const handleCancel = () => {
    setFullName(user.name);
    setPhoneNumber(user.phone);
    setIsEditing(false);
    setDateError("");
  };


  useEffect(() => {
    setPhoneNumber(user.phone);
    setFullName(user.name);
    setGender(user.gender);
    setBirthDate(user.dateOfBirth);
  }, [user]);

  return (
    <div>
      <h6 className="mb-2 text-primary">{t("Personal Details")}</h6>

      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row gutters">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
          <div className="form-group">
            <label className="text-secondary h6 mb-2">{t("name")}</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder={t("Enter full name")}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
          <div className="form-group">
            <label className="text-secondary h6 mb-2">{t("email")}</label>
            <input
              type="email"
              className="form-control"
              id="eMail"
              placeholder={t("Enter email ID")}
              value={email}
              disabled={true}
            />
          </div>

        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
          <div className="form-group">
            <label className="text-secondary h6 mb-2">{t("phone")}</label>
            <div className="input-group">
    {/* Country Code Dropdown */}
    <select
      className="form-select rounded-start"
      style={{ maxWidth: "140px" }}
      value={dialCode}
      onChange={(e) => setDialCode(e.target.value)}
      disabled={!isEditing}
    >
      <option value="">{t("Code")}</option>
      {countries.map((c) => {
        const codes = c.idd.suffixes?.map((s) => `${c.idd.root}${s}`) || [];
        return codes.map((code) => (
          <option key={`${c.cca2}-${code}`} value={code}>
           {c.name.common} {code} &nbsp; 
          </option>
        ));
      })}
    </select>

    {/* Phone Number Input */}
    <input
      type="tel"
      className="form-control rounded-end"
      placeholder={t("Enter phone number")}
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      disabled={!isEditing}
    />
  </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
          <div className="form-group">
            <label className="text-secondary h6 mb-2">{t("gender")}</label>
            <div className="d-flex custom-radio-group rounded-sm">
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="customRadioMale"
                  name="gender"
                  className="custom-control-input"
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "male"}
                  disabled={!isEditing}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioMale"
                >
                  {t("male")}
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="customRadioFemale"
                  name="gender"
                  className="custom-control-input"
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "female"}
                  disabled={!isEditing}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioFemale"
                >
                  {t("female")}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
          <div className="form-group">
            <label className="text-secondary h6 mb-2">{t("date_of_birth")}</label>
            <input
              type="date"
              className="form-control"
              id="birthDate"
              value={birthDate
                ? new Date(birthDate).toISOString().split("T")[0] // => "1949-11-06"
                : ""}
              onChange={handleDateChange}
              required
              disabled={!isEditing}
            />
            {dateError && <div className="alert alert-danger">{dateError}</div>}
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="text-secondary h6 mb-2">{t("Country")}</label>
          <select
            className="form-control"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={!isEditing}
          >
            <option value="">{t("Select Country")}</option>
            {countries.map((c) => (
              <option key={c.cca3} value={c.name.common}>
                {c.name.common}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="text-secondary h6 mb-2">{t("Price per hour")}</label>
          <input
            type="number"
            className="form-control"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="text-secondary h6 mb-2">{t("Specialty / Subject")}</label>

          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="form-control shadow-none rounded-sm"
            required
            disabled={!isEditing}
          >
            <option value="">{t("Select your subject")}</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {t(subject)}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="text-secondary h6 mb-2">
            {t("University Degree:")}
          </label>
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="form-control shadow-none rounded-sm"
            required
            disabled={!isEditing}
          >
            <option value="">{t("Select your degree")}</option>
            <option value="bachelor">{t("Bachelor's")}</option>
            <option value="master">{t("Master's")}</option>
            <option value="phd">{t("PhD")}</option>
            <option value="other">{t("Other")}</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="text-secondary h6 mb-2">{t("Languages (comma separated)")}</label>
          <input
            type="text"
            className="form-control"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            disabled={!isEditing}
          />
        </div>

      </div>

      {Succ && (
        <div
          id="succ"
          onClick={(e) => e.target.id === "succ" && onAccountUpdate()}
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className="modal-content p-4"
              style={{ borderRadius: "12px", borderColor: "#6c757d" }}
            >
              <div className="modal-body text-center">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={onAccountUpdate}
                  aria-label="Close"
                  style={{ color: "#6c757d" }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <i className="bi bi-check-circle text-success fs-1 mb-3"></i>
                <h4
                  className="text-success mb-3"
                  style={{ fontWeight: "bold" }}
                >
                  {t("Details Updated Successfully!")}
                </h4>
                <h6 className="text-muted mb-4">
                  {t("Your Details Have Been Updated Successfully!")}
                </h6>
                <div className="d-flex justify-content-center">
                  <button
                    onClick={onAccountUpdate}
                    type="button"
                    className="btn btn-success mt-2"
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    {t("Continue")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content p-4">
              <div className="modal-body text-center">
                {/* <h5 className="mb-3">{modalTitle}</h5> */}
                <p className="mb-2">{t("Please enter the security code to proceed")}:</p>
                <input
                  type="password"
                  className="form-control mb-3"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  placeholder="Enter Your admin code"
                />
                {errorCode && (
                  <div className="text-danger mb-2">
                    Error: {t("Incorrect security code")}.
                  </div>
                )}
                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-primary" onClick={handleConfirm}>
                    {t("Confirm")}
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    {t("Cancel")}
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {!isEditing ? (
        <button
          className="btn btn-primary mt-3"
          onClick={() => setIsEditing(true)}
        >
          {t("edit")}
        </button>
      ) : (
        <div className="mt-3">
          <button className="btn btn-success me-2" onClick={openModal}>
            {t("confirm")}
          </button>
          <button className="btn btn-danger" onClick={handleCancel}>
            {t("cancel")}
          </button>
        </div>
      )}
    </div>
  );
}
