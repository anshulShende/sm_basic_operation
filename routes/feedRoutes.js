const express = require("express");
const router = express.Router();

const { toggleLikeforSpecificPost, followUser, unfollowUser, fetchMyfeed, findPotentialFollowers } = require("../controllers/feedController");

// @Mapping("/feed")
router.post("/like", toggleLikeforSpecificPost);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.get("/:userId", fetchMyfeed);
router.get("/searchFollowers/:userId", findPotentialFollowers);


module.exports = router;