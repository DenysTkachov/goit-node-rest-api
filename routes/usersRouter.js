import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/usersSchemas.js";

import upload from "../middleware/upload.js";



import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAvatar,
} from "../controllers/userControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const registerContactValidateon = validateBody(registerSchema);
const loginContactValidateon = validateBody(loginSchema);

router.post("/register", registerContactValidateon, registerUser);

router.post("/login", loginContactValidateon, loginUser);

router.post("/logout", authMiddleware, logoutUser);

router.get("/current", authMiddleware, getCurrentUser);

router.post("/avatars", upload.single("avatar"), authMiddleware, updateAvatar);

export default router;
