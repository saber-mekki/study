import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const ForgetPassword = () => {
    const { t } = useTranslation();

    const [form1, setForm1] = useState(true);
    const [form2, setForm2] = useState(false);
    const [form3, setForm3] = useState(false);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');

        if (!email) {
            setEmailError(t("emailRequired"));
            return;
        } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            setEmailError(t("invalidEmail"));
            return;
        }

        try {
            const response = await axios.post( `${process.env.REACT_APP_API_BASE_URL}/checkEmail`, { email });

            if (!response.data.exists) {
                setEmailError(t("emailNotExist"));
                return;
            }

            setForm1(false);
            setForm2(true);
        } catch (error) {
            setEmailError(t("somethingWentWrong"));
        }
    };

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        setCodeError('');

        setForm2(false);
        setForm3(true);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setPasswordError('');

        if (password !== repassword) {
            setPasswordError(t("passwordMismatch"));
            return;
        }

        alert(t("passwordResetSuccess"));
    };

    const handleModalClose = () => {
        setForm1(true);
        setForm2(false);
        setForm3(false);
        setEmail('');
        setEmailError('');
        setCode('');
        setCodeError('');
        setPassword('');
        setRepassword('');
        setPasswordError('');
    };

    return (
        <div
            className="modal fade rounded"
            id="forget"
            tabIndex="-1"
            aria-hidden="true"
            onClick={(e) => {
                if (e.target.id === "forget") handleModalClose();
            }}
        >
            <div className="modal-dialog modal-dialog-centered mx-auto" style={{ maxWidth: "400px" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title text-secondary font-weight-600">{t("resetPassword")}</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={handleModalClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body p-3 p-sm-4">
                        
                        {/* FORM 1 - Enter Email */}
                        {form1 && (
                            <form className="row" onSubmit={handleSubmit} noValidate>
                                <div className="form-group mb-3 col-12">
                                    <label className="text-secondary h6 mb-2" htmlFor="email">{t("emailAddress")}*</label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        className="form-control shadow-none rounded-sm"
                                        type="email"
                                        placeholder="jack@email.com"
                                        id="email"
                                        required
                                        style={{ border: emailError ? '2px solid red' : '' }}
                                    />
                                    {emailError && <div className="text-danger mt-2">{emailError}</div>}
                                </div>
                                <div className="form-group col-12">
                                    <button className="btn btn-primary w-100 rounded-sm" type="submit">
                                        {t("sendCode")}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* FORM 2 - Enter Code */}
                        {form2 && (
                            <form className="row" onSubmit={handleCodeSubmit}>
                                <div className="form-group mb-3 col-12">
                                    <label className="text-secondary h6 mb-2" htmlFor="code">{t("confirmationCode")}</label>
                                    <input
                                        onChange={(e) => setCode(e.target.value)}
                                        value={code}
                                        placeholder="####"
                                        className="form-control shadow-none rounded-sm text-center"
                                        type="number"
                                        maxLength="4"
                                        id="code"
                                        required
                                        style={{ border: codeError ? '2px solid red' : '' }}
                                    />
                                    {codeError && <div className="text-danger mt-2">{codeError}</div>}
                                </div>
                                <div className="form-group col-12">
                                    <button className="btn btn-primary w-100 rounded-sm" type="submit">
                                        {t("verifyCode")}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* FORM 3 - Reset Password */}
                        {form3 && (
                            <form className="row" onSubmit={handlePasswordSubmit}>
                                <div className="form-group mb-3 col-12">
                                    <label className="text-secondary h6 mb-2" htmlFor="password">{t("newPassword")}</label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className="form-control shadow-none rounded-sm"
                                        type="password"
                                        id="password"
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3 col-12">
                                    <label className="text-secondary h6 mb-2" htmlFor="repassword">{t("retypePassword")}</label>
                                    <input
                                        onChange={(e) => setRepassword(e.target.value)}
                                        value={repassword}
                                        className="form-control shadow-none rounded-sm"
                                        type="password"
                                        id="repassword"
                                        required
                                    />
                                </div>

                                {passwordError && <div className="text-danger mb-3 col-12">{passwordError}</div>}

                                <div className="form-group col-12">
                                    <button className="btn btn-primary w-100 rounded-sm" type="submit">
                                        {t("resetPassword")}
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
