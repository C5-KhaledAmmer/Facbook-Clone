const express = require("express")

const {createNewUser} = require("../controllers/users")

const userRouter = express.Router();


userRouter.post("/",createNewUser)


module.exports = userRouter