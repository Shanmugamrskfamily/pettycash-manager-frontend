//ForgotPassword.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../API/API';
import { Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Login.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (token && userId && userName) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}sendPasswordResetLink`, { email });

      if (response.status === 200) {
        toast.success('Password reset OTP sent to your email.');
        navigate('/forgotPasswordVerification');
      } else {
        setErrorMessage('Failed to send OTP. Please try again.');
        toast.error('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending password reset link: ', error);
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mb-5 mt-2">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/PasswordReset.jpg" alt="Forgot Password" className="img-fluid login-image" />
        </div>
        <div className="col-md-6 login-bg d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h1 className="text-center mb-3 text-white">Forgot Password</h1>
            <form onSubmit={handleForgotPassword}>
              <div className="form-group m-2">
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errorMessage && <p>{errorMessage}</p>}
              <div className="text-center">
                {loading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <button type="submit" className="btn btn-primary w-50 m-2">
                    Send OTP
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;