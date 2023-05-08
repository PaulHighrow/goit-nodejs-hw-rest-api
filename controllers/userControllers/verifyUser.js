const httpError = require("../../helpers/httpError");
const { findVerifiedUser } = require("../../services/usersServices");

const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;
  const verifiedUser = await findVerifiedUser(verificationToken, {
    verify: true,
    verificationToken: null,
  });

  if (!verifiedUser) {
    return next(httpError(404, "User not found"));
  }

  res.status(200).json({ message: "Verification successful" });
};

module.exports = verifyUser;
