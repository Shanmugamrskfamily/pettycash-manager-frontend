//AddCapital.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../API/API';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './AddCapital.css';

const AddCapital = () => {
  const [capitalAmount, setCapitalAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!storedUserId || !storedToken) {
      navigate('/login');
    }
  }, [navigate]);

  const handleAddCapital = async (e) => {
    e.preventDefault();

    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!capitalAmount) {
      toast.error('Please enter the capital amount.');
      return;
    }

    setLoading(true); 

    try {
      const response = await fetch(`${API}capital/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ userId: storedUserId, amount: capitalAmount }),
      });

      if (response.ok) {
        toast.success('Capital added successfully.');
        setCapitalAmount('');
        navigate('/dashboard');
      } else {
        toast.error('Failed to add capital. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to add capital. Please try again.', error);
      console.error('Error adding capital:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container mb-5 mt-2">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/addCapital.jpg" alt="Login" className="img-fluid capital-image" />
        </div>
        <div className="col-md-6 capital-bg d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h1 className="text-center mb-3 text-white">Add Capital</h1>
            <form onSubmit={handleAddCapital}>
              <div className="form-group m-2">
                <input
                  type="number"
                  value={capitalAmount}
                  onChange={(e) => setCapitalAmount(e.target.value)}
                  className="form-control mb-2"
                  placeholder="Enter Capital Amount"
                />
              </div>
              <div className="text-center">
                {loading ? ( 
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <button type="submit" className="btn w-50 btn-primary">
                    Add Capital
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

export default AddCapital;