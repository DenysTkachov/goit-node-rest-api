const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/httpError");
const { SECRET_CODE } = process.env;

const registerContact = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      throw new HttpError(409, "User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    next(error);
  }
};

const loginContact = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new HttpError(401, "Email or password invalid");
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new HttpError(401, "Email or password invalid");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_CODE, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token: token });
    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { token: null });
    if (!user) {
      throw new HttpError(400, "Not Found");
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new HttpError(400, "Not Found");
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerContact, loginContact, logoutUser, getCurrentUser };
