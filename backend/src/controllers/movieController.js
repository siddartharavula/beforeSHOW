const Movies = require("../models/movies.model");
const Comments = require("../models/comments.model");
const Organization = require("../models/organization.model");
const cloudinary = require("../config/cloudinary");

const createMovie = async (req, res) => {
  try {
    const {
      name,
      genre,
      date,
      organization,
    } = req.body;

    let posterUrl = req.body.poster;

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      );

      posterUrl = result.secure_url;
    }

    if (organization) {
      const existingOrganization = await Organization.findOne({
        _id: organization,
        isActive: true,
      });

      if (!existingOrganization) {
        return res.status(404).json({
          message: "Organization not found or inactive",
        });
      }
    }

    await Movies.create({
      name,
      genre,
      date,
      poster: posterUrl,
      organization: organization || null,
      rating: 0,
    });

    return res.status(201).json({
      message: "Movie Created",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const {
      search,
      page = 1,
      limit = 10,
      sort = "latest",
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    let query = {
      organization: null,
    };

    if (search) {
      query = {
        ...query,
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
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

    let sortOrder = -1;

    if (sort === "oldest") {
      sortOrder = 1;
    }

    const allMovies = await Movies.find(query)
      .sort({ date: sortOrder })
      .skip(skip)
      .limit(limitNumber);

    const totalMovies = await Movies.countDocuments(query);

    const totalPages = Math.ceil(
      totalMovies / limitNumber
    );

    if (allMovies.length === 0) {
      return res.status(200).json({
        message: "No Movies Found",
        movies: [],
        currentPage: pageNumber,
        totalPages,
        totalMovies,
      });
    }

    return res.status(200).json({
      movies: allMovies,
      currentPage: pageNumber,
      totalPages,
      totalMovies,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id).populate(
      "organization",
      "name logo city state",
    );

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
        ? Number(
            (totalRating / comments.length).toFixed(1)
          )
        : 0;

    const totalReviews = comments.length;

    const formattedComments = comments.map((comment) => ({
      _id: comment._id,
      userName: comment.user?.userName,
      rating: comment.rating,
      comment: comment.comment,
    }));

    return res.status(200).json({
      movie,
      averageRating,
      totalReviews,
      comments: formattedComments,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getMoviesByOrganization = async (req, res) => {
  try {
    const organizationId = req.params.id;

    const organization = await Organization.findOne({
      _id: organizationId,
      isActive: true,
    });

    if (!organization) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    const movies = await Movies.find({
      organization: organizationId,
    }).sort({
      date: -1,
    });

    return res.status(200).json({
      organization,
      movies,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const {
      name,
      genre,
      date,
      organization,
    } = req.body;

    if (organization) {
      const existingOrganization = await Organization.findOne({
        _id: organization,
        isActive: true,
      });

      if (!existingOrganization) {
        return res.status(404).json({
          message: "Organization not found or inactive",
        });
      }
    }

    const movie = await Movies.findByIdAndUpdate(
      req.params.id,
      {
        name,
        genre,
        date,
        organization: organization || null,
      },
      {
        new: true,
      },
    );

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      message: "Movie Updated",
      movie,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movies.findByIdAndDelete(
      req.params.id
    );

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    await Comments.deleteMany({
      movie: req.params.id,
    });

    return res.status(200).json({
      message: "Movie Deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  getMoviesByOrganization,
  updateMovie,
  deleteMovie,
};