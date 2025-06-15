"use strict";

const { StatusCodes } = require("http-status-codes");
const User = require("../models/UsersModel");
const authValidator = require("../validators/AuthValidator");
const jwt = require("jsonwebtoken");

exports.createUser = async (body) => {
  try {
    // Validate user input
    const validatorError = await authValidator.createUser(body);
    if (validatorError) {
      return {
        error: validatorError,
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }

    const { email } = body;

    // Check if user already exists
    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      return {
        error: "User already exists",
        statusCode: StatusCodes.CONFLICT,
      };
    }

    // Create new user
    const user = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
      phoneNumber:body.phoneNumber,
    });

    // Generate JWT token (optional)
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "defaultsecret", // Replace with a secure secret in production
      { expiresIn: "1d" }
    );

    return {
      message: "User created successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      
      statusCode: StatusCodes.CREATED,
    };
  } catch (err) {
    return {
      error: err.message || "Internal Server Error",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};
