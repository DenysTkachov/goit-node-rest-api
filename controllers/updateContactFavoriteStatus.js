const contactsService = require("../services/contactsServices");
const validateBody = require("../helpers/validateBody");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas");
const HttpError = require("../helpers/HttpError");

const updateContactFavoriteStatus = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const { favorite } = req.body;

    if (typeof favorite !== "boolean") {
      throw new HttpError(400, "Invalid favorite value");
    }

    const updatedContact = await contactsService.updateContactFavoriteStatus(
      contactId,
      favorite
    );

    if (!updatedContact) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactFavoriteStatus;