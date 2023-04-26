const { getContactById } = require("../../services/contactsServices");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await getContactById({ _id: contactId, owner });

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(contact);
};

module.exports = getById;
