const mongoose = require("mongoose");

const PostModel = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true
  },
  title: {
    type: String,
    require: true,
    trim: true,
    maxlength: 256,
  },
  content: {
    type: String,
    require: true,
    trim: true,
    maxlength: 256,
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }],
  createdAt: {
    type: String,
    default: new Date().toISOString().replace('T', " ").slice(0,19),
  }
});

module.exports = mongoose.model("Post", PostModel);