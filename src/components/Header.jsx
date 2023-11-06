//Header.jsx
import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useLocation } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState('');
  const userName = localStorage.getItem('userName');
  const avatar = localStorage.getItem('avatar');

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);


  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('avatar');
    localStorage.removeItem('transactionId');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  const shouldShowLogin = !['/login', '/dashboard','/dashboard/addCapital','/dashboard/addExpense','/dashboard/allExpenses','/dashboard/chart','/dashboard/user','/dashboard/editProfile','/dashboard/editUserOtp','/dashboard/editExpense','/dashboard/editCapital'].includes(location.pathname);
  const shouldShowSignup = !['/signup', '/dashboard','/dashboard/addCapital','/dashboard/addExpense','/dashboard/allExpenses','/dashboard/chart','/dashboard/user','/dashboard/editProfile','/dashboard/editUserOtp','/dashboard/editExpense','/dashboard/editCapital'].includes(location.pathname);
  const shouldShowdashboard=!['/','/signup','/login','/forgotPassword','/verifyEmail','/forgotPasswordVerification'].includes(location.pathname);
  return (
    <nav className="navbar sticky-top navbar-expand-lg header-container">
      <Link to="/">
        <img
          src="/images/logoimg.svg"
          height="60"
          width="100"
          className="navbar-brand round rounded-circle"
          alt="Brand Logo"
        />
      </Link>
      <button
        className="navbar-toggler bg-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon "></span>
      </button>
      <div
        className="collapse ml-2 navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          {shouldShowSignup && (
            <li className="nav-item active">
              <Link className="nav-link signup" to="/signup">
                Signup <i className="fa-solid fa-right-to-bracket"></i>
              </Link>
            </li>
          )}
          {shouldShowLogin && (
            <li className="nav-item active">
              <Link className="nav-link login" to="/login">
                Login <i className="fa-solid fa-right-to-bracket"></i>
              </Link>
            </li>
          )}
          {shouldShowdashboard && (
            <>
              <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item dropdown me-3">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="addTransactionDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Add Transaction
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="addTransactionDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/dashboard/addExpense">
                      Add Expense
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/dashboard/addCapital">
                      Add Capital
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/dashboard/allExpenses">
                  All Expenses/ Update
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/dashboard/editCapital">
                  Edit Capital
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/user">
                  <img
                    src={avatar}
                    width="80"
                    height="40"
                    alt="Avatar"
                    className="avatar"
                  />
                  <span>{userName}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  type="button"
                  onClick={handleLogout}>
                  Logout <i className="fa-solid fa-right-from-bracket"></i>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;