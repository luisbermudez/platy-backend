const router = require("express").Router();
const {
  readProcess,
  userLocationsProcess,
  createProcess,
  updateProcess,
  deleteProcess,
  uploadProcess,
  locationDetails,
  updateViewsNumber,
} = require("../controllers/videolocation.controller");
const fileUploader = require("../config/cloudinary.config");

router.post("/", readProcess); // Read videolocation

router.post("/current-user-locations", userLocationsProcess);

router.post("/details", locationDetails);

router.post("/create", createProcess);

router.post("/update", updateProcess);

router.post("/updateViews", updateViewsNumber);

router.post("/delete", deleteProcess);

router.post("/upload", fileUploader.single("videoFile"), uploadProcess);

module.exports = router;
