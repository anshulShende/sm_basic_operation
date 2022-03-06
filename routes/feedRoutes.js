const express = require("express");
const router = express.Router();

const { fetchMyfeed, findPotentialFollowers } = require("../controllers/feedController");

// @Mapping("/feed")
router.get("/:userId", fetchMyfeed);
router.get("/searchFollowers/:userId", findPotentialFollowers);


module.exports = router;