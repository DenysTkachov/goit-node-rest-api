const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/httpError");
const { SECRET_CODE } = process.env;

const registerContact = async (req, res, next) => {
  try {
    console.log("Received data:", req.body);

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
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
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, "Email or password invalid");
  }
  if (user.token) {
    await User.findByIdAndUpdate(user._id, { token: null });
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    console.log("Email:", email, "Password:", password);
    throw new HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_CODE, { expiresIn: "23h" });
  res.json({
    token,
  });
};

const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { token: null });
    if (!user) {
      throw new HttpError(401, "Not authorized");
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new HttpError(400, "Not authorized");
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

module.exports = { registerContact, loginContact, logoutUser, getCurrentUser };
