const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  poster:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  rating: {
    type: Number,
  }
});

const movies = mongoose.model("Movies", movieSchema);

module.exports = movies;
