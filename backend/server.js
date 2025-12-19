const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const NodeCache = require('node-cache');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const showRoutes = require('./routes/shows');
const bookingRoutes = require('./routes/bookings');

const app = express();
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes cache

// Middleware
app.use(cors());
app.use(express.json());

// Make cache available globally
app.locals.cache = cache;

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});