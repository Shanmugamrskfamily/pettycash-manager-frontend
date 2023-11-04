//LandingPage.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (token && userId && userName) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="container container-landing mt-2 mb-5">
      <div className="row">
        <div className="col-md-6 mt-2 d-flex align-items-center justify-content-center">
          <img src="/images/LandingPage.jpg" alt="Signup" className="img-fluid landing-image" />
        </div>
        <div className="col-md-6 mt-2 landing-primary">
          <h1 className='text-center laning-heading'>Welcome to RSK PettyCash Manager</h1>
          <p className='text-white'>
            This petty cash manager is responsible for overseeing and maintaining accurate records of a small fund used for everyday expenses, ensuring proper authorization and documentation of all transactions.
          </p>
          <h4 className='text-warning bg-gradient-light mt-4'>Features of This Application:</h4>
          <div className="container mt-4">
          <div className="row">
          <div className="col text-center">
            <b className='topic'>User Management</b>
            <ul className="text-white">
              <li className="list-group-item">Signup</li>
              <li className="list-group-item">User Email Verification</li>
              <li className="list-group-item">Login</li>
              <li className="list-group-item">Forgot Password Reset Flow</li>
              <li className="list-group-item">User Profile Update Flow</li>
            </ul>
          </div>
          <div className="col text-center">
            <b className='topic'>Expense Management</b>
            <ul className="text-white">
              <li className="list-group-item">Dashboard with Expenses chart and Acounting Details</li>
              <li className="list-group-item">Add and Edit Capital Amount</li>
              <li className="list-group-item">Add/Edit/Delete Expense</li>
              <li className="list-group-item">Get All Expense Details</li>
              <li className="list-group-item">Download All Expenses in PDF</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
        <div className='text-center mt-2'>
          <Link to="/login" className="btn w-50 btn-primary me-3">
            Login
          </Link>
          <Link to="/signup" className="btn w-50 btn-success">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
