const Joi = require("joi");
const emailRegexp = require("../models/user")

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);

const updateContactFavoriteStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});



module.exports = {
  createContactSchema,
  updateContactSchema,
  updateContactFavoriteStatusSchema,
};
