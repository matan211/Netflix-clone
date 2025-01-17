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
    default: 0
  },
  filename: {
    type: String,
    required: true
  }
});

// Middleware: Pre-save hook to handle _id assignment
MovieSchema.pre('save', async function (next) {
  console.log("this.isNew: " + this.isNew);
  if (this.isNew) {
    try {
      // Increment the sequence in the counter collection
      const counter = await Counter.findOneAndUpdate(
        { name: 'movie' },
        { $inc: { seq: 1 } },
        // Create the counter if it doesn't exist
        { new: true, upsert: true } 
      );

      console.log("Counter: " + counter);
      // Assign the incremented sequence to _id
      this._id = counter.seq; 
      console.log("this._id: " + this._id); 
      next();
    } catch (error) {
      // Pass any errors to the next middleware
      next(error); 
    }
  } else {
    next(); 
  }
});

// Export the Movie model for use in other parts of the application
module.exports = mongoose.model('Movie', MovieSchema);