const express = require("express")

const {createNewUser,sendFriendRequest,login} = require("../controllers/users")

const userRouter = express.Router();

//* Post Request
userRouter.post("/",createNewUser)
userRouter.post("/login",login)



module.exports = userRouter