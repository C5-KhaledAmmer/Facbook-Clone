const userModel =require("../models/users")
const createNewUser = (req,res)=>{
    const user = req.body;
    
    const newUser = new userModel(user);
    newUser.save().then(()=>{
        console.log("Khaled");
        res.status(201).json("True")
    }).catch((err)=>{
        res.status(404).json(err.message)
    })
    console.log(user);
}


module.exports = {createNewUser}