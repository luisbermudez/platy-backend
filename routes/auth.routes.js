const router = require("express"). Router();
const { signupProcess, loginProcess, logoutProcess, accountremovalProcess } = require("../controllers/auth.controller");

router.post("/signup", signupProcess);

router.post("/login", loginProcess);

router.post("/logout", logoutProcess);

router.post("/accountremoval", accountremovalProcess);

module.exports = router;