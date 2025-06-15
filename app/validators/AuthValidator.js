"use strict";

const Joi = require("joi");
const { validate } = require("../utilities/helper");

exports.createUser = async (body) => {
  let schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().min(8).max(15).required(),
  };
  return validate(schema, body);
};

exports.loginUser = async (body) => {
  let schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(15).required(),
  };
  return validate(schema, body);
};
