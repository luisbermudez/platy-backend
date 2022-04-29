const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

exports.createJWT = (user) => {
  return jwt
    .sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET,
      { algorithm: "HS256", expiresIn: "6h" }
    )
    .split(".");
};

exports.dbUserLocate = async (id) => {
  try {
    const dbRes = await User.findById(id);
    if (dbRes) {
      const userInfo = this.clearRes(dbRes.toObject());
      return userInfo;
    }
  } catch (error) {
    throw error;
  }
};

exports.clearRes = (data) => {
  const { passwordHash, __v, updatedAt, isActive, createdAt, ...cleared } =
    data;
  return cleared;
};
