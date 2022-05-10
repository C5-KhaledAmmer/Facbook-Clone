const postModel = require("../models/posts");
const userModel = require("../models/users");
const commentModel = require("../models/comment");
const likeModel = require("../models/like");

const createNewComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { comment, commenter } = req.body;
    const newComment = await new commentModel({ comment, commenter }).save();
    await postModel.updateOne(
      { _id: postId },
      { $push: { comments: newComment } }
    );
    res.status(201).json({
      message: "Comment Added",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

module.exports = { createNewComment };
