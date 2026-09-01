const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { fullName, userName, email, phoneNo, password } = req.body;

    const isUserExistBefore = await userModel.findOne({
      $or: [
        {
          email: email,
        },
        {
          userName: userName,
        },
      ],
    });

    if (isUserExistBefore) {
      return res.status(409).json({
        message: "username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      fullName,
      userName,
      email,
      phoneNo,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    const user = await userModel.findOne({
      $or: [
        {
          email: loginId,
        },
        {
          userName: loginId,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Incorrect Password",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id, // here we didn't write role because we can find with userID and if role is changed we don't assign previous role bliendly
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const newAccessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password"); // -password excludes password in fetched data

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const { fullName, userName, email, phoneNo } = req.body;

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (fullName !== undefined) {
      user.fullName = fullName;
    }

    if (userName !== undefined) {
      user.userName = userName;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (phoneNo !== undefined) {
      user.phoneNo = phoneNo;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    return res.status(500).json({
      message: err.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  signup,
  login,
  getMyProfile,
  updateMyProfile,
  changePassword,
  refreshAccessToken,
};
