const Contact = require("../models/Contact");

const HttpError = require("../helpers/HttpError");

async function listContacts() {
  const contacts = await Contact.find();
  return contacts;
}

async function getOneContactById(contactId) {
  const contact = await Contact.findById(contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const removedContact = await Contact.findByIdAndRemove(contactId);
  return removedContact || null;
}

async function addContact(name, email, phone) {
  const newContact = new Contact({ name, email, phone, owner: ownerId });
  await newContact.save();
  return newContact;
}

async function updateContactById(id, updatedFields) {
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { ...updatedFields, owner: ownerId },
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw new HttpError(404, "Contact not found");
  }
  return updatedContact;
}

async function updateContactFavoriteStatus(id, favorite, ownerId) {
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite, owner: ownerId },
    { new: true }
  );
  if (!updatedContact) {
    throw new HttpError(404, "Contact not found");
  }

  return updatedContact;
}

module.exports = {
  listContacts,
  getOneContactById,
  removeContact,
  addContact,
  updateContactById,
  updateContactFavoriteStatus,
};
