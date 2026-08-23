const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
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
  },
});

const movies = mongoose.model("Movies", movieSchema);

module.exports = movies;
