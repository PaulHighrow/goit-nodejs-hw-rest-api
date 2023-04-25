const { getContacts } = require("../../services/contactsServices");
const FAVORITES_VALUES = ["true", "false"];

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const { favorite = undefined } = req.query;
  const skip = (page - 1) * limit;

  !favorite || !FAVORITES_VALUES.includes(favorite)
    ? res.json(await getContacts({ owner }, null, { skip, limit }))
    : res.json(await getContacts({ owner, favorite }, null, { skip, limit }));
};

module.exports = listContacts;
