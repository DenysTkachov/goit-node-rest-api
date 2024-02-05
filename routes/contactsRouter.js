const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateContactFavoriteStatus,
} = require("../controllers/contactsControllers.js");

const validateBody = require("../helpers/validateBody");
const {
  createContactSchema,
  updateContactSchema,
  updateContactFavoriteStatusSchema,
} = require("../schemas/contactsSchemas");

const createContactValidation = validateBody(createContactSchema);
const updateContactValidation = validateBody(updateContactSchema);
const updateContactFavoriteStatusValidation = validateBody(
  updateContactFavoriteStatusSchema
);




const contactsRouter = express.Router();


contactsRouter.use(authMiddleware); 

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getContactById);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContactValidation, createContact);

contactsRouter.put("/:id", updateContactValidation, updateContact);

contactsRouter.patch("/:id/favorite", updateContactFavoriteStatusValidation, updateContactFavoriteStatus);

module.exports = contactsRouter;
