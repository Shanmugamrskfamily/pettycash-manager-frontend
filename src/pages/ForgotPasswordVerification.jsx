//ForgotPasswordVerification.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../API/API';
import './Login.css'

const ForgotPasswordVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

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

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      toast.error('Password must be at least 8 characters long and contain 1 uppercase letter, 1 number, and 1 symbol.');
      return;
    }

    try {
      const response = await axios.post(`${API}resetPassword`, { otp, newPassword });

      if (response.status === 200) {
        // Password reset and update successful, navigate to login page
        toast.success('Password reset and update successful.');
        navigate('/login');
      } else {
        toast.error('Failed to reset the password. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password: ', error);
      toast.error('Failed to reset the password. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/OTP.jpg" alt="Login" className="img-fluid login-image" />
        </div>
        <div className="col-md-6 login-bg d-flex align-items-center justify-content-center">
          <div className="w-75">
      <h2 className='text-center mb-3 text-white'>Forgot Password Verification</h2>
      <form onSubmit={handleVerifyOTP}>
      <div className="form-group m-2">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="form-control m-2"
        />
        </div>
        <div className="form-group m-2">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-control m-2"
        />
        </div>
        <div className='text-center'>
        <button type="submit" className="btn btn-primary w-50 m-2">
          Verify OTP & Set New Password
        </button>
        </div>
      </form>
      </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordVerification;
