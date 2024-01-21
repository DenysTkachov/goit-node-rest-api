const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContactsFile() {
  try {
    const data = await readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeContactsFile(contacts) {
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
}

async function listContacts() {
  const contacts = await readContactsFile();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContactsFile();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await readContactsFile();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(index, 1);
  await writeContactsFile(contacts);

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await readContactsFile();
  const newContact = { id: Date.now(), name, email, phone };
  contacts.push(newContact);
  await writeContactsFile(contacts);

  return newContact;
} 

async function updateContact(id, updatedFields) {
  try {
    const contacts = await readContactsFile();
    const index = contacts.findIndex((contact) => contact.id === id);

    if (index === -1) {
      return null; 
    }
    contacts[index] = { ...contacts[index], ...updatedFields };

    await writeContactsFile(contacts);
    return contacts[index];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
