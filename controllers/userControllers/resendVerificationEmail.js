const httpError = require("../../helpers/httpError");
const sendEmail = require("../../helpers/sendEmail");
const { findUser } = require("../../services/usersServices");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await findUser(email);

  if (!user) {
    return next(httpError(404, "User not found"));
  }
  if (user.verify) {
    return next(httpError(400, "Verification has already been passed"));
  }

  const verifyEmail = {
    to: email,
    subject: "Verification email",
    text: "Your Contacts verification link",
    html: `<a target='_blank' href="${BASE_URL}/users/verify/${user.verificationToken}">Your Contacts verification link</a>`,
  };

  sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerificationEmail;
