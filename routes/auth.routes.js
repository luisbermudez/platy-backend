const router = require("express").Router();
const {
  signupProcess,
  loginProcess,
  logoutProcess,
  accountremovalProcess,
  verifyAuth,
} = require("../controllers/auth.controller");

router.post("/signup", signupProcess);

router.post("/login", loginProcess);

router.post("/logout", logoutProcess);

router.post("/accountremoval", accountremovalProcess);

router.post("/verifyauth", verifyAuth);

module.exports = router;
