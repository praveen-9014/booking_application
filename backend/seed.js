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
    poster: "https://www.marvel.com/movies/avengers-endgame/full-cast-and-credits",
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
    poster: "https://screenrant.com/the-dark-knight-batman-fourth-movie-different-op-ed/",
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