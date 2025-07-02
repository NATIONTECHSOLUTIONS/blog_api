"use strict";
const Joi = require("joi");
const { validate } = require("../utilities/helper");

exports.createBlog = async (body) => {
  let schema = {
    blogTitle: Joi.string().required().trim(),
    author: Joi.string().required().trim(),
    date: Joi.string().required(),
    blogBody: Joi.string().required().trim(),
  };
  return validate(schema, body);
};
