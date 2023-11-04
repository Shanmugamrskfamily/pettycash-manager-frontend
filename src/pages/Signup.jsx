//Signup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../API/API';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Spinner } from 'react-bootstrap';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [avatarList, setAvatarList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (token && userId && userName) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get(`${API}avatars`);
        if (response.status === 200) {
          setAvatarList(response.data.avatars);
        }
      } catch (error) {
        toast.error('Error Fetching Avatar:', error);
        console.log('Error Fetching Avatar: ', error);
      }
    };
    fetchAvatars();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validatePassword()) {
      toast.error('Password must be at least 8 characters long and contain 1 uppercase letter, 1 number, and 1 symbol.');
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(`${API}signup`, {
        name,
        email,
        mobileNumber,
        password,
        avatar: selectedAvatar,
      });

      if (response.status === 201) {
        toast.success('Signup successful! Please verify your email.');
        navigate('/verifyEmail');
      } else {
        toast.error('Signup failed');
        console.log('Error: Unexpected status code:', response.status);
      }
    } catch (error) {
      toast.error('Signup error: ' + error);
      console.error('SignUp Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="container mt-2 mb-5">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/Signup.jpg" alt="Signup" className="img-fluid signup-image" />
        </div>
        <div className="col-md-6 form-bg">
          <h1 className="text-center text-white fw-bold mt-4 mb-4">Signup</h1>
          <form onSubmit={handleSignup}>
            <div className="form-group m-2">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group m-2">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group m-2">
              <input
                type="number"
                placeholder="Mobile"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group m-2">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group m-2">
              <select
                value={selectedAvatar}
                onChange={(e) => setSelectedAvatar(e.target.value)}
                className="form-control"
              >
                <option value="">Select Avatar</option>
                {avatarList.map((avatar) => (
                  <option key={avatar._id} value={avatar.link}>
                    {avatar.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center">
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <>
                  <button type="submit" className="btn btn-primary w-50 m-2">
                    Signup
                  </button>
                  <h4 className="text-white">Waiting For Email Verification👇🏻?</h4>
                  <Link className="bg-light" to="/verifyEmail">
                    Verify Email with OTP
                  </Link>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;