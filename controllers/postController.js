const Post = require("../models/postModel");

const createPost = (req, res) => {
  const newPost = new Post(req.body);
  newPost
    .save()
    .then((post) => res.status(200).json({result: "Success", post: post, message: "New Post Created Successfully"}))
    .catch((err) => res.status(400).json({result: "Error", message: "Error occured while creating a post. Please try again after sometime"}));
};

const getSpecificPost = (req, res)=>{
  Post.findOne({_id:req.params.id}, (err, post) => { 
    if(err){
      res.status(400).json({result: "Error", message: "Error Occurred. Please Try Again"});
    } else{
      res.status(200).json({result: "Success", post: post, message: "Post fectched successfully" });
    }
  });
};

const fetchAllPostsBySpecificUser = (req,res) => {
  Post.find({userId: req.params.userId}, (err, post) => {
    if(err){
      return res.status(400).json({result: "Error", message: "Error Occurred. Please Try Again"});
    } else{
      if(post==null || post.length == 0){
        return res.status(200).json({result: "Success", message: `No Posts were posted by ${req.param.userId}` });
      }else {
        return res.status(200).json({result: "Success", posts: post, message: "Posts fectched successfully" });
      }
    }
  });
}

const toggleLikeforSpecificPost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    
    if (post==null || post.length == 0) {
      return res.status(400).json({result: "Error", message: 'Post does not exist' });
    }
    const liked = post.likes.indexOf(req.body.userId);
    console.log(liked);

    if (liked === -1) {
      post.likes.push(req.body.userId);
    } else {
      post.likes.splice(liked, 1);
    }

    await post.save();
    return res.status(200).json({result: "Success", message: "Likes for Post updated successfully", likes: post.likes.length});
  } catch (err) {
      return res.status(400).json({result: "Error", message: 'Error Occurred.. Please try Again' });
  }
}

module.exports = { createPost, getSpecificPost, fetchAllPostsBySpecificUser, toggleLikeforSpecificPost };