const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  poster: {
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
    default: 0,
  },

  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    default: null,
  },
});

const movies = mongoose.model("Movies", movieSchema);

module.exports = movies;