const mongoose = require("mongoose");
const friendRequest = require("./friendRequest");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: { Date }, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  country: { type: String },
  phoneNumber :{type : String},
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  friendRequests: [{type: mongoose.Schema.Types.ObjectId, ref: "FriendRequest"}]
});

module.exports = mongoose.model("User", userSchema);
