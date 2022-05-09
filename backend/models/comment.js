const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: { String }, required: true },
  type : {type : {String}},
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User"  },
});
module.exports = mongoose.model("Comment",commentSchema)
