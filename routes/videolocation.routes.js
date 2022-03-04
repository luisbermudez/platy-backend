const router = require("express").Router();
const {readProcess, createProcess, updateProcess, deleteProcess } = require("../controllers/videolocation.controller");

router.post("/", readProcess); // Read videolocation

router.post("/create", createProcess);

router.post("/update", updateProcess);

router.post("/delete", deleteProcess);

module.exports = router;