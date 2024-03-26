import userService from "../services/userServices.js";
import Jimp from "jimp";
import fs from "fs/promises";
import path from "path";
import User from "../models/User.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const avatarsPath = path.join(__dirname, "../", "public", "avatars")

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.registerUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.json(token);
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await userService.logoutUser(req.user.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const userData = await userService.getCurrentUser(req.user._id);
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);

  (await Jimp.read(oldPath)).resize(250, 250).write(newPath);

  const avatar = path.join("public", "avatars", filename);
  await User.findByIdAndUpdate(_id, { avatar });

  res.json({
    avatar,
  });
};



export { registerUser, loginUser, logoutUser, getCurrentUser, updateAvatar };
