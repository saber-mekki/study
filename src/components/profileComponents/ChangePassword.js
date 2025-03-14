import React, {  useState } from "react";
import axios from "axios";

export default function ChangePassword({email}) {
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
      setErrorMessage("User email is missing.");
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
        setCurrentPasswordError("Current password is incorrect.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      if (newPassword === currentPassword) {
        setErrorMessage(
          "New password cannot be the same as the current password."
        );
        return;
      }

      const updateResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/updatePassword`,
        {
          email: email,
          password: newPassword,
        }
      );
      if (!checkUpdateLimit()) {
        setErrorMessage("You can only update your password 3 times in an hour.");
        return;
      }
      if (updateResponse.status === 200) {
        setUpadateSucc(true);
      
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage("Failed to update password. Try again.");
      }
    } catch (error) {
      console.error(
        "Update Password Error:",
        error.response ? error.response.data : error.message
      );

      if (error.response) {
        if (error.response.status === 401) {
          setCurrentPasswordError("Current password is incorrect.");
        } else if (error.response.status === 404) {
          setErrorMessage("User not found." + email);
        } else {
          setErrorMessage(
            `${error.response.data?.error || "An error occurred. Try again."}`
          );
        }
      } else {
        setErrorMessage("Network error. Please check your connection.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-100 d-flex flex-column justify-content-between">
        <h6 className="mb-2 text-primary w-100">Change Password</h6>
        <h6>
          Enter your current password and a new one. Make sure it's strong and
          confirm it before saving.
        </h6>

        <div className="f-flex flex-column gutters ">
          <div
            className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
            style={{ maxWidth: "100%" }}
          >
            <div className="form-group" style={{ maxWidth: "100%" }}>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-control"
                id="currentPassword"
                required
                placeholder="Enter current password"
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
                  Forgot password?
                </button>
              </div>
            )}

            {(SendEmailMessage || UpadateSucc) && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content p-3">
                    <div className="modal-body text-center">
                      {SendEmailMessage && (
                        <>
                          <i className="bi bi-envelope-check text-success fs-1 mb-3"></i>
                          <h5 className="text-success">
                            Email Sent Successfully!
                          </h5>
                          <h3 className="text-muted">
                            We have sent an email to{" "}
                            <strong>{maskEmail(email)}</strong>. Please
                            check your inbox and follow the instructions.
                          </h3>
                        </>
                      )}
                      {UpadateSucc && (
                        <>
                          <i className="bi bi-check-circle text-success fs-1 mb-3"></i>
                          <h4 className="text-success mb-3">
                            Password Update Successful!
                          </h4>
                          <h6 className="text-muted mb-3">
                            Your password has been successfully updated. For
                            your security, please ensure that you keep your new
                            password safe.
                          </h6>
                        </>
                      )}
                      <button
                        type="button"
                        className="btn rounded btn-primary mt-2"
                        onClick={handleClose}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="newPassword"
                required
                placeholder="Enter new password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                id="confirmPassword"
                required
                placeholder="Confirm new password"
              />
              {errorMessage && (
                <div className="text-danger">{errorMessage}</div>
              )}
            </div>
          </div>
        </div>

        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="text-right">
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Change Password
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
  const lastUpdateTimestamp = localStorage.getItem(
    "lastPasswordUpdateTimestamp"
  );

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
