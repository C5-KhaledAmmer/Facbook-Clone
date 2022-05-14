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
          userInfo: { friends: user.friends, userName: user.userName },
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
    console.log("dasdasd");
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

module.exports = { login };
