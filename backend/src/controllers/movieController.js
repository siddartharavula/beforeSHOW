const Movies = require("../models/movies.model");
const Comments = require("../models/comments.model");
const cloudinary = require("../config/cloudinary");

const createMovie = async (req, res) => {
  try {
    let posterUrl = req.body.poster;

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      );

      posterUrl = result.secure_url;
    }

    await Movies.create({
      ...req.body,
      poster: posterUrl,
    });

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
    const { search, page = 1, limit = 10, sort = "latest" } = req.query;

    // page and limit are as string, so convet into numbers
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber; // Skip function skips the movies from starting and like ignoring initial movies as req order

    let query = {};

    if (search) {
      query = {
        $or: [
          {
            name: {
              $regex: search, // used for pattern matching
              $options: "i", // used for ignoring case (upperCase,lowerCase)
            },
          },
          {
            genre: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
    }

    let sortOrder = -1; // latest 1st

    if (sort === "oldest") {
      sortOrder = 1; // oldest 1st
    }

    const allMovies = await Movies.find(query)
      .sort({ date: sortOrder })
      .skip(skip)
      .limit(limitNumber);

    const totalMovies = await Movies.countDocuments(query);
    const totalPages = Math.ceil(totalMovies / limitNumber);

    if (!allMovies || allMovies.length === 0) {
      return res.status(200).json({
        message: "No Movies Found",
      });
    }
    res.status(200).json({
      movies: allMovies,
      currentPage: pageNumber,
      totalPages,
      totalMovies,
    });
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
        ? Number((totalRating / comments.length).toFixed(1))
        : 0;

    const totalReviews = comments.length;

    const formattedComments = comments.map((comment) => ({
      userName: comment.user.userName,
      rating: comment.rating,
      comment: comment.comment,
    }));

    res.status(200).json({
      movie,
      averageRating,
      totalReviews,
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
