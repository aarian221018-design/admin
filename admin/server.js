// server/server.js

const express = require('express');
// ... other imports
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes

const app = express();
app.use(express.json());

// ... other app.use() statements

app.use('/api/admin', adminRoutes); // Mount the routes

// ... error handling and listener