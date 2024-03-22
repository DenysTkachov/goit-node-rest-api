import express from "express";
import {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateContactFavoriteStatus,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateContactFavoriteStatusSchema,
} from "../schemas/contactsSchemas.js";

const createContactValidation = validateBody(createContactSchema);
const updateContactValidation = validateBody(updateContactSchema);
const updateContactFavoriteStatusValidation = validateBody(
  updateContactFavoriteStatusSchema
);

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getContactById);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContactValidation, createContact);

contactsRouter.put("/:id", updateContactValidation, updateContact);

contactsRouter.patch(
  "/:id/favorite",
  updateContactFavoriteStatusValidation,
  updateContactFavoriteStatus
);

export default contactsRouter;
