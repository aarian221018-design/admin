// server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Assuming you already have a 'protect' middleware to check for a valid token.
// If not, here's an example:
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// New middleware specifically for Admin checks
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed to the next middleware/controller
    } else {
        res.status(403); // 403 Forbidden
        throw new Error('Not authorized as an admin');
    }
};

module.exports = { protect, admin };