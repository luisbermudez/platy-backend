const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const mongoose = require("mongoose");
const { createJWT, clearRes } = require("../utils/general-utils");
const jwt = require("jsonwebtoken");

exports.signupProcess = async (req, res) => {
  const { name, email, password, confirmPassword, ...rest } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ errorMessage: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ errorMessage: "Provide a valid email address." });
  }

  try {
    const dbemail = await User.findOne({ email });
    if (dbemail) {
      return res
        .status(400)
        .json({ errorMessage: "This email has already been registered." });
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        errorMessage:
          "Password must be at least 6 characters long and contain at least, one number, one lowercase and one uppercase.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ errorMessage: "Password does not match." });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUsername = email.replace(".com", "").replace("@", "");

    const newUser = await User.create({
      name,
      email,
      username: newUsername,
      passwordHash: hashedPassword,
      isActive: true,
    });

    return res.status(201).json("User has been signed up.");
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }

    if (error.code === 11000) {
      return res
        .status(400)
        .json({ errorMessage: "This email has already been registered." });
    }

    res.status(400).json({ errorMessage: `Bad request error: ${error}` });
  }
};

exports.loginProcess = async (req, res) => {
  const { email, password, ...rest } = req.body;

  if (!email || !password) {
    return res.status(400).json({ errorMessage: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  try {
    const dbuser = await User.findOne({ email });

    if (!dbuser) {
      return res
        .status(400)
        .json({ errorMessage: "This email is not registered." });
    }

    const passwordMatch = await bcrypt.compare(password, dbuser.passwordHash);

    if (passwordMatch) {
      const [header, payload, signature] = createJWT(dbuser);

      res.cookie("headload", `${header}.${payload}`, {
        maxAge: 1000 * 60 * 24,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.cookie("signature", signature, {
        maxAge: 1000 * 60 * 24,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      return res.status(200).json("User has been authenticated.");
    } else {
      return res
        .status(400)
        .json({ errorMessage: "You have entered the wrong credentials." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: `Internal Server Error: ${error}` });
  }
};

exports.logoutProcess = (req, res) => {
  const date = new Date("Thu, 01 Jan 1970 00:00:00 GMT");
  res.cookie("headload", "", {
    maxAge: -1,
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: date,
  });

  res.cookie("signature", "", {
    maxAge: -1,
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: date,
  });

  return res.status(200).json("User has been logged out.");
};

exports.accountremovalProcess = async (req, res) => {
  try {
    await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
    res.redirect("/logout");
    return res
      .status(200)
      .json(
        "You have 30 days to reactivate your account. After 30 days the deletion process will begin and you won't be able to reactivate your account."
      );
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.verifyAuth = (req, res) => {
  const { headload, signature } = req.cookies;
  jwt.verify(
    `${headload}.${signature}`,
    process.env.SECRET,
    (error, decoded) => {
      if (error) {
        return res.status(401).json({ errorMessage: "Unauthorized" });
      }

      User.findById(decoded.userId).then((dbuser) => {
        const user = clearRes(dbuser.toObject());
        return res.status(200).json({ user: user });
      });
    }
  );
};