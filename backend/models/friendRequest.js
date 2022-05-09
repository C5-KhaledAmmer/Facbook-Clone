const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({

    sender: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    required: true,
  },
  receiver: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    required: true,
  },
  state :{type:{String}}
});

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
