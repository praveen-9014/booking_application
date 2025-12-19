const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const NodeCache = require('node-cache');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const showRoutes = require('./routes/shows');
const bookingRoutes = require('./routes/bookings');

const app = express();
const cache = new NodeCache({ stdTTL: 600 }); 

app.use(cors());
app.use(express.json());

app.locals.cache = cache;

app.get('/debug/cache', (req, res) => {
  const cache = req.app.locals.cache;
  if (!cache) return res.status(500).json({ message: 'Cache not initialized' });

  const cacheKeys = cache.keys();
  const cacheData = {};
  cacheKeys.forEach(key => {
    cacheData[key] = cache.get(key);
  });

  res.json({ keys: cacheKeys, values: cacheData });
});




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