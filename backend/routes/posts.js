const express = require("express")
const authentication = require("../middleware/authentication")
const {createNewPost,getAllPosts} = require("../controllers/posts")


const postRouter = express.Router()


//* get Request
postRouter.get("/:user_id",authentication,getAllPosts)

//* Post Request
postRouter.post("/",authentication,createNewPost)


module.exports = postRouter