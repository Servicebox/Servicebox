//models/image
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filePath: { type: String, required: true },
  description: { type: String },
  mimeType: { type: String, required: true },
  likes: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);