const express = require("express");
const validateUserData = require("../../middlewares/userValidator");
const authenticate = require("../../middlewares/authenticate");
const uploadAvatar = require("../../middlewares/uploadAvatar");
const validateEmail = require("../../middlewares/emailValidator");

const asyncWrapper = require("../../helpers/asyncWrapper");

const register = require("../../controllers/userControllers/register");
const login = require("../../controllers/userControllers/login");
const logout = require("../../controllers/userControllers/logout");
const getCurrentUser = require("../../controllers/userControllers/getCurrentUser");
const updateUserSubscription = require("../../controllers/userControllers/updateUserSubscription");
const updateUserAvatar = require("../../controllers/userControllers/updateUserAvatar");
const verifyUser = require("../../controllers/userControllers/verifyUser");
const resendVerificationEmail = require("../../controllers/userControllers/resendVerificationEmail");

const router = express.Router();

router.post("/register", validateUserData, asyncWrapper(register));

router.get("/verify/:verificationToken", asyncWrapper(verifyUser));

router.post("/verify", validateEmail, asyncWrapper(resendVerificationEmail));

router.post("/login", validateUserData, asyncWrapper(login));

router.post("/logout", authenticate, asyncWrapper(logout));

router.get("/current", authenticate, asyncWrapper(getCurrentUser));

router.patch("/", authenticate, asyncWrapper(updateUserSubscription));

router.patch(
  "/avatars",
  authenticate,
  uploadAvatar,
  asyncWrapper(updateUserAvatar)
);

module.exports = router;
