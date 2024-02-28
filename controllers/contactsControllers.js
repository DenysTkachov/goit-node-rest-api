import contactsService from "../services/contactsServices.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import  HttpError from "../helpers/httpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await contactsService.getOneContactById(contactId);

    if (!contact) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json(contact);
  } catch (error) {
   next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const removedContact = await contactsService.removeContact(contactId);

    if (!removedContact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(removedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact =  async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
      const newContact = await contactsService.addContact(name, email, phone);
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  }

export const updateContact = async (req, res, next) => {
    try {
      const contactId = req.params.id;
      const updatedFields = req.body;
      const updatedContact = await contactsService.updateContactById(
        contactId,
        updatedFields
      );

      if (!updatedContact) {
        throw HttpError(404, "Not found");
      }

      res.status(200).json(updatedContact);
    } catch (error) {
      next(error);
    }
  }


