import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";

const { SECRET_CODE } = process.env;

const registerUser = async (name, email, password) => {
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new HttpError(409, "User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      email: newUser.email,
      name: newUser.name,
    };
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
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

    return {
      token,
    };
  } catch (error) {
    throw error;
  }
};

const logoutUser = async (userId) => {
  try {
    const user = await User.findByIdAndUpdate(userId, { token: null });
    if (!user) {
      throw new HttpError(400, "Not Found");
    }

    return;
  } catch (error) {
    throw error;
  }
};

const getCurrentUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new HttpError(400, "Not Found");
    }

    return {
      email: user.email,
      subscription: user.subscription,
    };
  } catch (error) {
    throw error;
  }
};

export default { registerUser, loginUser, logoutUser, getCurrentUser };
