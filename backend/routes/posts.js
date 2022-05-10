const express = require("express");
const authentication = require("../middleware/authentication");
const {
  createNewPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/posts");
const {createNewComment} = require("../controllers/postReactions");
  

const postRouter = express.Router();

//* get Request
postRouter.get("/:user_id", authentication, getAllPosts);

//* Post Request
postRouter.post("/", authentication, createNewPost);

//* put Request
postRouter.put("/update", authentication, updatePost);
postRouter.put("/:postId/comment", authentication, createNewComment);

//* delete Request
postRouter.delete("/delete", authentication, deletePost);

module.exports = postRouter;
