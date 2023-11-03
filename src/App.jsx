// App.jsx
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import EmailOTPVerification from './pages/EmailOTPVerification';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordVerification from './pages/ForgotPasswordVerification';
import LandingPage from './pages/LandingPage';
import User from './pages/User';
import EditUser from './pages/EditUser';
import EditUserOtp from './pages/EditUserOtp';
import Header from './components/Header';
import AddCapital from './pages/AddCapital';
import EditCapital from './pages/EditCapital';
import AddExpense from './pages/AddExpense';
import AllExpenses from './pages/AllExpenses';
import EditExpense from './pages/EditExpense';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <div className='App'>
    <Router>
      <Header/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verifyEmail" element={<EmailOTPVerification/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/forgotPasswordVerification" element={<ForgotPasswordVerification/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/dashboard/user" element={<User />}/>
        <Route path="/dashboard/editProfile" element={<EditUser/>}/>
        <Route path="/dashboard/editUserOtp" element={<EditUserOtp/>}/>
        <Route path="/dashboard/addCapital" element={<AddCapital/>}/>
        <Route path="/dashboard/editCapital" element={<EditCapital/>}/>
        <Route path="/dashboard/addExpense" element={<AddExpense/>}/>
        <Route path="/dashboard/allExpenses" element={<AllExpenses/>}/>
        <Route path="/dashboard/editExpense" element={<EditExpense/>}/>
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
