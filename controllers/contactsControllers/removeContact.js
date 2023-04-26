const { deleteContact } = require("../../services/contactsServices");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contactToRemove = await deleteContact({ _id: contactId, owner });
  if (!contactToRemove) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContact;
