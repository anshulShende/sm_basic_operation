const User = require("../models/userModel");

const login = async(req, res) => {
  username = req.body.username;
  password = req.body.password;
  try{
    let user = await User.findOneAndUpdate({ username: username, password: password }, { isLoggedIn: true },{new: true});
    if (user==null || user.length == 0) {
      return res.status(401).json({result:"Error", message: "Either username or password is Incorrect" });
    }
    res.status(200).json({result:"Success", user: user, message: `Logged in Successfully. Welcome Back ${username} `});
  } catch(err){
    res.status(400).json({result:"Error", message: "Error occured.. Try After Sometime...." });
  }
} 

const signup = (req, res) => {
  const newUser = new User(req.body);
  console.log(newUser);
  newUser
    .save()
    .then((user) =>
      res.status(200).json({result: "Success", user: user, message: `User Sign up successfully, Welcome ${user.name}`}))
    .catch((err) => {
      console.log(err);
      if (err.keyPattern.username == 1 || err.keyPattern.email == 1) {
        res.status(400).json({result: "Error", message: `Sorry, ${err.keyValue.username || err.keyValue.email} already exists`});
      }
  });
};

const logout = async(req, res) => {
  console.log(req.params.id);
  try{
    await User.updateOne({ _id: req.params.id }, { isLoggedIn: false });
    res.status(200).json({result: "Success", message: "User Logged out Successfully"});
  } catch(err) {
    res.status(400).json({result: "Error", message: "Error occured.. Try After Sometime" });
  }
};

module.exports = { login, signup, logout };