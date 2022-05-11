const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  likeType: { type: String , required: true },
  fan: { type: mongoose.Schema.Types.ObjectId, ref: "User"  },
});
module.exports = mongoose.model("Like",likeSchema)
