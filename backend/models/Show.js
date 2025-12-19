const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  genre: { type: String, required: true },
  rating: { type: Number, default: 0 },
  poster: { type: String, default: '' },
  showtimes: [{
    date: { type: Date, required: true },
    time: { type: String, required: true },
    theater: { type: String, required: true },
    totalSeats: { type: Number, default: 100 },
    availableSeats: { type: Number, default: 100 },
    price: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Show', showSchema);