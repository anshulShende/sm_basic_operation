const express = require("express");
const router = express.Router();

const { createPost, getSpecificPost, fetchAllPostsBySpecificUser } = require("../controllers/PostController");

// @Mapping("/Post")
router.post("/", createPost);
router.get("/:id", getSpecificPost);
router.get("/fetchByUserId/:userId", fetchAllPostsBySpecificUser);

module.exports = router;
