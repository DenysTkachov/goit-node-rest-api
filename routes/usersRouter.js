import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema, userEmailShema } from "../schemas/usersSchemas.js";

import {upload, handleNoFile} from "../middleware/upload.js";



import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
  recentVerifyEmail,
} from "../controllers/userControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const registerContactValidateon = validateBody(registerSchema);
const loginContactValidateon = validateBody(loginSchema);
const userEmailValidateon = validateBody(userEmailShema);

router.post("/register", registerContactValidateon, registerUser);

router.post("/login", loginContactValidateon, loginUser);

router.post("/logout", authMiddleware, logoutUser);

router.get("/current", authMiddleware, getCurrentUser);

router.post("/avatars", upload.single("avatar"), handleNoFile, authMiddleware, updateAvatar);

router.get("/verify/:verificationToken", authMiddleware, verifyEmail);

router.post("/verify", userEmailValidateon, recentVerifyEmail);


export default router;
