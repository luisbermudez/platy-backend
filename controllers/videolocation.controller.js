const Videolocation = require("../models/Videolocation.model");
const User = require("../models/User.model");
const cloudinary = require("cloudinary").v2;

exports.createProcess = async (req, res) => {
  try {
    const { user, values, coordinateLng, coordinateLat, videoUrl, public_id } =
      req.body;
    const { name, ...rest } = values;
    rest.videoUrl = videoUrl;
    rest.public_id = public_id;
    rest.views = 0;
    rest.location = {
      name,
      coordinates: { latitude: coordinateLat, longitude: coordinateLng },
    };
    const dbUser = await User.findById(user._id);
    if (dbUser) {
      const newVideolocation = await Videolocation.create({
        ...rest,
        _user: dbUser._id,
      });
      return res
        .status(200)
        .json("Your videolocation has been properly created.");
    }
    return res
      .status(400)
      .json({ errorMessage: "Could not locate user on database." });
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.readProcess = async (req, res) => {
  try {
    const sort = { createdAt: -1 };
    const dbVideolocations = await Videolocation.find()
      .sort(sort)
      .populate("_user");
    return res.status(200).json(dbVideolocations);
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.userLocationsProcess = async (req, res) => {
  try {
    const { _id } = req.body;
    const sort = { createdAt: -1 };
    const dbUser = await User.findById(_id);
    if (dbUser) {
      const { _id: _user } = dbUser;
      const currentUserVideolocations = await Videolocation.find({
        _user,
      }).sort(sort);
      return res.status(200).json(currentUserVideolocations);
    }
    return res.status(400).json({ errorMessage: "User not found in database" });
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.locationDetails = async (req, res) => {
  try {
    const { _id } = req.body;
    const dbLocation = await Videolocation.findById(_id).populate("_user");
    if (dbLocation) {
      return res.status(200).json({ dbLocation });
    }
    return res.status(400).json({ errorMessage: "Location not found" });
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.updateViewsNumber = async (req, res) => {
  try {
    const { _id } = req.body;
    const dbLocation = await Videolocation.findById(_id);
    dbLocation.views++;
    dbLocation.save();
    return res.status(200).json({ message: "Views updated" });
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.updateProcess = async (req, res) => {
  try {
    const { _id, values } = req.body;
    const updatedLocation = await Videolocation.findByIdAndUpdate(
      { _id },
      {
        title: values.title,
        description: values.description,
        $set: { "location.name": values.locationName },
      }
    );
    if (updatedLocation) {
      return res.status(200).json("Videolocation has been updated.");
    }
    return res
      .status(400)
      .json({ errorMessage: "Unable to update videolocation." });
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.deleteProcess = async (req, res) => {
  const { _id, public_id } = req.body;
  try {
    await cloudinary.uploader.destroy(public_id, { resource_type: "video" });
    await Videolocation.findByIdAndDelete(_id);
    return res.status(200).json("Videolocation has been deleted.");
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};

exports.uploadProcess = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ errorMessage: "Select a file to upload." });
    }
    const filename = req.file.filename;
    return res
      .status(201)
      .json({ secure_url: req.file.path, public_id: filename });
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};
