const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

const {
  getAllMovies,
  getMovieById,
  getMoviesByOrganization,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");


/* ADMIN - CREATE MOVIE */

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("poster"),
  createMovie,
);


/* PUBLIC - GENERAL MOVIES */

router.get("/", getAllMovies);


/* PUBLIC - ORGANIZATION MOVIES */

router.get(
  "/organization/:id",
  getMoviesByOrganization,
);


/* PUBLIC - SINGLE MOVIE */

router.get("/:id", getMovieById);


/* ADMIN - UPDATE MOVIE */

router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateMovie,
);


/* ADMIN - DELETE MOVIE */

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteMovie,
);


module.exports = router;