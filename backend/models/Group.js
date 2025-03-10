// models/Group.js
const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Group', GroupSchema);

