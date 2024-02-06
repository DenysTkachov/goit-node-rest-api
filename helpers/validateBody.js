const Joi = require("joi");
const HttpError = require("../helpers/httpError");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
