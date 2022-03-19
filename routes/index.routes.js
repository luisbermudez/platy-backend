const router = require("express").Router();
const authRoutes = require("./auth.routes");
const videolocationRoutes = require("./videolocation.routes");
const cloudinary = require("cloudinary");

router.post("/testito", async (req, res, next) => {
  try {
    cloudinary.v2.uploader.destroy(
      "platy/kses715yxgffdemhal23",
      { resource_type: "video" },
      function (error, result) {
        res.status(200).send({ result, error });
      }
    );
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
});

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/videolocations", videolocationRoutes);

module.exports = router;
