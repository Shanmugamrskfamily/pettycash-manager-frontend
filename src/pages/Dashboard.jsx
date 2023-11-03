import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent'; 
import { useNavigate } from 'react-router-dom';
import { API } from '../API/API';
import './Dashboard.css'

const Dashboard = () => {
  const [capitalBalance, setCapitalBalance] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [expenseTransactionCount, setExpenseTransactionCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!userId || !storedToken) {
      navigate('/login');
      return;
    }

    const fetchCapitalBalance = async () => {
      try {
        const response = await axios.get(`${API}capital/${userId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        
        setCapitalBalance(response.data.capitalAmount);
        

      } catch (error) {
        console.error('Error fetching capital balance:', error);
      }
    };

    const fetchTotalExpenseAmount = async () => {
      try {
        const response = await axios.get(`${API}expenses/cumulativeTotal/${userId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        
        setTotalExpenseAmount(response.data.total);
      } catch (error) {
        console.error('Error fetching total expense amount:', error);
      }
    };

    const fetchExpenseTransactionCount = async () => {
      try {
        const response = await axios.get(`${API}expenses/total/${userId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        setExpenseTransactionCount(response.data.totalTransactionsCount);
      } catch (error) {
        console.error('Error fetching expense transaction count:', error);
      }
    };

    fetchCapitalBalance();
    fetchTotalExpenseAmount();
    fetchExpenseTransactionCount();
  }, [navigate]);

  return (
    <div className="mt-2 mb-5">
    <div className="container container-dashboard p-4">
      <h1 className="display-4 mb-4 fw-bold text-warning text-center">Dashboard</h1>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="p-4 rounded dashboard-success text-center">
            <h2 className="h4 font-weight-bold ">Capital Balance <i class="fa-solid fa-cash-register"></i></h2>
            <h4><p className='fw-bold'><i class="fa-solid fa-indian-rupee-sign"></i> {capitalBalance}</p></h4>
          </div>
        </div>

        <div className="col">
          <div className="p-4 rounded dashboard-danger text-center">
            <h2 className="h4 font-weight-bold ">Total Expense Amount <i class="fa-solid fa-money-bill-wheat"></i></h2>
            <h4><p className='fw-bold'><i class="fa-solid fa-indian-rupee-sign"></i> {totalExpenseAmount}</p></h4>
          </div>
        </div>

        <div className="col">
          <div className="p-4 rounded dashboard-primary text-center">
            <h2 className="h4 font-weight-bold">Expense Transaction Count</h2>
            <h4><p className='fw-bold'><i class="fa-solid fa-money-bill-trend-up"></i> {expenseTransactionCount}</p></h4>
          </div>
        </div>
      </div>
      <div className="container p-4 mt-4">
        <div className="row">
          <div className="col">
          <ChartComponent />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
