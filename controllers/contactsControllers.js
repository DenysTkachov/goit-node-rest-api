const contactsService = require("../services/contactsServices");
const validateBody = require("../helpers/validateBody");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas");
const  HttpError  = require("../helpers/HttpError");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await contactsService.getOneContactById(contactId);

    if (!contact) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json(contact);
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const removedContact = await contactsService.removeContact(contactId);

    if (!removedContact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(removedContact);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const createContact = [
  validateBody(createContactSchema),
  async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      const newContact = await contactsService.addContact(name, email, phone);
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

const updateContact = [
  validateBody(updateContactSchema),
  async (req, res) => {
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
      if (error.status === 404) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  },
];

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
};
