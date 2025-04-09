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
  const [EmailError, setEmailError] = useState("");
  const [emailValue, setEmailValue] = useState(email);
  const [EmailWarning, setEmailWarning] = useState(false);
  const [prevEmail, setPrevEmail] = useState(email);
  const [Code, SetCode] = useState(false);
  const [Mycode, SetMycode] = useState("");
  const [ErrorCode, SetErrorCode] = useState("");
  const [ResendCode, SetResendCode] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [fullName, setFullName] = useState(user.name);
  const [birthDate, setBirthDate] = useState(user.dateOfBirth);
  const [gender, setGender] = useState(user.gender);

  const [dateError, setDateError] = useState("");

  const updateUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/updateUser",
        {
          name: fullName,
          email: prevEmail,
          newEmail: emailValue,
          type_register: "student",
          gender: gender,
          date_of_birth: birthDate,
          phone_number: phoneNumber,
        }
      );
      const token = response.data.tokens.accessToken;
      localStorage.setItem("authToken", token);

      if (response.data.error) {
        setError(response.data.message || t("Error updating user"));
        return;
      }

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
    }

    setBirthDate(e.target.value);
  };

  const handleModalClose = () => {
    SetCode(false);
    SetMycode("");
    SetErrorCode("");
    setEmailWarning(false);
  };

  const handleConfirm = () => {
    SetSucc("");
    if (!fullName || !emailValue || !phoneNumber) {
      setError(t("All fields are required."));
      return;
    } else {
      setError("");
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(emailValue)) {
      setEmailError(t("pleaseEnterValidEmail"));
      return;
    }

    if (emailValue !== prevEmail) {
      setEmailWarning(true);
      return;
    }

    updateUser();
  };

  const handleCancel = () => {
    setFullName(user.name);
    setEmailValue(prevEmail);
    setPhoneNumber(user.phone);
    setIsEditing(false);
    setDateError("");
  };

  const HandleConfirmCode = () => {
    if (Mycode === "0000") {
      SetCode(false);
      updateUser();
    } else {
      SetResendCode(true);
      SetErrorCode(t("Invalid Code"));
    }
  };

  const handleCancelEmailChange = () => {
    setEmailWarning(false);
  };

  const handleConfirmEmailChange = () => {
    setEmailWarning(false);
    SetCode(true);
  };

  const handleResendCode = () => {
    SetErrorCode(t("Wait 60s before requesting a new code ⏳"));
    setResendDisabled(true);
    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
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
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          {EmailError && <div className="alert alert-danger">{EmailError}</div>}
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
              value={birthDate}
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

      {(EmailWarning || Code) && (
        <div
          id="CodeConf"
          onClick={(e) => e.target.id === "CodeConf" && handleModalClose()}
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content p-3">
              <div className="modal-body text-center">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={handleModalClose}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>

                {EmailWarning && (
                  <>
                    <i className="bi bi-exclamation-circle text-warning fs-1 mb-3"></i>
                    <h4 className="text-warning mb-3">
                      {t("Confirm Email Change")}
                    </h4>
                    <h6 className="text-muted mb-3">
                      {t("Are you sure you want to change your email?")}{" "}
                      {prevEmail} {t("to")} {emailValue}
                    </h6>
                    <button
                      onClick={handleConfirmEmailChange}
                      type="button"
                      className="btn btn-success mt-2 me-2"
                    >
                      {t("Yes")}
                    </button>
                    <button
                      onClick={handleCancelEmailChange}
                      type="button"
                      className="btn btn-danger mt-2"
                    >
                      {t("No")}
                    </button>
                  </>
                )}

                {Code && (
                  <form className="row" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group mb-3 col-12">
                      <label className="text-secondary h6 mb-2" htmlFor="code">
                        {t("Confirmation Code")}
                      </label>
                      <input
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 4) SetMycode(value);
                          SetErrorCode("");
                        }}
                        value={Mycode}
                        placeholder="####"
                        className="form-control shadow-none rounded-sm text-center"
                        type="number"
                        id="code"
                        required
                        maxLength="4"
                      />
                    </div>

                    {ErrorCode && (
                      <h6 className="alert bg-white text-danger mx-auto">
                        {ErrorCode}
                      </h6>
                    )}

                    <div className="form-group col-12">
                      <button
                        className="btn btn-primary w-100 rounded-sm"
                        type="button"
                        onClick={HandleConfirmCode}
                        disabled={Mycode.length !== 4}
                      >
                        {t("Verify Code")}
                      </button>

                      {ResendCode && (
                        <button
                          className="btn btn-success w-100 my-2 rounded-sm"
                          type="button"
                          onClick={handleResendCode}
                          disabled={resendDisabled}
                        >
                          {resendDisabled
                            ? `${t("Wait")} ${countdown}s`
                            : t("Resend Code")}
                        </button>
                      )}
                    </div>
                  </form>
                )}
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
          <button className="btn btn-success me-2" onClick={handleConfirm}>
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
