const Contact = require("../models/contact");

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
  const newContact = new Contact({ name, email, phone });
  await newContact.save();
  return newContact;
}

async function updateContactById(id, updatedFields) {
  const updatedContact = await Contact.findByIdAndUpdate(id, updatedFields, {
    new: true,
  });
  return updatedContact || null;
}

async function updateContactFavoriteStatus(id, favorite) {
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  return updatedContact || null;
}

module.exports = {
  listContacts,
  getOneContactById,
  removeContact,
  addContact,
  updateContactById,
  updateContactFavoriteStatus,
};
