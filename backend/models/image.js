//models/image
const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  filePath: { type: String, required: true },
  description: { type: String },
  mimeType: { type: String, required: true },
  likes: { type: [String], default: [] },
});

module.exports = mongoose.model('Image', imageSchema); 