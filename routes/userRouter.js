import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/userSchemas.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/userControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const registerContactValidateon = validateBody(registerSchema);
const loginContactValidateon = validateBody(loginSchema);

router.post("/register", registerContactValidateon, registerUser);

router.post("/login", loginContactValidateon, loginUser);

router.post("/logout", authMiddleware, logoutUser);

router.get("/current", authMiddleware, getCurrentUser);

export default router;
