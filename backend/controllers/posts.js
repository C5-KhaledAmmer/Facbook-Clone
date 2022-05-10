const postModel = require("../models/posts")
const userModel = require("../models/users")

const createNewPost = (req,res)=>{
    const {content,author} =req.body;
    const newPost = new postModel({content,author});
    newPost.save()
    .then((post) => {
       userModel.findOneAndUpdate({_id:author},{$push :{posts:post}}).then(()=>{
        res.status(201).json({
            message: "Post Created Successfully",
            success: true,
          });
       }).catch((err)=>{
        res.status(404).json({
            message: `${err.message}`,
            success: false,
          }); 
       }) 
      
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server Error ${err.message}`,
        success: false,
      });
    });




}

module.exports= {createNewPost,}