const { postContact } = require("../../services/contactsServices");

const addContact = async (req, res, __) => {
  const { _id: owner } = req.user;
  res.status(201).json(await postContact({ ...req.body, owner }));
};

module.exports = addContact;
