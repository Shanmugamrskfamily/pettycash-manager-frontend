//EditCapital.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../API/API';
import { Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './EditCapital.css';

const EditCapital = () => {
  const [capitalAmount, setCapitalAmount] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!storedUserId || !storedToken) {
      navigate('/login');
    } else {
      getCapitalAmount(storedUserId, storedToken);
    }
  }, [navigate]);

  const getCapitalAmount = async (userId, token) => {
    try {
      setLoading(true); 
      const response = await fetch(`${API}capital/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCapitalAmount(data.capitalAmount || '');
      } else {
        console.error('Error fetching capital amount:', response.status);
      }
    } catch (error) {
      console.error('Error fetching capital amount:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCapital = async (e) => {
    e.preventDefault();

    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!capitalAmount) {
      toast.error('Please enter the capital amount.');
      return;
    }

    try {
      setLoading(true); 
      const response = await fetch(`${API}capital/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ userId: storedUserId, newAmount: capitalAmount }),
      });

      if (response.ok) {
        toast.success('Capital amount updated successfully.');
        navigate('/dashboard');
      } else {
        toast.error('Failed to update capital amount. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to update capital amount. Please try again.', error);
      console.error('Error updating capital amount:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container mb-5 mt-2">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/addCapital.jpg" alt="Login" className="img-fluid capitalEdit-image" />
        </div>
        <div className="col-md-6 capitalEdit d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h1 className='text-center mb-3 text-white'>Edit Capital</h1>
            {loading ? ( 
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <form onSubmit={handleEditCapital}>
                <div className="form-group m-2">
                  <input
                    type="number"
                    value={capitalAmount}
                    onChange={(e) => setCapitalAmount(e.target.value)}
                    className="form-control mb-2"
                    placeholder="Enter Updated Capital Amount"
                  />
                </div>
                <div className='text-center'>
                  <button type="submit" className="btn w-50 btn-warning">
                    Update Capital
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCapital;
