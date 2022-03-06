const User = require("../models/userModel");

const getAllUsers = (req, res) => {
  User.find({}, (err, user) => {
    if(err){
      return res.status(403).json({message: "Error Occured. Please try again after some time"});
    }
    if(user.length == 0){
      return res.status(200).json({message: "No Users to fetch"});
    }else {
      return res.status(200).json({users: user, message: "All Users fetched successfully"});
    }
    
  });
};

const getSpecificUser = (req, res) => {
  User.find({ username: req.params.username }, (err, user) => {
    if (user==null || user.length == 0) {
      res.status(400).json({result: "Error", message: `User with username: ${req.params.username} doesn't exists` });
    } else {
      res.status(200).json({result: "Success", user: user, message: "User fetched Successfully"});
    }
  });
};

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

module.exports = { getAllUsers, getSpecificUser, followUser, unfollowUser };
