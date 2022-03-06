const Post = require('../models/postModel');
const User = require('../models/userModel');

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

const followUser = async (req, res) => {
  myUserId = req.body.myUserId;
  followUserId = req.body.followUserId;

  /** User -> followers **/
  const user = await User.findById(followUserId);

  if (!user || user == null || user.length == 0) {
    return res.status(400).json({result: "Error", message: 'User does not exist' });
  }

  if (user.followers.indexOf(myUserId) !== -1) {
    return res.status(200).json({result: "Success", message: `You already follow ${user.name}` });
  }
  user.followers.push(myUserId);
  await user.save();

  /** My -> Following **/
  const me = await User.findById(myUserId);

  me.follows.push(followUserId);
  await me.save()

  return res.status(200).json({result: "Success", message: `You are now following ${user.name}`});
}

const unfollowUser = async (req, res) => {
  myUserId = req.body.myUserId;
  unfollowUserId = req.body.unfollowUserId;

  /** User -> followers **/
  const user = await User.findById(unfollowUserId);

  if (!user || user == null || user.length == 0) {
    return res.status(400).json({result: "Error", message: 'User does not exist' });
  }

  const isfollowed = user.followers.indexOf(myUserId);
  if (isfollowed === -1) {
    return res.status(400).json({result: "Error", message: `You don't follow ${user.name}` });
  }
  user.followers.splice(isfollowed,1);
  await user.save();

  /** My -> Following **/
  const me = await User.findById(myUserId);

  const isfollows = me.follows.indexOf(unfollowUserId);
  me.follows.splice(isfollows,1);
  await me.save();

  return res.status(200).json({result: "Success", message: `You unfollowed ${user.name}`});
}

const fetchMyfeed = async (req, res) => {
  const userId = req.params.userId;
  try{
    const user = await User.findById(userId);
    if(!user || user == null || user.length == 0){
      return res.status(400).json({result: "Error", message: 'User does not exist' });
    }

    if(!user.isLoggedIn){
      return res.status(401).json({result: "Error", message: "Please Login to fetch your feed and updates"});
    }

    const followings = user.follows;
    if(followings ==null || followings.length == 0){
      return res.status(200).json({result: "Success", posts: [], message: "Start following other users to get updates on your feed"});
    }

    const posts = await Post.find({'userId':  { $in: followings } }).populate('userId').exec();
    if(posts==null || posts.length == 0 ){
      return res.status(200).json({result: "Success", posts: [], message: "No Updates Found.. Keep following other users to get updates on your feed"});
    }
    
    if(posts.length > 1){
       posts.sort((a, b) => {
          let ca = new Date(a.createdAt),
          cb = new Date(b.createdAt);
          return cb-ca;
        });
    }

    return res.status(200).json({result: "Success", posts: posts, message: `Successfullly fetched Feed for ${user.name}`});
  } catch(err) {
    return res.status(400).json({result: "Error", message: `Error Occurred while fetching Feed for ${userId}`});
  }

}

const findPotentialFollowers = async(req,res) => {
  console.log(req.params.userId);
  userId = req.params.userId;

  const user = await User.findById(userId);

  if (!user || user == null || user.length == 0) {
    return res.status(400).json({result: "Error", message: 'User does not exist' });
  }
  user.follows.push(user._id);
  try{
    const potentialFollowers = await User.find({ '_id': { "$nin": user.follows }});
    return res.status(200).json({result: "Success", users: potentialFollowers, message: 'Potential followers fetched successfully' });
  } catch(err){
    return res.status(400).json({result: "Error", message: 'Error Occurred.. Please try Again later' }); 
  }
  
}

module.exports = { toggleLikeforSpecificPost, followUser, unfollowUser, fetchMyfeed, findPotentialFollowers };