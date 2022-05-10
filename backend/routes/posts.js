const express = require("express");
const authentication = require("../middleware/authentication");
const {
  createNewPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const postRouter = express.Router();

//* get Request
postRouter.get("/:user_id", authentication, getAllPosts);

//* Post Request
postRouter.post("/", authentication, createNewPost);

//* put Request
postRouter.put("/update", authentication, updatePost);

//* delete Request
postRouter.delete("/delete", authentication, deletePost);

module.exports = postRouter;
