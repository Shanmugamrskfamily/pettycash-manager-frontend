import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { useNavigate } from 'react-router-dom';
import { API } from '../API/API';
import { Spinner } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
  const [capitalBalance, setCapitalBalance] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [expenseTransactionCount, setExpenseTransactionCount] = useState(0);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!userId || !storedToken) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [capitalResponse, totalExpenseResponse, expenseTransactionResponse] = await Promise.all([
          axios.get(`${API}capital/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          }),
          axios.get(`${API}expenses/cumulativeTotal/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          }),
          axios.get(`${API}expenses/total/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
        ]);

        setCapitalBalance(capitalResponse.data.capitalAmount);
        setTotalExpenseAmount(totalExpenseResponse.data.total);
        setExpenseTransactionCount(expenseTransactionResponse.data.totalTransactionsCount);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); 
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="mt-2 mb-5">
      {loading ? ( 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
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
      )}
    </div>
  );
};

export default Dashboard;
