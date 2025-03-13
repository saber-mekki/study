import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Account({ email }) {
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailValue, setEmailValue] = useState(email);

  const fetchUserData = async (userEmail) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/getUser",
        {
          email: emailValue,
        }
      );

      if (response.data.error) {
        setError("User not found");
      } else {
        const user = response.data.user;
        setFullName(user.user_name);
        setRole(user.type_register);
        setPhoneNumber(user.phone_number);
        setEmailValue(user.user_email);
      }
    } catch (err) {
      setError("An error occurred while fetching user data.");
    }
  };

  useEffect(() => {
    fetchUserData(emailValue);
  }, []);

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/updateUser",
        {
          name: fullName,
          email,
          newEmail: emailValue,
          type_register: role,
          phone_number: phoneNumber,
        }
      );

      if (response.data.error) {
        setError(response.data.message || "Error updating user");
        console.error(
          "Error from API:",
          response.data.message || "Unknown error"
        );
        return;
      }

      setIsEditing(false);
      alert("User details updated successfully!");

      await fetchUserData(emailValue);
      alert(emailValue);
    } catch (err) {
      setError("An error occurred while updating user details.");
      console.error("Error during the update process:", err);
    }
  };

  const handleCancel = () => {
    setFullName(fullName);
    setEmailValue(email);
    setPhoneNumber(phoneNumber);
    setIsEditing(false);
  };

  return (
    <div>
      <h6 className="mb-2 text-primary">Personal Details</h6>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row gutters">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="form-group">
            <label htmlFor="eMail">Email</label>
            <input
              type="email"
              className="form-control"
              id="eMail"
              placeholder="Enter email ID"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {!isEditing ? (
        <button
          className="btn btn-primary mt-3"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      ) : (
        <div className="mt-3">
          <button className="btn btn-success me-2" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="btn btn-danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
