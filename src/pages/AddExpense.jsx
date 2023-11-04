//AddExpense.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../API/API';
import { Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './AddExpense.css';

const AddExpense = () => {
  const [expenseDetails, setExpenseDetails] = useState({
    title: '',
    category: '',
    date: '',
    price: '',
    quantity: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!storedUserId || !storedToken) {
      navigate('/login');
    }
  }, [navigate]);

  const handleAddExpense = async (e) => {
    e.preventDefault();

    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (
      !expenseDetails.title ||
      !expenseDetails.category ||
      !expenseDetails.date ||
      !expenseDetails.price ||
      !expenseDetails.quantity
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API}expenses/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ userId: storedUserId, ...expenseDetails }),
      });

      if (response.ok) {
        toast.success('Expense added successfully.');
        setExpenseDetails({
          title: '',
          category: '',
          date: '',
          price: '',
          quantity: '',
          description: '',
        });
      } else {
        toast.error('Failed to add the expense. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to add the expense. Please try again.', error);
      console.error('Error adding expense:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseDetails({ ...expenseDetails, [name]: value });
  };

  return (
    <div className="container mb-5 mt-2">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src="/images/addExpense.jpg" alt="Expense" className="img-fluid expense-image" />
        </div>
        <div className="col-md-6 form-expense">
          <h1 className='text-center text-white fw-bold mt-4 mb-4'>Add Expense</h1>
          {loading ? ( 
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <form onSubmit={handleAddExpense}>
              <div className="form-group m-2">
                <input
                  type="text"
                  name="title"
                  value={expenseDetails.title}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Enter Title"
                />
              </div>
              <div className="form-group m-2">
                <input
                  type="text"
                  name="category"
                  value={expenseDetails.category}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Category"
                />
              </div>
              <div className="form-group m-2">
                <input
                  type="date"
                  name="date"
                  value={expenseDetails.date}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group m-2">
                <input
                  type="number"
                  name="price"
                  value={expenseDetails.price}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Price"
                />
              </div>
              <div className="form-group m-2">
                <input
                  type="number"
                  name="quantity"
                  value={expenseDetails.quantity}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Quantity"
                />
              </div>
              <div className="form-group m-2">
                <input
                  type="text"
                  name="description"
                  value={expenseDetails.description}
                  onChange={handleChange}
                  className="form-control description-expense"
                  placeholder="Enter Description"
                />
              </div>
              <div className="m-2 text-center">
                <button type="submit" className="btn btn-primary w-50">
                  Add Expense
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
