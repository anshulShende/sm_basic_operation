const express = require("express");
const router = express.Router();

const { login, signup, logout } = require("../controllers/authController");

// @Mapping("/auth")
router.post("/login", login);
router.post("/signup", signup);
router.patch("/logout/:id", logout);


module.exports = router;