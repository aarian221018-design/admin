// client/src/pages/UserManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get('/api/admin/users', config);
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.delete(`/api/admin/users/${id}`, config);
            // Refetch users after deletion
            fetchUsers();
        } catch (err) {
            alert('Failed to delete user.');
        }
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Management</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={tdStyle}>{user._id}</td>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.role}</td>
              <td style={tdStyle}>
                <button 
                  onClick={() => deleteHandler(user._id)}
                  style={{ color: 'red', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = { padding: '12px', textAlign: 'left', background: '#f8f8f8' };
const tdStyle = { padding: '12px', textAlign: 'left' };

export default UserManagement;