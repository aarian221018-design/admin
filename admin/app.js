// client/src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import AdminRoute from './components/AdminRoute';
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        {/* ... your other public routes like Home, Login, etc. */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          {/* Add other admin routes here (e.g., /admin/meals) */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;