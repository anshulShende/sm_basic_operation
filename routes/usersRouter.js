const express = require("express");
const router = express.Router();
const { getAllUsers, getSpecificUser, followUser, unfollowUser } = require("../controllers/userController");

// @Mapping("/users")
router.get("/", getAllUsers)
router.get("/:username", getSpecificUser);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);

module.exports = router;
