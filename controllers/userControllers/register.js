const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
require("dotenv").config();

const httpError = require("../../helpers/httpError");
const { createUser, findUser } = require("../../services/usersServices");
const sendEmail = require("../../helpers/sendEmail");
const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  const existingUser = await findUser(req.body.email);

  if (existingUser) {
    next(httpError(409, "Email in use"));
  }
  const avatarURL = gravatar.url(req.body.email);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const verificationToken = nanoid();

  const newUser = await createUser({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const { email, subscription } = newUser;

  const verifyEmail = {
    to: email,
    subject: "Verification email",
    text: "Your Contacts verification link",
    html: `<a target='_blank' href="${BASE_URL}/users/verify/${verificationToken}">Your Contacts verification link</a>`,
  };

  sendEmail(verifyEmail);

  res.status(201).json({ user: { email, subscription } });
};

module.exports = register;
