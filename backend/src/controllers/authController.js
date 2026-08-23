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
  } catch (err) {}
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

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.status(200).json({
      message: "Login Successful",
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { signup, login };
