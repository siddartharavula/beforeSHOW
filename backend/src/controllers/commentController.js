const Comments = require("../models/comments.model");
const Movies = require("../models/movies.model");

const updateMovieRating = async (movieId) => {
  const comments = await Comments.find({
    movie: movieId,
  });

  if (comments.length === 0) {
    await Movies.findByIdAndUpdate(movieId, {
      rating: 0,
    });

    return;
  }

  const totalRating = comments.reduce(
    (sum, comment) => sum + comment.rating,
    0,
  );

  const averageRating = Number(
    (totalRating / comments.length).toFixed(2),
  );

  await Movies.findByIdAndUpdate(movieId, {
    rating: averageRating,
  });
};


const createComment = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const movieId = req.params.id;
    const userId = req.userId;

    const existingComment = await Comments.findOne({
      movie: movieId,
      user: userId,
    });

    if (existingComment) {
      return res.status(400).json({
        message: "You have already commented on this movie",
      });
    }

    const newComment = await Comments.create({
      rating,
      comment,
      movie: movieId,
      user: userId,
    });

    await updateMovieRating(movieId);

    return res.status(201).json({
      message: "Comment Posted",
      Comment: newComment,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "You have already commented on this movie",
      });
    }

    return res.status(500).json({
      message: err.message,
    });
  }
};


const getAllCommentsByMovieId = async (req, res) => {
  try {
    const movieId = req.params.id;

    const allCommentsOfMovie = await Comments.find({
      movie: movieId,
    }).populate(
      "user",
      "userName",
    );

    if (allCommentsOfMovie.length === 0) {
      return res.status(200).json({
        message: "No Comments for this Movie",
      });
    }

    return res.status(200).json({
      allCommentsOfMovie,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


const getMyComments = async (req, res) => {
  try {
    const comments = await Comments.find({
      user: req.userId,
    }).populate(
      "movie",
      "name poster rating",
    );

    return res.status(200).json({
      myComments: comments,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


const updateComment = async (req, res) => {
  try {
    const comment = await Comments.findById(
      req.params.id,
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.userId) {
      return res.status(403).json({
        message: "You can only edit your own comments",
      });
    }

    const { rating, comment: commentText } = req.body;

    if (rating !== undefined) {
      comment.rating = rating;
    }

    if (commentText !== undefined) {
      comment.comment = commentText;
    }

    await comment.save();

    await updateMovieRating(comment.movie);

    return res.status(200).json({
      message: "Comment Updated",
      updatedComment: comment,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


const deleteComment = async (req, res) => {
  try {
    const comment = await Comments.findById(
      req.params.id,
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.userId) {
      return res.status(403).json({
        message: "You can only delete your own comments",
      });
    }

    const movieId = comment.movie;

    await Comments.findByIdAndDelete(
      req.params.id,
    );

    await updateMovieRating(movieId);

    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


module.exports = {
  createComment,
  getAllCommentsByMovieId,
  getMyComments,
  updateComment,
  deleteComment,
};