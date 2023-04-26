const { toggleFavoriteContact } = require("../../services/contactsServices");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const { _id: owner } = req.user;
  const updatedContact = await toggleFavoriteContact(
    { _id: contactId, owner },
    body
  );
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(updatedContact);
};

module.exports = updateStatusContact;
