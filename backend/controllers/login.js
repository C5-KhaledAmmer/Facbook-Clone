const userModel = require("../models/users");
const friendRequest = require("../models/friendRequest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const login = (req, res) => {
    const { email, password } = req.body;
    userModel
      .findOne({ email: email })
      .then(async (user) => {
        if (user) {
          bcrypt.compare(password, user.password, async (err, isMatch) => {
            if (isMatch) {
              const payload = {
                userId: user._id,
                country: user.country,
                firstName: user.firstName,
              };
              const token = await jwt.sign(payload, process.env.SECRET);
              res.status(200).json({
                message: "Login Successful",
                success: true,
                token: token,
              });
            } else {
              res.status(404).json({
                message: "Wrong password",
                success: false,
              });
            }
          });
        } else {
          res.status(404).json({
            message: "Email does not exist",
            success: false,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Server Error",
          success: false,
        });
      });
  };

module.exports ={login};