const express = require("express")
const authentication = require("../middleware/authentication")

const {sendFriendRequest,login, register} = require("../controllers/users")

const userRouter = express.Router();

//* Post Request
userRouter.post("/",register)
userRouter.post("/login",login)
userRouter.post("/friend/request",authentication,sendFriendRequest)


module.exports = userRouter