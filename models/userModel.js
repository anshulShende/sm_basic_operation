const mongoose = require("mongoose");

//Getting a formated joining date
var options = { year: "numeric", month: "long", day: "numeric" };
var today = new Date();
const date = today.toLocaleDateString("en-US", options);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    maxlenght: 32,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    maxlength: 32,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    maxlength: 32,
    trim: true,
  },
  bio: {
    type: String,
    maxlength: 180,
    trim: true,
  },
  signUpDate: {
    type:String,
    default: new Date().toISOString().replace('T', " ").slice(0,19),
  },
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  follows: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  isLoggedIn: {
    type: Boolean,
    require: true,
    default: true
  }
});

module.exports = mongoose.model("User", userSchema);
