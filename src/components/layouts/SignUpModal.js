import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignUpModal() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
/*     const [gender, setGender] = useState(""); // Added gender state
 */    const [type, setType] = useState("student"); // Fixed typo in initial state
const setError=''
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        try {
            const emailCheckResponse = await axios.post("http://localhost:5000/api/v1/checkEmail", { email });
            if (emailCheckResponse.data.exists) {
                setEmailError("Email is already in use.");
                return;
            }

            if (password !== repassword) {
                setPasswordError("Passwords do not match.");
                return;
            }

            await axios.post('http://localhost:5000/api/v1/addUser', {
                name,
                email,
                password,
                number,
                type_register: type
            });


history.push('./succ')
} catch (err) {
            if (err.response && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError("An error occurred, please try again.");
            }
        }
    };

    return (
        <div className="modal fade rounded" id="signup-modal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title text-secondary font-weight-600">Register now</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body p-3 p-sm-4">
                        <form method="POST" className="row" onSubmit={handleSubmit}>
                            <div className="form-group mb-20 col-12">
                                <label className="text-secondary h6 mb-2" htmlFor="fname">Your Name*</label>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className="form-control shadow-none rounded-sm"
                                    type="text"
                                    placeholder="Jack"
                                    id="fname"
                                    required
                                />
                            </div>
                            <div className="form-group mb-20 col-12">
                                <label className="text-secondary h6 mb-2" htmlFor="pnumber">Phone Number*</label>
                                <input
                                    onChange={(e) => setNumber(e.target.value)}
                                    value={number}
                                    className="form-control shadow-none rounded-sm"
                                    type="number"
                                    placeholder="Phone Number"
                                    id="pnumber"
                                    required
                                />
                            </div>
                            <div className="form-group mb-0 col-12">
                                <label className="text-secondary h6 mb-2" htmlFor="email2">Email Address*</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="form-control shadow-none rounded-sm"
                                    type="email"
                                    placeholder="jack@email.com"
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
                <label className="text-secondary h6 mb-2 d-block">Gender*</label>
                <div className="d-flex custom-radio-group rounded-sm">
                    <div className="custom-control custom-radio">
                        <input
                            type="radio"
                            id="customRadio1"
                            name="gender"
                            className="custom-control-input"
                            value="Male"
                           /*  onChange={(e) => setGender(e.target.value)}
                            checked={gender === "Male"} */
                        />
                        <label className="custom-control-label" htmlFor="customRadio1">Male</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input
                            type="radio"
                            id="customRadio2"
                            name="gender"
                            className="custom-control-input"
                            value="Female"
                            /* onChange={(e) => setGender(e.target.value)}
                            checked={gender === "Female"} */
                        />
                        <label className="custom-control-label" htmlFor="customRadio2">Female</label>
                    </div>
                </div>
            </div>

            



                            {/* Type Radio Buttons */}
                            <div className="form-group mb-20 col-12">
                                <label className="text-secondary h6 mb-2 d-block">Type*</label>
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
                                        <label className="custom-control-label" htmlFor="customRadio3">Student</label>
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
                                        <label className="custom-control-label" htmlFor="customRadio4">Tutor</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-20 col-12">
                                <label className="text-secondary h6 mb-2" htmlFor="password">Password*</label>
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
                                <label className="text-secondary h6 mb-" htmlFor="repassword">Retype Password*</label>
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
                                <button className="btn btn-primary w-100 rounded-sm" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpModal;
