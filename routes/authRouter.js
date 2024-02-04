const express = require("express")
const validateBody = require("../helpers/validateBody");
const { registerSchema, loginSchema } = require("../schemas/authSchemas");
const router = express.Router();
const {
  registerContact,
  loginContact,
  logoutUser,
  getCurrentUser,
} = require("../controllers/authControllers");
const authMiddleware = require("../helpers/authMiddleware");

const registerContactValidateon = validateBody(registerSchema);
const loginContactValidateon = validateBody(loginSchema);

router.post(
  "/register",
  registerContactValidateon,
  authMiddleware,
  registerContact
);

router.post(
  "/login",
  loginContactValidateon,
  authMiddleware,
  loginContact
);

router.post(
  "/logout",
  loginContactValidateon,
  authMiddleware,
  logoutUser
);

router.post(
  "/current",
  loginContactValidateon,
  authMiddleware,
  getCurrentUser
);
module.exports = router;
