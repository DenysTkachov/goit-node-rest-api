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
  registerContact
);

router.post(
  "/login",
  loginContactValidateon,
  loginContact
);

router.post(
  "/logout",  
  logoutUser
);

router.post(
  "/current",
  authMiddleware,
  getCurrentUser
);
module.exports = router;
