//EmailOTPVerification.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../API/API';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Login.css'

const EmailOTPVerification = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (token && userId && userName) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}verifyEmail`, { token });

      if (response.status === 200) {
        toast.success('OTP verified. Redirecting to login.'); // Successful verification notification
        navigate('/login');
      } else {
        toast.error('OTP verification failed'); 
      }
    } catch (error) {
      console.error('Error verifying OTP: ', error);
      toast.error('Failed to verify OTP. Please try again.'); // Error notification
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
      <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/OTP.jpg" alt="Verification" className="img-fluid" />
        </div>
        <div className="col-md-6 login-bg d-flex align-items-center justify-content-center">
          <div className="mx-auto w-75">
            <h1 className='text-white'>Email OTP Verification</h1>
            <h6 className='msg'>If not Received, Check your Email Inbox/Spam Folder</h6>
            <form onSubmit={handleVerifyOTP}>
              <div className="mb-3 text-center">
                <label htmlFor="token" className="form-label  text-white">Enter OTP 👇🏻</label>
                <input
                  type="text"
                  id="token"
                  placeholder='Enter OTP Here'
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className='text-center'>
              <button type="submit" className="btn w-50 btn-primary">
                Verify OTP
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailOTPVerification;
