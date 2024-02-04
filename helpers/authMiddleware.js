const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { SECRET_CODE } = process.env;

const authMiddleware = async (req, res, next) => {
  try {
    
    const token = req.header("Authorization").replace("Bearer ", "");

   
    const decoded = jwt.verify(token, SECRET_CODE);

    
    const userId = decoded.id;

    
     const user = await User.findById(userId);

     
     if (!user || user.token !== token) {
       throw new HttpError(401, "Not authorized");
     }

    
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
