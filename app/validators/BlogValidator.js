"use strict";
const joi = require("joi");
const { validate } = require("../utilities/helper");

exports.createBlog = async (body) => {
  let schema = {
    blogTitle: joi.string().required().trim(),
    author: joi.string().required().trim(),
    dateofContent: joi.string().required().trim(),
    blogContent: joi.string().required().trim(),
    blogCbody: joi.string().required().trim(),
    image: joi.string().uri().optional(""),
  };
  return validate(schema, body);
};
