const postModel = require("../models/posts");
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
    console.log(err);
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { comment } = req.body;

    await commentModel.updateOne(
      { _id: commentId },
      { $set: { comment: comment } }
    );
    res.status(200).json({
      message: "Comment Updated",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
const deleteComment = async (req, res) => {
  try {
    const { commentId, postId } = req.body;
    await commentModel.deleteOne({ _id: commentId });
    await postModel.updateOne(
      { _id: postId },
      { $pull: { comments: commentId } }
    );
    res.status(200).json({
      message: "Comment Deleted",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
const createNewLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { likeType, fan } = req.body;
    const newLike = await new likeModel({ likeType, fan }).save();
    await postModel.updateOne({ _id: postId }, { $push: { likes: newLike } });
    res.status(201).json({
      message: "Like Added",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
const deleteLike = async (req, res) => {
  try {
    const { likeId, postId } = req.body;
    await likeModel.deleteOne({ _id: likeId });
    await postModel.updateOne({ _id: postId }, { $pull: { likes: likeId } });
    res.status(200).json({
      message: "Like Deleted",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
module.exports = {
  createNewComment,
  updateComment,
  deleteComment,
  createNewLike,
  deleteLike,
};
