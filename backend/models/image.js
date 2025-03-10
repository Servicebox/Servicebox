
// models/Image.js
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  filePath: String,
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', ImageSchema);