//Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../API/API';
import { Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const avatar = localStorage.getItem('avatar');
    if (token && userId && userName) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}login`, {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('avatar', response.data.avatar);
        toast.success('Login Successful');
        navigate('/dashboard');
      } else {
        toast.error('Login failed, Invalid Email or Password');
      }
    } catch (error) {
      console.error('Login Error: ', error);
      toast.error(`Login Error: Invalid Email or Password!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-2 mb-5">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/Login.jpg" alt="Login" className="img-fluid login-image" />
        </div>
        <div className="col-md-6 login-bg d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h2 className="text-center mb-3 text-white">Login</h2>
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
              <div className="text-center">
                {loading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <>
                    <button type="submit" className="btn btn-primary w-50 m-2">
                      Login
                    </button>
                    <h4 className="text-white">Forgot Password👇🏻?</h4>
                    <Link className="bg-light" to="/forgotPassword">
                      Reset My Password
                    </Link>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
