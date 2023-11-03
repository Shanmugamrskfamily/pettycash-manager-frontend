//User.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './User.css';

const User = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    if (!storedUserId || !storedToken) {
      navigate('/login');
    } else {
      fetchUserData(storedUserId, storedToken);
    }
  }, [navigate]);

  const fetchUserData = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:4505/api/user/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        // toast.success('User Details Loaded Successfully!');
      } else {
        console.error('Error fetching user data:', response.status);
        toast.error('Error fetching user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Error fetching user data:', error);
    }
  };

  const handleEditProfile = () => {
    navigate('/dashboard/editProfile');
  };

  return (
    <div className="container mt-5 user-primary">
      <h1 className='text-center userHeading'>User Information/ Update</h1>
      <div className="row text-white">
        <div className="col-md-6">
          <p>Name: {userData.user?.name}</p>
          <p>Mobile Number: {userData.user?.mobileNumber}</p>
          <p>Email: {userData.user?.email}</p>
          <p>Password: ************</p>
        </div>
        <div className="col-md-6 text-center">
          <img src={userData.user?.avatar} alt="User Avatar" className="img-fluid rounded-circle" style={{ maxWidth: '200px' }} />
        </div>
        <div className='text-center mt-3'>
        <button onClick={handleEditProfile} className="btn w-50 btn-primary">
            Edit Profile
          </button>
          <p className='msgUser'>OTP Will send for Edit User Information</p>
          </div>
      </div>
    </div>
  );
};

export default User;
