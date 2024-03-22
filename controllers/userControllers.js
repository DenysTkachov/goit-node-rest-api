import userService from "../services/userServices.js";
import HttpError from "../helpers/httpError.js";

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

export { registerUser, loginUser, logoutUser, getCurrentUser };
