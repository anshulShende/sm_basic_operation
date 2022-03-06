const express = require("express");
const router = express.Router();

const { createPost, getSpecificPost, fetchAllPostsBySpecificUser, toggleLikeforSpecificPost } = require("../controllers/PostController");

// @Mapping("/post")
router.post("/", createPost);
router.get("/:id", getSpecificPost);
router.get("/fetchByUserId/:userId", fetchAllPostsBySpecificUser);
router.post("/like", toggleLikeforSpecificPost);

module.exports = router;
