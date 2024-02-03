
const { model, Schema } = require("mongoose");

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      required: true,
    },

    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("user", userSchema);
module.exports = { emailRegex };