//EditExpense.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../API/API';
import './EditExpense.css';
import { Spinner } from 'react-bootstrap';

const EditExpense = () => {
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem('userId');
  const storedExpenseId = localStorage.getItem('editExpenseId');

  const [expenseData, setExpenseData] = useState({
    title: '',
    category: '',
    date: '',
    price: 0,
    quantity: 0,
    description: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!storedUserId || !storedToken) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const response = await axios.get(`${API}expenses/details/${storedUserId}/${storedExpenseId}`);
        const { data } = response;
        const formattedDate = new Date(data.expenseDetails.date).toISOString().split('T')[0];
        setExpenseData({ ...data.expenseDetails, date: formattedDate });
      } catch (error) {
        console.error('Error fetching expense details:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchExpenseDetails();
  }, [storedUserId, storedExpenseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API}expenses/edit`, {
        userId: storedUserId,
        expenseId: storedExpenseId,
        ...expenseData, 
      });

      if (response.status === 200) {
        toast.success('Expense Updated!');
        localStorage.removeItem('editExpenseId'); 
        navigate('/dashboard/allExpenses');
      }
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mb-5 mt-2">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/addExpense.jpg" alt="Expense" className="img-fluid expense-image" />
        </div>
        <div className="col-md-6 form-expense">
          <h1 className='text-center text-white fw-bold mt-4 mb-4'>Edit Expense</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group m-2">
              <input
                type="text"
                className="form-control mb-2"
                id="title"
                name="title"
                placeholder="Enter Title"
                value={expenseData.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2">
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                placeholder="Enter Category"
                value={expenseData.category}
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2">
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={expenseData.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2">
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                placeholder="Enter Price"
                value={expenseData.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2">
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                placeholder="Enter Quantity"
                value={expenseData.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2">
              <textarea
                className="form-control descriptionEdit-expense"
                placeholder="Enter Description"
                id="description"
                name="description"
                value={expenseData.description}
                onChange={handleChange}
              />
            </div>
            <div className="m-2 text-center">
              <button type="submit" className="btn text-white fw-bold w-50 btn-warning">
                Update Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
