const Comments = require("../models/comments.model");

const createComment = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movieId = req.params.id;
    const userId = req.userId;
    const newComment = await Comments.create({
      rating,
      comment,
      movie: movieId,
      user: userId,
    });
    res.status(201).json({
      message: "Comment Posted",
      Comment: newComment,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllCommentsByMovieId = async (req, res) => {
  try {
    const movieId = req.params.id;
    const allCommentsOfMovie = await Comments.find({ movie: movieId }).populate(
      "user",
      "userName",
    );

    if (allCommentsOfMovie.length === 0) {
      return res.status(200).json({
        message: "No Comments for this Movie",
      });
    }
    
    res.status(200).json({
      allCommentsOfMovie,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getMyComments = async (req, res) => {
  try {
    const comments = await Comments.find({
      user: req.userId,
    }).populate("movie", "name");

    return res.status(200).json({
      myComments: comments,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);
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

    res.status(200).json({
      message: "Comment Updated",
      updatedComment: comment,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);

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

    await Comments.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
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
