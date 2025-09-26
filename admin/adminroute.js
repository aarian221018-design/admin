// client/src/components/AdminRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// This assumes you store user info in localStorage after login.
// Adapt this to your state management (e.g., Redux, Context API).
const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  return user && user.role === 'admin';
};

const AdminRoute = () => {
  const isAdmin = useAuth();
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;