//mjdels/Users.js
const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailToken: {
    type: String,
  },
  
  date: {
    type: Date,
    default: Date.now,
  },
});
    
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;