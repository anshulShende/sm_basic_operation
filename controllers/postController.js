const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

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

const commentOnPost = async (req,res) => {
  postId = req.body.postId;
  comment = req.body.comment;
  userId = req.body.userId;
  try{
    const newComment = new Comment({
      postId: postId,
      userId: userId,
      comment: comment,
      isReply: false
    });
    newComment.save()
      .then(async (comment) => {
        console.log(comment);
        const post = await Post.findById(req.body.postId);
        if (post==null || post.length == 0) {
          return res.status(400).json({result: "Error", message: 'Post does not exist' });
        }
        post.comments.push(comment._id);
        await post.save();
        return res.status(200).json({result: "Success", message: "Successfully Commented on Post"});
      }).catch(err => {
        return res.status(400).json({result: "Error", message: 'Error Occurred.. Please try Again' });
    });

  } catch (err){
      return res.status(400).json({result: "Error", message: 'Error Occurred.. Please try Again' });
  }
}

const likeAComment = async (req,res) => {
  postId = req.body.postId;
  commentId = req.body.commentId;
  userId = req.body.userId;
  try{
    const post = await Post.findById(postId);
    if (post==null || post.length == 0) {
      return res.status(400).json({result: "Error", message: 'Post does not exist' });
    }
    if(post.comments.indexOf(commentId) === -1 ){
      return res.status(400).json({result: "Error", message: 'Comment Does not exist for this Post' });
    }
    const comment = await Comment.findById(commentId);
    const liked = comment.likes.indexOf(userId);

    if (liked === -1) {
      comment.likes.push(userId);
    } else {
      comment.likes.splice(liked, 1);
    }
    await comment.save();
    return res.status(200).json({result: "Success", message: 'Likes for Comment Updated' });
  } catch(err){
    return res.status(400).json({result: "Error", message: 'Error Occurred.. Please try Again' });
  }
}

const fetchLikesOnPost = async (req,res) => {
  try{
    const post  = await Post.findById(req.params.postId).populate('likes', 'name').exec();
    if(!post || post == null || post.length == 0){
      return res.status(400).json({result: "Error", message: 'Post does not exist' });
    }
    return res.status(200).json({result: "Success", postId: post._id, likes: post.likes, message: 'Likes for Post fetched' });
  }catch (err){
    return res.status(400).json({result: "Error", message: 'Error Occurred.. Please try Again' });
  }
}

const fetchCommentsOnPost = async (req,res) => {
  try{
    const post  = await Post.findById(req.params.postId)
                  .populate({ path: 'comments',
                              populate: [{ path : 'userId', select: 'name'}, { path : 'likes', select: 'name'}]
                            }).exec();
    if(!post || post == null || post.length == 0){
      return res.status(400).json({result: "Error", message: 'Post does not exist' });
    }
    if(post.comments.length > 1){
      posts.comments.sort((a, b) => {
         let ca = new Date(a.createdAt),
         cb = new Date(b.createdAt);
         return cb-ca;
       });
   }
    return res.status(200).json({result: "Success", postId: post._id, comments: post.comments, message: 'Comments for Post fetched' });
  }catch (err){
    return res.status(400).json({result: "Error", message: 'Error Occurred.. Please try Again' });
  }
}

module.exports = { createPost, getSpecificPost, fetchAllPostsBySpecificUser, toggleLikeforSpecificPost,
   commentOnPost, likeAComment, fetchLikesOnPost, fetchCommentsOnPost };