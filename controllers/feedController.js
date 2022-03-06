const Post = require('../models/postModel');
const User = require('../models/userModel');

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

module.exports = { fetchMyfeed, findPotentialFollowers };