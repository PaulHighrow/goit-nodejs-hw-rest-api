const path = require("path");
const fs = require("fs/promises");

const { updateAvatar } = require("../../services/usersServices");

const imgResizer = require("../../helpers/imgResizer");
const httpError = require("../../helpers/httpError");

const avatarPath = path.join(__dirname, "../../", "public", "avatars");

const updateUserAvatar = async (req, res, next) => {
  const { id } = req.user;

  if (!req.file) {
    next(httpError(400, "Please provide a file"));
  }

  const { path: tempPath, originalname } = req.file;
  const ext = path.extname(originalname);

  await imgResizer(tempPath);

  const filename = `${id}_avatar${ext}`;
  const newPath = path.join(avatarPath, filename);

  await fs.rename(tempPath, newPath);

  const avatarURL = path.join("avatars", filename);

  await updateAvatar(id, { avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = updateUserAvatar;
