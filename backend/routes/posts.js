const express = require("express");
const authentication = require("../middleware/authentication");
const {
  createNewPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/posts");
const {createNewComment,updateComment} = require("../controllers/postReactions");
  

const postRouter = express.Router();

//* get Request
postRouter.get("/:user_id", authentication, getAllPosts);

//* Post Request
postRouter.post("/", authentication, createNewPost);
postRouter.post("/:postId/comment", authentication, createNewComment);
//* put Request
postRouter.put("/update", authentication, updatePost);
postRouter.put("/comments/:commentId", authentication, updateComment);

//* delete Request
postRouter.delete("/delete", authentication, deletePost);

module.exports = postRouter;
