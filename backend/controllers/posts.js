const postModel = require("../models/posts");
const userModel = require("../models/users");

const createNewPost = (req, res) => {
  const { content, author } = req.body;
  const newPost = new postModel({ content, author });
  newPost
    .save()
    .then((post) => {
      userModel
        .findOneAndUpdate({ _id: author }, { $push: { posts: post } })
        .then(() => {
          res.status(201).json({
            message: "Post Created Successfully",
            success: true,
            post:{content:post.content,id:post._id}
          });
        })
        .catch((err) => {
          res.status(404).json({
            message: `${err.message}`,
            success: false,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server Error ${err.message}`,
        success: false,
      });
    });
};
const getAllPosts = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const currentUser = await userModel
      .findOne({ _id: userId })
      .deepPopulate(["posts","posts.author","posts.comments.commenter"],{
        populate:{
          "posts":{select:"-_v"},
          "posts.author":{select:"userName profilePicture"},
          "posts.comments.commenter":{select:"userName profilePicture"}
        }
      });
    const userFriends = currentUser.friends;
    let posts = currentUser.posts;

    for (let index in userFriends) {
      const friend = await userModel
        .findOne({ _id: userFriends[index]._id })
        .deepPopulate(["posts","posts.author"],{
          populate:{
            "posts":{select:"-_v"},
            "posts.author":{select:"userName profilePicture"}
          }
        });
      posts = [...posts, ...friend.posts];
    }
    res.status(200).json({
      message: "All the post",
      success: true,
      posts: posts,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
const updatePost = async (req, res) => {
  try {
    const { postId, content } = req.query;

    const updateState = await postModel.updateOne(
      { _id: postId },
      { $set: { content: content } }
    );

    if (updateState.modifiedCount === 1) {
      res.status(201).json({
        message: "Post Updated",
        success: true,
      });
    } else {
      res.status(404).json({
        message: "No Update Take Place",
        success: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
const deletePost = async (req, res) => {
  try {
    const { postId, userId } = req.query;

    await postModel.deleteOne({ _id: postId });
    await userModel.updateOne({ _id: userId }, { $pull: { posts: postId } });

    res.status(200).json({
      message: "Post Deleted",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

module.exports = { createNewPost, getAllPosts, updatePost, deletePost };
