//Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const avatar=localStorage.getItem('avatar');
    if (token && userId && userName) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4505/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Handle successful login, e.g., store token in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('avatar',response.data.avatar);
        toast.success('Login Successful'); // Display a success message
        navigate('/dashboard'); // Redirect to dashboard or any authorized route
      } else {
        // Handle other status codes or display a message
        console.log('Login failed, Invalid Email or Password');
        toast.error('Login failed, Invalid Email or Password'); // Display a login failure message
      }
    } catch (error) {
      console.error('Login Error: ', error);
      toast.error(`Login Error: Invalid Email or Password!`); // Display a general error message
      // Handle the error or display a message
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgotPassword');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/Login.jpg" alt="Login" className="img-fluid login-image" />
        </div>
        <div className="col-md-6 login-bg d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h2 className='text-center mb-3 text-white'>Login</h2>
            <form onSubmit={handleLogin}>
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className='text-center'>
                <button type="submit" className="btn btn-primary w-50 m-2">
                  Login
                </button>
                <h4 className='text-white'>Forgot Password👇🏻?</h4>
                <Link className='bg-light' to="/forgotPassword">
                  Reset My Password
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;