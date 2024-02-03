const express = require("express")
const validateBody = require("../helpers/validateBody");
const { registerSchema, loginSchema } = require("../schemas/authSchemas");
const router = express.Router();
const  registerContact  = require("../controllers/authControllers")

const registerContactValidateon = validateBody(registerSchema);

router.post("/register", registerContactValidateon, registerContact);

module.exports = router;
