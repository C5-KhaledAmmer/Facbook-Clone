const express = require("express")
const authentication = require("../middleware/authentication")

const {sendFriendRequest,register,getAllUsers ,getUserByUserName,acceptFriendRequest,deleteFriendRequest,deleteFriend,getUserById} = require("../controllers/users")

const userRouter = express.Router();

//* Get Request 
userRouter.get("/",authentication,getAllUsers)
userRouter.get("/:userId",authentication,getUserById)
userRouter.get("/search_1/:name",authentication,getUserByUserName)

//* Post Request
userRouter.post("/",register)

userRouter.post("/friend/request",authentication,sendFriendRequest)

//* put Request 
userRouter.put("/friend/add",authentication,acceptFriendRequest)

//* delete Request
userRouter.delete("/friend/request/delete",authentication,deleteFriendRequest)
userRouter.delete("/friend/delete",authentication,deleteFriend)

module.exports = userRouter