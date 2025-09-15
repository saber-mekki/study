import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import updateUserStore from "../../redux/userSlice";

export default function Account({ onAccountUpdate, email }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [Succ, SetSucc] = useState(false);

  const [emailValue, setEmailValue] = useState(email);

  const [prevEmail, setPrevEmail] = useState(email);

  const [showModal, setShowModal] = useState(false);
  const [errorCode, setErrorCode] = useState(false);

  const [securityCode, setSecurityCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [fullName, setFullName] = useState(user.name);
  const [birthDate, setBirthDate] = useState(user.dateOfBirth);
  const [gender, setGender] = useState(user.gender);

  const [dateError, setDateError] = useState("");

  const updateUser = async () => {

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/updateUser`,
        {
          name: fullName,
      
         
          gender: gender,
          date_of_birth: birthDate,
          phone_number: phoneNumber,
          idUser: user.idUser
        }
      );
      const token = response.data.tokens.accessToken;
      localStorage.setItem("authToken", token);

      if (response.data.error) {
        setError(response.data.message || t("Error updating user"));
        return;
      }
      setShowModal(false);
      setIsEditing(false);
      SetSucc(true);
      setPrevEmail(emailValue);
      dispatch(
        updateUserStore({
          name: fullName,
          phone: phoneNumber,
          dateOfBirth: birthDate,
          gender,
        })
      );
      onAccountUpdate();
      
    } catch (err) {
      setError(t("An error occurred while updating user details."));
      console.error("Error during the update process:", err);
    }
    setError("");

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
    setEmailValue(prevEmail);
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
            <label htmlFor="fullName">{t("name")}</label>
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
            <label htmlFor="eMail">{t("email")}</label>
            <input
              type="email"
              className="form-control"
              id="eMail"
              placeholder={t("Enter email ID")}
              value={email}
              onChange={(e) => setEmailValue(e.target.value)}
              disabled={true}
            />
          </div>

        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
          <div className="form-group">
            <label htmlFor="phone">{t("phone")}</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder={t("Enter phone number")}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
          <div className="form-group">
            <label>{t("gender")}</label>
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
            <label htmlFor="birthDate">{t("date_of_birth")}</label>
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
