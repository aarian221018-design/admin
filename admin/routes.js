// server/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const {
    getDashboardStats,
    getAllUsers,
    deleteUser,
    getAllMeals,
    deleteMeal
} = require('../controllers/adminController'); // We will create this controller next
const { protect, admin } = require('../middleware/authMiddleware');

// All routes in this file are protected and require admin access
router.use(protect, admin);

// Dashboard Stats
// GET /api/admin/stats
router.route('/stats').get(getDashboardStats);

// User Management
// GET /api/admin/users
// DELETE /api/admin/users/:id
router.route('/users').get(getAllUsers);
router.route('/users/:id').delete(deleteUser);

// Meal/Food Management
// GET /api/admin/meals
// DELETE /api/admin/meals/:id
// You can also add PUT for updating and POST for creating meals here
router.route('/meals').get(getAllMeals);
router.route('/meals/:id').delete(deleteMeal);

module.exports = router;