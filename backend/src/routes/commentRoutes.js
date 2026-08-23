const express = require("express");
const router = express.Router();

const {
  createComment,
  getAllCommentsByMovieId,
  getMyComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/:id/comments", authMiddleware, createComment);

router.get("/:id/comments", getAllCommentsByMovieId);

router.get("/profile/mycomments", authMiddleware, getMyComments);

router.patch("/profile/mycomments/:id", authMiddleware, updateComment);

router.delete("/profile/mycomments/:id", authMiddleware, deleteComment);

module.exports = router;
