// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isVerified: { type: Boolean, default: false },

  refreshToken: String,// для jwt
  cartData: {
    type: Map,
    of: Number,
    default: {}
  }
});

module.exports = mongoose.model("User", UserSchema);