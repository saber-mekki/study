import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignInModal = () => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    try {
      const response = await axios.post('http://localhost:5000/api/v1/login', { email, password });

      localStorage.setItem('authToken', response.data.result.token);
      history.push('/dashboard');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setEmailError('Email not found. Please check.');
        } else if (err.response.status === 401) {
          setPasswordError('Invalid password. Please try again.');
        } else {
          setPasswordError('An error occurred. Please try again.');
        }
      } else {
        setPasswordError('Server not responding. Please try later.');
      }
    }
  };

  return (
    <div className="modal fade rounded" id="signin-modal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered mx-auto" style={{ maxWidth: '400px' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title text-secondary font-weight-600">Welcome back</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body p-3 p-sm-4">
            <form onSubmit={handleSubmit} className="row">
              <div className="form-group mb-20 col-12">
                <label className="text-secondary h6 font-weight-600 mb-2" htmlFor="email">
                  Email Address*
                </label>
                <input
                  className="form-control shadow-none rounded-sm"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && (
                  <div className="center-error">
                    <div className="text-danger">{emailError}</div>
                  </div>
                )}              </div>

              <div className="form-group mb-20 col-12">
                <label className="text-secondary h6 font-weight-600 mb-2" htmlFor="passwordSignIn">
                  Password*
                </label>
                <input
                  className="form-control shadow-none rounded-sm"
                  type="password"
                  id="passwordSignIn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordError && <div className="center-error">
                  <div className="text-danger">{passwordError}</div> </div>}               </div>

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
