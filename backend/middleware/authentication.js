const jwt = require("jsonwebtoken")

const authentication = (req,res,next)=>{
  console.log(req.headers.authorization);
    if(!req.headers.authorization){
        res.status(403).json({
            message:"Forbidden",
            success : false
        })
    }else{
        const token = req.headers.authorization.split(" ").pop();
        jwt.verify(token,process.env.SECRET,(err,result)=>{
            if (err) {
                res.status(403).json({
                  success: false,
                  message: `The token is invalid or expired`,
                });
              } else {
                req.token = result;
                next();
              }
        })
    }
}
module.exports = authentication