const jwt = require("jsonwebtoken")

const authentication = (req,res,next)=>{
    if(!req.headers.authorization){
        res.status(404).json({
            message:"something",
            success : false
        })
    }else{
        const token = req.headers.authorization.split(" ").pop();
        jwt.validate(token,()=>{})
    }
}