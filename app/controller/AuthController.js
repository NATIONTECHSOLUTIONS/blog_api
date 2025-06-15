"use strict";
const User = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const authService = require("../services/AuthService");
const response = require("../utilities/responses");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};


exports.createUser = async (req, res) => {
  const { error, data, statusCode } = await authService.createUser(req.body);

  if (error) {
    return response.error(res, error, statusCode);
  }
  return response.success(res, data, statusCode);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
