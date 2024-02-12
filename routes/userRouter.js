const express = require("express");
const validateBody = require("../helpers/validateBody");
const { registerSchema, loginSchema } = require("../schemas/userSchemas");
const router = express.Router();
const {
  registerContact,
  loginContact,
  logoutUser,
  getCurrentUser,
} = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

const registerContactValidateon = validateBody(registerSchema);
const loginContactValidateon = validateBody(loginSchema);

router.post("/register", registerContactValidateon, registerContact);

router.post("/login", loginContactValidateon, loginContact);

router.post("/logout", authMiddleware, logoutUser);

router.post("/current", authMiddleware, getCurrentUser);
module.exports = router;
