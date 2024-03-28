import userService from "../services/userServices.js";
import Jimp from "jimp";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";
import path from "path";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const avatarsPath = path.join(__dirname, "../", "public", "avatars")

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;
    
    const verificationToken = nanoid();

    const newUser = await userService.registerUser(name, email, password, avatar, verificationToken);

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a href= "${BASE_URL}/api/user/verify/${verificationToken}" target="_blank">Click to verify</a>`
    };

    await sendEmail(verifyEmail)



    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};



const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await userService.loginUser(email, password);

    if (!user.verify){
      throw HttpError(401, "Email not verify")
    }
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

const verifyEmail = async (req, res) => {
  const {verificationToken} = req.params;
  const user = await userService.findOne({verificationToken});
  if(!user) {
    throw HttpError (404, "verificationToken not found");
  }

  await userService.findByIdAndUpdate({_id:user._id}, {verify: true, verificationToken: ""});
  res.json({message: "Email verify success"})
}

const recentVerifyEmail = async(req, res) => {
  const {email} = req.body;
  const user = await userService.findOne({email});
  if (!user) {
    throw HttpError(404, "Email not found");  
  }
  if (user.verify) {
    throw HttpError(400, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href= "${BASE_URL}/api/user/verify/${user.verificationToken}" target="_blank">Click to verify</a>`
  };

  await sendEmail(verifyEmail)

  res.json({
    massage: "Verify email send success"
  })
}


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



export { registerUser, loginUser, logoutUser, getCurrentUser, verifyEmail, recentVerifyEmail, updateAvatar };
