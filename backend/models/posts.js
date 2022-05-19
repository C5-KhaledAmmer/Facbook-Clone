const mongoose = require("mongoose");
const deepPopulate =require('mongoose-deep-populate')(mongoose)
const postSchema = new mongoose.Schema({
  content: { type:  String , required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User"  },
  date :{type : Date ,required:true},
  comments:[{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes : [{type: mongoose.Schema.Types.ObjectId, ref: "Like"}],
});
// postSchema.plugin(deepPopulate);
module.exports = mongoose.model("Post",postSchema)
