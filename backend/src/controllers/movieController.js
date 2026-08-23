const Movies = require("../models/movies.model");
const Comments = require("../models/comments.model");

const createMovie = async (req, res) => {
  try {
    await Movies.create(req.body);
    res.status(201).json({
      message: "Movie Created",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movies.find();
    if (!allMovies || allMovies.length === 0) {
      return res.status(404).json({
        message: "No Movies Found",
      });
    }
    res.status(200).json(allMovies);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    const comments = await Comments.find({
      movie: req.params.id,
    }).populate("user", "userName");

    const totalRating = comments.reduce(
      (sum, comment) => sum + comment.rating,
      0,
    );

    const averageRating =
      comments.length > 0
        ?  Number((totalRating / comments.length).toFixed(1))
        : 0;

    const formattedComments = comments.map((comment) => ({
      userName: comment.user.userName,
      rating: comment.rating,
      comment: comment.comment,
    }));

    res.status(200).json({
      movie,
      averageRating,
      comments: formattedComments,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movies.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json({
      message: "Movie Updated",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movies.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Movie Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
