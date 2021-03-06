const express = require("express");
const router = express.Router();

const { createPost, getSpecificPost, fetchAllPostsBySpecificUser, toggleLikeforSpecificPost, commentOnPost,
     likeAComment, fetchLikesOnPost, fetchCommentsOnPost } = require("../controllers/PostController");

// @Mapping("/post")
router.post("/", createPost);
router.get("/:id", getSpecificPost);
router.get("/fetchByUserId/:userId", fetchAllPostsBySpecificUser);
router.post("/like", toggleLikeforSpecificPost);
router.post("/comment", commentOnPost);
router.post("/likeAComment", likeAComment);
router.get("/fetchLikesOnPost/:postId", fetchLikesOnPost);
router.get("/fetchCommentsOnPost/:postId", fetchCommentsOnPost);
// router.post("/replyOnComment", replyOnComment);

module.exports = router;
