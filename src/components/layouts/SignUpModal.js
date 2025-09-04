import React, { useState, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";


const getPasswordStrength = (password) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;

  if (strength <= 2) return { label: "Weak", color: "red", percent: 33 };
  if (strength === 3 || strength === 4)
    return { label: "Medium", color: "orange", percent: 66 };
  if (strength === 5) return { label: "Strong", color: "green", percent: 100 };
  return { label: "", color: "", percent: 0 };
};

function SignUpModal() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [type, setType] = useState("student");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [Error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("male");
  const { t } = useTranslation();
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const [passwordStrength, setPasswordStrength] = useState({ label: "", color: "", percent: 0 });

  const resetForm = () => {
    setEmail("");
    setName("");
    setNumber("");
    setPassword("");
    setRePassword("");
    setType("student");
    setPasswordError("");
    setEmailError("");
    setMessage("")
    setPasswordStrength({ label: "", color: "", percent: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!captchaToken) {
      setPasswordError("Please confirm you are not a robot.");
      return;
    }

    if (passwordStrength.label !== "Strong") {
      setPasswordError("Password must be strong (8+ chars, uppercase, lowercase, number, special char).");
      return;
    }

    try {
      const emailCheckResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/checkEmail`,
        { email }
      );

      if (emailCheckResponse.data.exists) {
        setEmailError(t("emailError"));
        return;
      }
      if (!emailCheckResponse.data.domainValid) {
        setEmailError(t("Email not valid"));
        return;
      }
      if (password !== repassword) {
        setPasswordError(t("passwordMismatch"));
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/addUser`,
        {
          name,
          email,
          password,
          type_register: type,
          phone_number,
          gender,
          captchaToken,
        }
      );

      toast.success(response.data.message);
      setMessage(response.data.message);
      setCaptchaToken(null);
      resetForm();
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaToken(null);
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError(t("errorOccurred"));
      }
    }
  };


  return (
    <div
      onClick={(e) => {
        if ((e.target).id === "signup-modal") resetForm();
      }}
      className="modal fade rounded"
      id="signup-modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title text-secondary font-weight-600">
              {t("registerNow")}
            </h4>
            <button
              onClick={() => resetForm()}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body p-3 p-sm-4">
            <form method="POST" className="row" onSubmit={handleSubmit}>
              <div className="form-group mb-20 col-12">
                <label className="text-secondary h6 mb-2" htmlFor="fname">
                  {t("yourName")}
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="form-control shadow-none rounded-sm"
                  type="text"
                  placeholder={t("name")}
                  id="fname"
                  required
                />
              </div>

              <div className="form-group mb-20 col-12">
                <label className="text-secondary h6 mb-2" htmlFor="pnumber">
                  {t("phoneNumber")}
                </label>
                <input
                  onChange={(e) => setNumber(e.target.value)}
                  value={phone_number}
                  className="form-control shadow-none rounded-sm"
                  type="number"
                  placeholder={t("phone Number")}
                  id="pnumber"
                  required
                />
              </div>

              <div className="form-group mb-0 col-12">
                <label className="text-secondary h6 mb-2" htmlFor="email2">
                  {t("emailAddress")}*
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="form-control shadow-none rounded-sm"
                  type="email"
                  placeholder={t("Enter your email")}
                  id="email2"
                  style={{ border: emailError ? "2px solid red" : "" }}
                  required
                />
              </div>
              {emailError && (
                <div className="center-error">
                  <div className="text-danger">{emailError}</div>
                </div>
              )}

              <div className="form-group mb-20 col-12">
                <label className="text-secondary h6 mb-2 d-block">
                  {t("gender")}
                </label>
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

              <div className="form-group mb-20 col-12">
                <label className="text-secondary h6 mb-2" htmlFor="password">
                  {t("password")}
                </label>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    setPasswordStrength(getPasswordStrength(value));
                  }}
                  value={password}
                  className="form-control shadow-none rounded-sm"
                  type="password"
                  id="password"
                  required
                />

                {password && (
                  <div className="mt-2">
                    <div
                      style={{
                        height: "6px",
                        width: "100%",
                        background: "#e0e0e0",
                        borderRadius: "4px",
                      }}
                    >
                      <div
                        style={{
                          width: `${passwordStrength.percent}%`,
                          height: "100%",
                          background: passwordStrength.color,
                          borderRadius: "4px",
                          transition: "width 0.3s ease",
                        }}
                      ></div>
                    </div>
                    <small style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </small>
                  </div>
                )}
              </div>

              {/* Re-password */}
              <div className="form-group mb-0 col-12">
                <label className="text-secondary h6 mb-" htmlFor="repassword">
                  {t("retypePassword")} *
                </label>
                <input
                  onChange={(e) => setRePassword(e.target.value)}
                  value={repassword}
                  className="form-control shadow-none rounded-sm"
                  type="password"
                  style={{ border: passwordError ? "2px solid red" : "" }}
                  id="repassword"
                  required
                />
              </div>

              <div className="form-group col-12 mb-3">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setCaptchaToken(token)}
                />
              </div>

              {passwordError && (
                <div className="center-error form-group mb-17">
                  <div className="text-danger">{passwordError}</div>
                </div>
              )}
              {Error && <div className="text-danger mb-2">{Error}</div>}
              {message.length !== 0 && (
                <div className="text-success mb-2">{message}</div>
              )}

              <div className="form-group col-12">
                <button
                  className="btn btn-primary w-100 rounded-sm"
                  type="submit"
                >
                  {t("Sign Up")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
