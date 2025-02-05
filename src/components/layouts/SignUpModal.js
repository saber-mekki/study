import React, {Component} from "react";

class SignUpModal extends Component {
    render() {
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
                            <form method="POST" className="row">
                                <div className="form-group mb-20 col-12">
                                    <label className="text-secondary h6 mb-2" htmlFor="fname">Your Name*</label>
                                    <input
                                        className="form-control shadow-none rounded-sm"
                                        type="text"
                                        placeholder="Jack"
                                        id="fname"
                                        required />
                                </div>
                                <div className="form-group mb-20 col-12">
                                    <label className="text-secondary h6 mb-2" htmlFor="pnumber">Phone Number*</label>
                                    <input
                                        className="form-control shadow-none rounded-sm"
                                        type="text"
                                        placeholder="Phone Number"
                                        id="pnumber"
                                        required />
                                </div>
                                <div className="form-group mb-20 col-12">
                                    <label className="text-secondary h6 mb-2" htmlFor="email2">Email Address*</label>
                                    <input
                                        className="form-control shadow-none rounded-sm"
                                        type="email"
                                        placeholder="jack@email.com"
                                        id="email2"
                                        required />
                                </div>
                                <div className="form-group mb-20 col-12">
                                    <label className="text-secondary h6 mb-2 d-block">Gender*</label>
                                    <div className="d-flex custom-radio-group rounded-sm">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                id="customRadio1"
                                                name="customRadio"
                                                className="custom-control-input" />
                                            <label className="custom-control-label" htmlFor="customRadio1">Male</label>
                                        </div>
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                id="customRadio2"
                                                name="customRadio"
                                                className="custom-control-input" />
                                            <label className="custom-control-label" htmlFor="customRadio2">Female</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-20 col-12">
                                    <label className="text-secondary h6 mb-2" htmlFor="password">Password*</label>
                                    <input
                                        className="form-control shadow-none rounded-sm"
                                        type="password"
                                        id="passwordd"
                                        required />
                                </div>
                                <div className="form-group mb-20 col-12">
                                    <label className="text-secondary h6 mb-2" htmlFor="repassword">Retype Password*</label>
                                    <input
                                        className="form-control shadow-none rounded-sm"
                                        type="password"
                                        id="repassword"
                                        required />
                                </div>
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
}

export default SignUpModal;