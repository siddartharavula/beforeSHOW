const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddlieware");
const upload = require("../middleware/upload");

const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("poster"),
  createMovie,
);

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

router.patch("/:id", authMiddleware, adminMiddleware, updateMovie);

router.delete("/:id", authMiddleware, adminMiddleware, deleteMovie);

module.exports = router;
