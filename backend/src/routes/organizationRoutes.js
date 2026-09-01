const express = require("express");

const router = express.Router();

const {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
} = require("../controllers/organizationController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const upload = require("../middleware/upload");

router.post("/", authMiddleware, adminMiddleware, createOrganization);

router.get("/", getAllOrganizations);

router.get("/:id", getOrganizationById);

module.exports = router;
