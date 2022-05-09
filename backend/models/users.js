const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date , required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  country: { type: String },
  phoneNumber :{type : String},
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  friendRequests: [{type: mongoose.Schema.Types.ObjectId, ref: "FriendRequest"}]
});
userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("User", userSchema);
