const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Please use a valid email address.",
      ],
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      unique: [true, "Username already taken"],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dygs7n73r/image/upload/v1650051021/platy/pp_hqqwfl.png",
    },
    isActive: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
