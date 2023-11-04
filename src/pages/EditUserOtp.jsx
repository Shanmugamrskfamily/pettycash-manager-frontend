//EditUserOtp.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../API/API';
import { RingLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './EditUserOtp.css'

const EditUserOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!storedUserId || !storedToken) {
      navigate('/login');
    }
  }, [navigate]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newEmail = localStorage.getItem('newEmail');
    const newName = localStorage.getItem('newUserName');
    const newMobileNumber = localStorage.getItem('newMobileNumber');
    const newAvatar = localStorage.getItem('newAvatar');

    try {
      const storedUserId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token');

      if (!storedUserId || !storedToken) {
        navigate('/login');
        return;
      }

      const userData = {
        userId: storedUserId,
        otp,
        newEmail,
        newName,
        newMobileNumber,
        newAvatar,
      };

      const response = await fetch(`${API}editUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        localStorage.setItem('avatar', newAvatar);
        localStorage.setItem('userName', newName);

        localStorage.removeItem('newUserName');
        localStorage.removeItem('newEmail');
        localStorage.removeItem('newAvatar');
        localStorage.removeItem('newMobileNumber');
        toast.success('User Details Updated✅ and Confirmation Email 📧 Sent!')
        navigate('/dashboard/user');
      } else {
        toast.error('Invalid OTP ❌, Please try again.');
      }
    } catch (error) {
      toast.error('Failed to update user details. Please try again.', error);
      console.error('Error updating user:', error);
    }
    finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container mb-5 mt-2">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/OTP.jpg" alt="Forgot Password" className="img-fluid ediUserOtp-image" />
        </div>
        <div className="col-md-6 ediUserOtp-bg d-flex align-items-center justify-content-center">
          <div className="w-75">
          <h1 className='text-center mb-3 text-white'>Enter OTP</h1>
          <h6 className='msgUserEdit'>If not Received, Check your Email Inbox/Spam Folder</h6>
      <form onSubmit={handleOtpSubmit}>
      <div className="mb-3 text-center">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="form-control mb-2"
            placeholder="Enter OTP"
          />
        </div>
        <div className='text-center'>
            {loading ? (
              <RingLoader color={'#123abc'} className='text-center' loading={loading} size={50} /> 
            ) : (
              <button type="submit" className="btn w-50 btn-success">
                Submit OTP
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

export default EditUserOtp;