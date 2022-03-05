const express = require("express");
const router = express.Router();
const { getAllUsers, getSpecificUser } = require("../controllers/userController");

// @Mapping("/users")
router.get("/", getAllUsers)
router.get("/:username", getSpecificUser);

module.exports = router;
