// client/src/pages/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get token from storage
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('/api/admin/stats', config);
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const chartData = {
      labels: stats?.usersByMonth.map(item => monthNames[item._id - 1]) || [],
      datasets: [
          {
              label: 'User Signups per Month',
              data: stats?.usersByMonth.map(item => item.count) || [],
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
      ],
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      
      {/* Stat Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem' }}>
        <div style={cardStyle}>
          <h2>Total Users</h2>
          <p>{stats.totalUsers}</p>
        </div>
        <div style={cardStyle}>
          <h2>Total Meals</h2>
          <p>{stats.totalMeals}</p>
        </div>
        <div style={cardStyle}>
          <h2>Total Orders</h2>
          <p>{stats.totalOrders}</p>
        </div>
        <div style={cardStyle}>
          <h2>Total Revenue</h2>
          <p>${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Chart */}
      <div style={{ maxWidth: '800px' }}>
          <h2>Analytics</h2>
          <Bar data={chartData} />
      </div>
    </div>
  );
};

const cardStyle = {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
    flex: 1,
};


export default AdminDashboard;