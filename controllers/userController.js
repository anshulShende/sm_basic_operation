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
      res.status(400).json({result: "Error", message: `User with ${username} doesn't exists` });
    } else {
      res.status(200).json({result: "Success", user: user, message: "User fetched Successfully"});
    }
  });
};

module.exports = { getAllUsers, getSpecificUser};
