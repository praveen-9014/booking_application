const mongoose = require('mongoose');
const Show = require('./models/Show');
require('dotenv').config();

const sampleShows = [
  {
    title: "Avengers: Endgame",
    description: "The epic conclusion to the Infinity Saga",
    duration: 181,
    genre: "Action",
    rating: 8.4,
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    showtimes: [
      {
        date: new Date('2024-01-15'),
        time: "10:00 AM",
        theater: "PVR Cinemas",
        totalSeats: 100,
        availableSeats: 100,
        price: 250
      },
      {
        date: new Date('2024-01-15'),
        time: "2:00 PM",
        theater: "INOX",
        totalSeats: 120,
        availableSeats: 120,
        price: 300
      }
    ]
  },
  {
    title: "The Dark Knight",
    description: "Batman faces the Joker in this epic thriller",
    duration: 152,
    genre: "Action",
    rating: 9.0,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    showtimes: [
      {
        date: new Date('2024-01-16'),
        time: "7:00 PM",
        theater: "Cinepolis",
        totalSeats: 80,
        availableSeats: 80,
        price: 200
      }
    ]
  },
  {
    title: "Inception",
    description: "A thief steals corporate secrets through dream-sharing technology",
    duration: 148,
    genre: "Sci-Fi",
    rating: 8.8,
    poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    showtimes: [
      {
        date: new Date('2024-01-17'),
        time: "5:00 PM",
        theater: "PVR Cinemas",
        totalSeats: 100,
        availableSeats: 100,
        price: 220
      },
      {
        date: new Date('2024-01-17'),
        time: "9:00 PM",
        theater: "INOX",
        totalSeats: 120,
        availableSeats: 120,
        price: 280
      }
    ]
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival",
    duration: 169,
    genre: "Sci-Fi",
    rating: 8.6,
    poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    showtimes: [
      {
        date: new Date('2024-01-18'),
        time: "6:00 PM",
        theater: "Cinepolis",
        totalSeats: 90,
        availableSeats: 90,
        price: 250
      }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Show.deleteMany({});
    await Show.insertMany(sampleShows);
    
    console.log('Sample data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
