//ChartComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { API } from '../API/API';
import './ChartComponent.css'

const ChartComponent = () => {
  const [chartData, setChartData] = useState({});
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}expenses/totalPriceAndDate/${userId}`
        );

        const expensesData = response.data.expenses;
        const dates = expensesData.map((expense) => expense.date);
        const totalPrice = expensesData.map((expense) => expense.totalPrice);

        
        const formattedDates = dates.map((date) => {
          const newDate = new Date(date);
          return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
        });

        setChartData({
          labels: formattedDates,
          datasets: [
            {
              label: 'Expenses',
              data: totalPrice,
              fill: false,
              borderColor: 'rgb(151, 15, 33)',
              tension: 0.1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData.labels && chartData.datasets) {
      if (myChart) {
        myChart.data = chartData;
        myChart.update();
      } else {
        const ctx = document.getElementById('myChart');
        const newChart = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
        setMyChart(newChart);
      }
    }
  }, [chartData]);

  return (
    <div className="container-chart bg-light">
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default ChartComponent;
