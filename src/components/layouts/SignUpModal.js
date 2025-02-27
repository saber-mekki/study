import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SignUpModal() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [type, setType] = useState("student");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    let setError=''
    const history = useHistory();
  const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        try {
            const emailCheckResponse = await axios.post("http://localhost:5000/api/v1/checkEmail", { email });
            if (emailCheckResponse.data.exists) {
                setEmailError(t('emailError'));
                return;
            }

            if (password !== repassword) {
                setPasswordError(t('passwordMismatch'));
                
                return;
            }

            await axios.post('http://localhost:5000/api/v1/addUser', {
                name,
                email,
                password,
                number,
                type_register: type
            });

            history.push('./succ');
        } catch (err) {
            if (err.response && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError(t('errorOccurred'));
            }
        }
    };
   
   
    const resetForm = () => {
        setEmail("");
        setName("");
        setNumber("");
        setPassword("");
        setRePassword("");
        setType("student");
        setPasswordError("");
        setEmailError("");
    }; 
    return (
        <div  onClick={(e) => {
            if (e.target.id === "signup-modal") resetForm();//i dont like this 
        }} className="modal fade rounded" id="signup-modal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title text-secondary font-weight-600">{t('registerNow')}</h4>
                        <button onClick={() => resetForm()} //m
                        
                        type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body p-3 p-sm-4">
                        <form method="POST" className="row" onSubmit={handleSubmit}>
                            <div className="form-group mb-20 col-12">
                                <label className="text-secondary h6 mb-2" htmlFor="fname">{t('yourName')}</label>
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
                                <label className="text-secondary h6 mb-2" htmlFor="pnumber">{t('phoneNumber')}</label>
                                <input
                                    onChange={(e) => setNumber(e.target.value)}
                                    value={number}
                                    className="form-control shadow-none rounded-sm"
                                    type="number"
                                    placeholder={t("phone Number")}
                                    id="pnumber"
                                    required
                                />
                            </div>
                            <div className="form-group mb-0 col-12">
                                <label className="text-secondary h6 mb-2" htmlFor="email2">
                                    
                                {t('emailAddress')}*
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

                            {/* Gender Radio Buttons */}
                            <div className="form-group mb-20 col-12">
                                <label className="text-secondary h6 mb-2 d-block">{t('gender')}</label>
                                <div className="d-flex custom-radio-group rounded-sm">
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            id="customRadio1"
                                            name="gender"
                                            className="custom-control-input"
                                            value="Male"
                                            defaultChecked
                                        />
                                        <label className="custom-control-label" htmlFor="customRadio1">{t('male')}</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            id="customRadio2"
                                            name="gender"
                                            className="custom-control-input"
                                            value="Female"
                                        />
                                        <label className="custom-control-label" htmlFor="customRadio2">{t('female')}</label>
                                    </div>
                                </div>
                            </div>

                            {/* Type Radio Buttons */}
                            <div className="form-group mb-20 col-12">
                                <label className="text-secondary h6 mb-2 d-block">{t('type')}</label>
                                <div className="d-flex custom-radio-group rounded-sm">
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            id="customRadio3"
                                            name="type"
                                            className="custom-control-input"
                                            value="student"
                                            onChange={(e) => setType(e.target.value)}
                                            checked={type === "student"}
                                        />
                                        <label className="custom-control-label" htmlFor="customRadio3">{t('student')}</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            id="customRadio4"
                                            name="type"
                                            className="custom-control-input"
                                            value="tutor"
                                            onChange={(e) => setType(e.target.value)}
                                            checked={type === "tutor"}
                                        />
                                        <label className="custom-control-label" htmlFor="customRadio4">{t('tutor')}</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-20 col-12">
                                <label className="text-secondary h6 mb-2" htmlFor="password">{t('password')}</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className="form-control shadow-none rounded-sm"
                                    type="password"
                                    id="password"
                                    required
                                />
                            </div>
                            <div className="form-group mb-0 col-12">
                                <label className="text-secondary h6 mb-" htmlFor="repassword">
                                    {t('retypePassword')}  *
                                    
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

                            {passwordError && (
                                <div className="center-error form-group mb-17">
                                    <div className="text-danger">{passwordError}</div>
                                </div>
                            )}

                            <div className="form-group col-12">
                                <button className="btn btn-primary w-100 rounded-sm" type="submit">{t('Sign Up')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpModal;
