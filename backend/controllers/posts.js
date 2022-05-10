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
    try{
        const userId = req.params.user_id;
        const currentUser =  await  userModel.findOne({_id:userId}).populate("posts");
        const userFriends = currentUser.friends;
        let posts =  currentUser.posts;
      
        for(let index in userFriends){
          const friend = await  userModel.findOne({_id:userFriends[index]._id}).populate("posts");
          posts = [...posts,...friend.posts]
        }
        res.status(200).json({
            message: "All the post",
            success: true,
            posts: posts
          });
    }catch (err){
        res.status(500).json({
            message: "Server Error",
            success: false,
          });
    }


};

module.exports = { createNewPost, getAllPosts };
