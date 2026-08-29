const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getMyProfile,
  changePassword,
  updateMyProfile,
  refreshAccessToken
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signin", signup);

router.post("/login", login);

router.get("/getprofile", authMiddleware, getMyProfile);

router.patch("/updateprofile",authMiddleware,updateMyProfile);

router.patch("/change-password", authMiddleware, changePassword);

router.post("/refresh", authMiddleware, refreshAccessToken);

module.exports = router;
