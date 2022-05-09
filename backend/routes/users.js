const express = require("express")

const {createNewUser,sendFriendRequest} = require("../controllers/users")

const userRouter = express.Router();

//* Post Request
userRouter.post("/",createNewUser)


//* Put Request
userRouter.put ("/request",sendFriendRequest)

module.exports = userRouter