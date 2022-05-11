const userModel = require("../models/users");
const friendRequest = require("../models/friendRequest");

const register = (req, res) => {
  const user = req.body;
  user.lowerCaseUserName = user.userName.toLowerCase().replaceAll(" ", "");
  const newUser = new userModel(user);
  newUser
    .save()
    .then(() => {
      res.status(201).json({
        message: "User Created Successfully",
        success: true,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({
        message: `Server Error ${err.message}`,
        success: false,
      });
    });
};
const getAllUsers = (req, res) => {
  userModel
    .find({})
    .select("_id userName country")
    .then((users) => {
      res.status(200).json({
        success: true,
        message: `All the users `,
        users: users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel
      .findOne({ _id: userId })
      .deepPopulate(["friendRequests.sender", "friends"], {
        populate: {
          "friendRequests.sender": {
            select: "userName",
          },
          friends: {
            select: "userName",
          },
        },
      })
      .select("userName friendRequests friends posts");
    res.status(200).json({
      message: "User is available",
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Sever Error ",
      success: true,
      user: user,
    });
  }
};
const getUserByUserName = (req, res) => {
  const userName = req.params.name.toLowerCase().replaceAll(" ", "");
  userModel
    .find({ lowerCaseUserName: { $regex: new RegExp(userName) } })
    .select("_id userName")
    .then((users) => {
      if (users) {
        res.status(200).json({
          success: true,
          message: `All the users `,
          users: users,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Not Found `,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
const sendFriendRequest = (req, res) => {
  const { receiver, sender } = req.body;
  const friendReq = new friendRequest({ receiver, sender });
  friendReq
    .save()
    .then((result) => {
      userModel
        .updateOne({ _id: receiver }, { $push: { friendRequests: friendReq } })
        .then(() => {
          res.status(200).json({
            success: true,
            message: `Request Sended`,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const acceptFriendRequest = (req, res) => {
  const { receiver, sender, requestId } = req.body;
  userModel
    .updateOne({ _id: receiver }, { $push: { friends: sender } })
    .then(async (result) => {
      friendRequest.deleteOne({ _id: requestId }).then().catch();
      await userModel.updateOne(
        { _id: sender },
        { $push: { friends: receiver } }
      );
      res.status(200).json({
        success: true,
        message: `request accepted `,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
const deleteFriendRequest = (req, res) => {
  const { receiver, requestId } = req.body;

  userModel
    .updateOne({ _id: receiver }, { $pull: { friendRequests: requestId } })
    .then((result) => {
      friendRequest.deleteOne({ _id: requestId }).then().catch();
      res.status(200).json({
        success: true,
        message: `request deleted `,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
const deleteFriend = (req, res) => {
  const { userId, friendId } = req.body;
  userModel
    .updateOne({ _id: userId }, { $pull: { friends: friendId } })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Friend deleted `,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

module.exports = {
  register,
  sendFriendRequest,
  getAllUsers,
  getUserByUserName,
  getUserById,
  acceptFriendRequest,
  deleteFriendRequest,
  deleteFriend,
};
