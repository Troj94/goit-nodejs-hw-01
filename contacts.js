const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require('uuid');
const id = uuidv4();

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const filtredContact = contacts.filter(
      (contact) => contact.id === contactId
    );
    console.table(filtredContact);
    return filtredContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const remainingContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    console.table(remainingContacts);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(remainingContacts, null, 2)
    );
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const item = { id: (uuidv4()), name, email, phone };

    const updatedContacts = [...contacts, item];
    console.table(updatedContacts);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };