import React, {Component} from "react";

class SignInModal extends Component {
    render() {
        return (
            <div className="modal fade rounded" id="signin-modal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mx-auto" style={{maxWidth: "400px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-secondary font-weight-600">Welcome back</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body p-3 p-sm-4">
                            <ul className="nav nav-pills nav-justified tab-nav" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a
                                        className="nav-link active"
                                        id="guardian-tab"
                                        data-toggle="tab"
                                        href="#guardian"
                                        role="tab"
                                        aria-controls="guardian"
                                        aria-selected="true">
                                        <img
                                            src={process.env.PUBLIC_URL + '/assets/images/guardian.png'}
                                            className="mr-2"
                                            alt=""
                                            style={{height: "45px"}} />
                                            Login as<br />Guardian
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="tutor-tab" data-toggle="tab" href="#tutor"
                                        role="tab"
                                        aria-controls="tutor"
                                        aria-selected="false">
                                        <img src={process.env.PUBLIC_URL + '/assets/images/tutor.png'}
                                            className="mr-2"
                                            alt=""
                                            style={{height: "45px"}} />
                                        Login as<br />Tutor
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="guardian"
                                    role="tabpanel"
                                    aria-labelledby="guardian-tab">
                                    <form method="POST" className="row">
                                        <div className="form-group mb-20 col-12">
                                            <label
                                                className="text-secondary h6 font-weight-600 mb-2"
                                                htmlFor="email">
                                                Email Address*</label>
                                            <input
                                                className="form-control shadow-none rounded-sm"
                                                type="email"
                                                id="emaill"
                                                required />
                                        </div>
                                        <div className="form-group mb-20 col-12">
                                            <label
                                                className="text-secondary h6 font-weight-600 mb-2"
                                                htmlFor="passwordSignIn">
                                                Password*</label>
                                            <input
                                                className="form-control shadow-none rounded-sm"
                                                type="password"
                                                id="passwordSignIn"
                                                required />
                                        </div>
                                        <div className="form-group col-12">
                                            <button
                                                className="btn btn-primary w-100 rounded-sm"
                                                type="submit">
                                                Sign In
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="tutor"
                                    role="tabpanel"
                                    aria-labelledby="tutor-tab">
                                    <form method="POST" className="row">
                                        <div className="form-group mb-20 col-12">
                                            <label
                                                className="text-secondary h6 font-weight-600 mb-2"
                                                htmlFor="email">
                                                Email Address*</label>
                                            <input
                                                className="form-control shadow-none rounded-sm"
                                                type="email"
                                                id="email"
                                                required />
                                        </div>
                                        <div className="form-group mb-20 col-12">
                                            <label
                                                className="text-secondary h6 font-weight-600 mb-2"
                                                htmlFor="passwordSignIn">
                                                Password*</label>
                                            <input
                                                className="form-control shadow-none rounded-sm"
                                                type="password"
                                                id="passwordSignInn"
                                                required />
                                        </div>
                                        <div className="form-group col-12">
                                            <button
                                                className="btn btn-primary w-100 rounded-sm"
                                                type="submit">
                                                Sign In
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInModal;