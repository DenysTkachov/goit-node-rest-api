import { model, Schema } from "mongoose";

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
    },
    verify: {
        type: Boolean,
        default: false,
      },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      },
    },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

export default { User, emailRegex };
