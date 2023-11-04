//EditUser.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../API/API';
import { RingLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './EditUser.css'

const EditUser = () => {
    const [user, setUser] = useState({
      name: '',
      mobileNumber: 0,
      newEmail: '',
      avatar: ''
    });
    const [avatarList, setAvatarList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedToken = localStorage.getItem('token');
    
        if (!storedUserId || !storedToken) {
          navigate('/login');
        } else {
          fetchUserData(storedUserId,storedToken);
          fetchAvatarList();
        }
      }, [navigate]);

      const fetchUserData = async (userId,token) => {
        try {
          const response = await fetch(`${API}user/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            
            setUser({
              name: data.user.name || '',
              mobileNumber: data.user.mobileNumber || '',
              newEmail: data.user.email|| '', 
              avatar: data.user.avatar || '',
            });
          } else {
            console.error('Error fetching transaction data:', response.status);
          }
        } catch (error) {
          console.error('Error fetching transaction data:', error);
        }
      };
      const fetchAvatarList = async () => {
        try {
          const response = await fetch(`${API}avatars`);
          if (response.ok) {
            const data = await response.json();
            setAvatarList(data.avatars);
          } else {
            console.error('Error fetching avatar list:', response.status);
            toast.error('Error fetching avatar list:', response.status);
          }
        } catch (error) {
          console.error('Error fetching avatar list:', error);
          toast.error('Error fetching avatar list:', error);
        }
      };

      const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true); 
    
        try {
          const storedUserId = localStorage.getItem('userId');
          const storedToken = localStorage.getItem('token');
          localStorage.setItem('newUserName', user.name);
          localStorage.setItem('newEmail', user.newEmail);
          localStorage.setItem('newMobileNumber', user.mobileNumber);
          localStorage.setItem('newAvatar', user.avatar);
    
          const response = await fetch(`${API}sendOTP/${storedUserId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedToken}`,
            },
            body: JSON.stringify(user),
          });
    
          if (response.ok) {
            toast.success('Email OTP sent!');
            navigate('/dashboard/editUserOtp');
          } else {
            toast.error('Failed to update user. Please try again.');
          }
        } catch (error) {
          toast.error('Failed to update user. Please try again.', error);
          console.error('Error updating user:', error);
        } finally {
          setLoading(false); 
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };
    

      return (
        <div className="container mb-5 mt-2">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/user.jpg" alt="Signup" className="img-fluid userEdit-image" />
        </div>
        <div className="col-md-6 userEdit-bg">
          <h1 className='text-center text-white fw-bold mt-4 mb-4'>Edit User Details</h1>
          <form onSubmit={handleUpdate}>
          <div className="form-group m-2">
              <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" placeholder="Name" />
            </div>
            <div className="form-group m-2">
              <input type="number" name="mobileNumber" value={user.mobileNumber} onChange={handleChange} className="form-control" placeholder="Mobile Number" />
            </div>
            <div className="form-group m-2">
              <input type="email" name="newEmail" value={user.newEmail} onChange={handleChange} className="form-control" placeholder="Email" />
            </div>
            <div className="form-group m-2">
              <select name="avatar" value={user.avatar} onChange={handleChange} className="form-select">
                <option value="">Select Avatar</option>
                {avatarList.map((avatar, index) => (
                  <option key={index} value={avatar.link}>
                    {avatar.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='text-center'>
            {loading ? (
              <RingLoader className='text-center' color={'#123abc'} loading={loading} size={50} /> 
            ) : (
              <button type="submit" className="btn btn-warning">
                Update User / Send OTP
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  </div>
      );
    };
    
    export default EditUser;