const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { SECRET_CODE } = process.env;
const HttpError = require("../helpers/httpError");

const authMiddleware = async (req, res, next) => {
  try {
    const tokenHeader = req.header("Authorization");

    if (!tokenHeader) {
      throw new HttpError(401, "Unauthorized: Token not provided");
    }

    const token = tokenHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, SECRET_CODE);

    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user || user.token !== token) {
      throw new HttpError(401, "Not authorized");
      await User.findByIdAndUpdate(userId, { token: null });
    }

    

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
