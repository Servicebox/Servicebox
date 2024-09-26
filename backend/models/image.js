//models/image
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filePath: { type: String, required: true },
  description: { type: String },
  mimeType: { type: String, required: true },
   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);