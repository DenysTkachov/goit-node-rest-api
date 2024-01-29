const express = require("express");
const {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  } = require("../controllers/contactsControllers.js");
const updateContactFavoriteStatus = require("../controllers/updateContactFavoriteStatus");
const validateBody = require("../helpers/validateBody");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas");

const createContactValidation = validateBody(createContactSchema);
const updateContactValidation = validateBody(updateContactSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getContactById);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContactValidation, createContact);

contactsRouter.put("/:id", updateContactValidation, updateContact);

contactsRouter.patch("/:id/favorite", updateContactFavoriteStatus);

module.exports = contactsRouter;
