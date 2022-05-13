const userModel = require("../models/users");
const friendRequest = require("../models/friendRequest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
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
          userId: user._id,
        });
      } else {
        res.status(404).json({
          message: "Wrong password",
          success: false,
        });
      }
    } else {
      res.status(404).json({
        message: "Email does not exist",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }

  /*   userModel
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
              userId: user._id,
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
    }); */
};

module.exports = { login };
