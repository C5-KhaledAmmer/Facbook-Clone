const userModel = require("../models/users");
const createNewUser = (req, res) => {
  const user = req.body;

  const newUser = new userModel(user);
  newUser
    .save()
    .then(() => {
     
      res.status(201).json({
          message : "User Created Successfully",
          success : true,
      });
    })
    .catch((err) => {
      res.status(404).json(res.status(201).json({
          message : err.message,
          success : false,
      }));
    });
  console.log(user);
};
const sendFriendRequest = (req, res) => {

};

module.exports = { createNewUser, sendFriendRequest };
