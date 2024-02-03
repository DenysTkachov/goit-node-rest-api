const { User } = require("../models/user")

const validateBody = require("../helpers/validateBody");
const { registerSchema, loginSchema } = require("../schemas/authSchemas");
const HttpError = require("../helpers/HttpError");



const registerContact = async (req, res, next) => {
    
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            email: newUser.email,
            name: newUser.name,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        next(error);
    }

};

module.exports = registerContact;
