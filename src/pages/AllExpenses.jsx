import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { API } from '../API/API';
import './AllExpenses.css';
import { toast } from 'react-toastify';

const AllExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!storedUserId || !storedToken) {
      navigate('/login');
    } else {
      fetchExpenses(storedUserId, storedToken);
    }
  }, [navigate]);

  const fetchExpenses = async (userId, token) => {
    try {
      const response = await axios.get(`${API}expenses/all/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setExpenses(response.data.expenseTransactions);
      } else {
        console.error('Error fetching expenses:', response.status);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleEdit = (expenseId) => {
    localStorage.setItem('editExpenseId', expenseId);
    console.log(expenseId);
    navigate('/dashboard/editExpense');
  };

  const handleDelete = async (expenseId, title) => {
    const confirmationMessage = `Are you sure you want to delete the transaction: ${title}?`;
    const confirmation = window.confirm(confirmationMessage);

    if (confirmation) {
      const storedUserId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token');

      try {
        const response = await axios.delete(`${API}expenses/delete/${storedUserId}/${expenseId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.status === 200) {
            toast.success("Expense Deleted!")
          fetchExpenses(storedUserId, storedToken);
        } else {
          console.error('Failed to delete the transaction:', response.status);
        }
      } catch (error) {
        console.error('Error while deleting the transaction:', error);
      }
    }
  };

  const handleExportTransactions = () => {
    const doc = new jsPDF();
  
    doc.text(20, 20, 'All Expenses');
  
    expenses.forEach((expense, index) => {
      const startY = 30 + index * 80;
      doc.line(10, startY + 70, 200, startY + 70);
      doc.text(20, startY, `Title: ${expense.title}`);
      doc.text(20, startY + 10, `Category: ${expense.category}`);
      doc.text(20, startY + 20, `Date: ${expense.date}`);
      doc.text(20, startY + 30, `Description: ${expense.description}`);
      doc.text(20, startY + 40, `Price: ${expense.price}`);
      doc.text(20, startY + 50, `Quantity: ${expense.quantity}`);
      doc.text(20, startY + 60, `Total Price: ${expense.totalPrice}`);
      

    });
  
    doc.save('Expenses_Transactions.pdf');
  };
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center heading text-white">All Expenses</h1>
      <div className="d-flex justify-content-end mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by title or description"
          onChange={handleSearch}
        />
        <button onClick={handleExportTransactions} className="btn btn-success">
          Export Transaction to PDF
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredExpenses.map((expense) => (
          <div key={expense._id} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">{expense.title}</h5>
                <h6 className="card-subtitle mb-2 text-center text-muted">{expense.category}</h6>
                <hr />
                <p className="card-text">Date: {new Date(expense.date).toLocaleDateString('en-GB')}</p>
                <p className="card-text">Description: {expense.description}</p>
                <p className="card-text">Price: ₹{expense.price}</p>
                <p className="card-text">Quantity: {expense.quantity}</p>
                <p className="card-text">Total Price: ₹{expense.totalPrice}</p>
                <div className="d-grid text-center gap-2 d-md-block mt-3">
                  <button onClick={() => handleEdit(expense._id)} className="btn w-40 btn-primary me-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(expense._id, expense.title)} className="btn w-40 btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllExpenses;