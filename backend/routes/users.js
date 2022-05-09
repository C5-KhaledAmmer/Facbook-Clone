const express = require("express")
const authentication = require("../middleware/authentication")

const {sendFriendRequest,login, register,getAllUsers} = require("../controllers/users")

const userRouter = express.Router();

//* Get Request 
userRouter.get("/",authentication,getAllUsers)

//* Post Request
userRouter.post("/",register)
userRouter.post("/login",login)
userRouter.post("/friend/request",authentication,sendFriendRequest)


module.exports = userRouter