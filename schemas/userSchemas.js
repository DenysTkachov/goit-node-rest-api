const Joi = require("joi");
const { emailRegex } = require("../models/user");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});


module.exports = {
  registerSchema,
  loginSchema,
};
 