const express = require("express")
const authentication = require("../middleware/authentication")

const {sendFriendRequest,login, register,getAllUsers ,getUserByUserName,acceptFriendRequest} = require("../controllers/users")

const userRouter = express.Router();

//* Get Request 
userRouter.get("/",authentication,getAllUsers)
userRouter.get("/search_1/:name",authentication,getUserByUserName)

//* Post Request
userRouter.post("/",register)
userRouter.post("/login",login)
userRouter.post("/friend/request",authentication,sendFriendRequest)

//* put Request 
userRouter.put("/users/friend/add",authentication,acceptFriendRequest)

module.exports = userRouter