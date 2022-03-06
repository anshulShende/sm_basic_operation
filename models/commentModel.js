const mongoose = require("mongoose");

const CommentModel = mongoose.Schema({
  postId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    require: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true
  },
  comment: {
    type: String,
    require: true,
    maxlength: 1000,
  },
  isReply: {
    type: Boolean,
    require: true,
    default: false
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  replies: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }],
  createdAt: {
    type: String,
    default: new Date().toISOString().replace('T', " ").slice(0,19),
  }
});

module.exports = mongoose.model("Comment", CommentModel);