const Contact = require("../db/models/contactModel");

const getContacts = async (owner, __, options) => {
  return await Contact.find(owner, __, options);
};

const getContactById = async (query) => {
  return await Contact.findOne(query);
};

const postContact = async (body) => {
  return await new Contact(body).save();
};

const deleteContact = async (query) => {
  return await Contact.findOneAndDelete(query);
};

const changeContact = async (query, body) => {
  return await Contact.findOneAndUpdate(query, body, { new: true });
};

const toggleFavoriteContact = async (query, body) => {
  return await Contact.findOneAndUpdate(query, body, { new: true });
};

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  changeContact,
  toggleFavoriteContact,
};
