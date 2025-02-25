import React, { useState } from "react";
import axios from "axios";

const SignInModal = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "guardian" });
  const [error, setError] = useState("");

  console.log({formData})
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, formData, {
        withCredentials: true, // Ensures cookies are stored
      });
      alert(response.data.message); // Show success message
    } catch (err) {
        console.log(err)
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="modal fade rounded" id="signin-modal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered mx-auto" style={{ maxWidth: "400px" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title text-secondary font-weight-600">Welcome back</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body p-3 p-sm-4">
            {error && <p className="text-danger">{error}</p>}
            <ul className="nav nav-pills nav-justified tab-nav">
              <li className="nav-item">
                <button
                  className={`nav-link ${formData.role === "guardian" ? "active" : ""}`}
                  onClick={() => setFormData({ ...formData, role: "guardian" })}
                >
                  <img src="/assets/images/guardian.png" className="mr-2" alt="" style={{ height: "45px" }} />
                  Login as Guardian
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${formData.role === "tutor" ? "active" : ""}`}
                  onClick={() => setFormData({ ...formData, role: "tutor" })}
                >
                  <img src="/assets/images/tutor.png" className="mr-2" alt="" style={{ height: "45px" }} />
                  Login as Tutor
                </button>
              </li>
            </ul>
            <form className="row mt-3" onSubmit={handleSubmit}>
              <div className="form-group col-12">
                <label className="text-secondary h6 font-weight-600 mb-2">Email Address*</label>
                <input
                  className="form-control shadow-none rounded-sm"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-12">
                <label className="text-secondary h6 font-weight-600 mb-2">Password*</label>
                <input
                  className="form-control shadow-none rounded-sm"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-12">
                <button className="btn btn-primary w-100 rounded-sm" type="submit">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
