// server/controllers/adminController.js

const User = require('../models/User');
const Meal = require('../models/Meal'); // Assuming you have a Meal model
const Order = require('../models/Order'); // Assuming you have an Order model

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        const totalMeals = await Meal.countDocuments({});
        const totalOrders = await Order.countDocuments({});

        // Calculate total revenue
        const orders = await Order.find({});
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        // For charts - e.g., monthly signups
        const usersByMonth = await User.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            totalUsers,
            totalMeals,
            totalOrders,
            totalRevenue,
            usersByMonth
        });
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};


// @desc    Get all meals
// @route   GET /api/admin/meals
// @access  Private/Admin
const getAllMeals = async (req, res) => {
    const meals = await Meal.find({});
    res.json(meals);
};

// @desc    Delete a meal
// @route   DELETE /api/admin/meals/:id
// @access  Private/Admin
const deleteMeal = async (req, res) => {
    const meal = await Meal.findById(req.params.id);
    if (meal) {
        await meal.remove();
        res.json({ message: 'Meal removed' });
    } else {
        res.status(404).json({ message: 'Meal not found' });
    }
};


module.exports = {
    getDashboardStats,
    getAllUsers,
    deleteUser,
    getAllMeals,
    deleteMeal
};