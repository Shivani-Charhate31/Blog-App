const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  posts: { type: Number, default: 0 },


},
  {
    timestamps: true // This is the correct placement as a schema option
  });
const userModel = mongoose.model('users', userSchema)

module.exports = { userModel }
