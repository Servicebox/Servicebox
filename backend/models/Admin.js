const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

AdminSchema.pre('save', async function (next) {
  const admin = this;
  if (!admin.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  next();
});



module.exports = mongoose.model('Admin', AdminSchema);