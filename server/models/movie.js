const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  trailer: {
    type: String,
    default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Default trailer link
  },
  length: {
    type: Number,
    default: 0,
  },
  ageRestriction: {
    type: Number,
    default: 0,
  },
  filename: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;