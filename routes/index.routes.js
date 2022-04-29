const router = require("express").Router();
const authRoutes = require("./auth.routes");
const videolocationRoutes = require("./videolocation.routes");
const cloudinary = require("cloudinary");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/videolocations", videolocationRoutes);

module.exports = router;
