const Clip = require("../models/Clip.model");
const Location = require("../models/Location.model");
const mongoose = require("mongoose");
const { verifyToken } = require("../middleware/token-middleware");

exports.createProcess = async (req, res) => {
  try {
    const userInfo = await verifyToken(req, res);
    return res.status(200).json("All good!");
  } catch (error) {
    return res.status(400).json("All NOT good!");
  }
};

exports.readProcess = (req, res) => {};
exports.updateProcess = (req, res) => {};
exports.deleteProcess = (req, res) => {};
