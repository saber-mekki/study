import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function ChangePassword({ email }) {
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [CurrentPasswordError, setCurrentPasswordError] = useState("");
  const [SendEmailMessage, setSendEmailMessage] = useState(false);
  const [UpadateSucc, setUpadateSucc] = useState(false);

  const handleSendEmail = () => {
    setSendEmailMessage(true);
  };

  const handleClose = () => {
    setUpadateSucc(false);
    setSendEmailMessage(false);
    setCurrentPasswordError("");
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setCurrentPasswordError("");

    if (!email) {
      setErrorMessage(t("error.userEmailMissing"));
      return;
    }

    try {
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        {
          email: email,
          password: currentPassword,
        }
      );

      if (loginResponse.status !== 200) {
        setCurrentPasswordError(t("error.incorrectCurrentPassword"));
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessage(t("error.passwordsDoNotMatch"));
        return;
      }

      if (newPassword === currentPassword) {
        setErrorMessage(t("error.sameNewPassword"));
        return;
      }

      if (!checkUpdateLimit()) {
        setErrorMessage(t("error.passwordUpdateLimit"));
        return;
      }

      const updateResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/updatePassword`,
        {
          email: email,
          password: newPassword,
        }
      );

      if (updateResponse.status === 200) {
        setUpadateSucc(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage(t("error.passwordUpdateFailed"));
      }
    } catch (error) {
      console.error("Update Password Error:", error.response ? error.response.data : error.message);
      if (error.response) {
        if (error.response.status === 401) {
          setCurrentPasswordError(t("error.incorrectCurrentPassword"));
        } else if (error.response.status === 404) {
          setErrorMessage(t("error.userNotFound") + email);
        } else {
          setErrorMessage(`${error.response.data?.error || t("error.general")}`);
        }
      } else {
        setErrorMessage(t("error.network"));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-100 d-flex flex-column justify-content-between">
        <h6 className="mb-2 text-primary w-100">{t("changePassword.title")}</h6>
        <h6>{t("changePassword.instructions")}</h6>

        <div className="f-flex flex-column gutters ">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" style={{ maxWidth: "100%" }}>
            <div className="form-group" style={{ maxWidth: "100%" }}>
              <label htmlFor="currentPassword">{t("changePassword.currentPassword")}</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-control"
                id="currentPassword"
                required
                placeholder={t("changePassword.placeholderCurrent")}
              />
            </div>
            {CurrentPasswordError && (
              <div className="d-flex align-items-center w-100">
                <span className="text-danger me-2">{CurrentPasswordError}</span>
                <button
                  onClick={handleSendEmail}
                  type="button"
                  className="btn ml-3 btn-link text-blue p-0 border-0 no-transform"
                >
                  {t("changePassword.forgotPassword")}
                </button>
              </div>
            )}

            {(SendEmailMessage || UpadateSucc) && (
              <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content p-3">
                    <div className="modal-body text-center">
                      {SendEmailMessage && (
                        <>
                          <i className="bi bi-envelope-check text-success fs-1 mb-3"></i>
                          <h5 className="text-success">{t("changePassword.emailSent")}</h5>
                          <h3 className="text-muted">
                            {t("changePassword.emailInstructions")} <strong>{maskEmail(email)}</strong>.
                          </h3>
                        </>
                      )}
                      {UpadateSucc && (
                        <>
                          <i className="bi bi-check-circle text-success fs-1 mb-3"></i>
                          <h4 className="text-success mb-3">{t("changePassword.updateSuccessTitle")}</h4>
                          <h6 className="text-muted mb-3">{t("changePassword.updateSuccessMessage")}</h6>
                        </>
                      )}
                      <button type="button" className="btn rounded btn-primary mt-2" onClick={handleClose}>
                        {t("general.ok")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label htmlFor="newPassword">{t("changePassword.newPassword")}</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="newPassword"
                required
                placeholder={t("changePassword.placeholderNew")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">{t("changePassword.confirmPassword")}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                id="confirmPassword"
                required
                placeholder={t("changePassword.placeholderConfirm")}
              />
              {errorMessage && <div className="text-danger">{errorMessage}</div>}
            </div>
          </div>
        </div>

        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="text-right">
              <button type="button" className="btn btn-secondary">
                {t("general.cancel")}
              </button>
              <button type="submit" className="btn btn-primary">
                {t("changePassword.submit")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const maskEmail = (email) => {
  const [localPart, domain] = email.split("@");
  return `${localPart[0]}***@${domain}`;
};

const checkUpdateLimit = () => {
  const updateCount = localStorage.getItem("passwordUpdateCount");
  const lastUpdateTimestamp = localStorage.getItem("lastPasswordUpdateTimestamp");

  const currentTime = Date.now();
  const hourDifference = (currentTime - lastUpdateTimestamp) / (1000 * 60 * 60);

  if (!updateCount || !lastUpdateTimestamp || hourDifference > 1) {
    localStorage.setItem("passwordUpdateCount", 1);
    localStorage.setItem("lastPasswordUpdateTimestamp", currentTime);
    return true;
  }

  if (updateCount >= 3) {
    return false;
  }

  localStorage.setItem("passwordUpdateCount", parseInt(updateCount) + 1);
  return true;
};
