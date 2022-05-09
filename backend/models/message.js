const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

    sender: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    required: true,
  },
  receiver: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
