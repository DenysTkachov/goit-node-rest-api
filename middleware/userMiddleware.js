const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { SECRET_CODE } = process.env;
const HttpError = require("../helpers/httpError");

const userMiddleware = async (req, res, next) => {
  try {
    const tokenHeader = req.header("Authorization");
    console.log("Authorization Header:", tokenHeader);

    if (!tokenHeader) {
      throw new HttpError(401, "Unauthorized: Token not provided");
    }

    const token = tokenHeader.replace("Bearer ", "");
    console.log("Token:", token);

    const decoded = jwt.verify(token, SECRET_CODE);

    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user || user.token !== token) {
      throw new HttpError(401, "Not authorized");
    }

    await User.findByIdAndUpdate(userId, { token: null });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userMiddleware;
