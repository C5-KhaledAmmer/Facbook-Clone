const express = require("express")
const authentication = require("../middleware/authentication")
const {createNewPost} = require("../controllers/posts")


const postRouter = express.Router()




//* Post Request
postRouter.post("/",authentication,createNewPost)


module.exports = postRouter