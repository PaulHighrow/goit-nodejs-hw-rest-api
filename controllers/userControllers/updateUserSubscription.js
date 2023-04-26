const httpError = require("../../helpers/httpError");
const { updateSubscription } = require("../../services/usersServices");

const SUBSCRIPTION_TYPES = ["starter", "pro", "business"];

const updateUserSubscription = async (req, res, next) => {
  const { id } = req.user;

  if (!SUBSCRIPTION_TYPES.includes(req.body.subscription)) {
    return next(httpError(400, "Please enter valid subscription value"));
  }

  const user = await updateSubscription(id, req.body);
  const { email, subscription } = user;
  res.status(200).json({ email, subscription });
};

module.exports = updateUserSubscription;
