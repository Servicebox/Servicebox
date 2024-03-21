//models/image
const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
  filePath: { type: String, required: true },
  description: { type: String, required: true },
  mimeType: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 }, // Добавлено поле `likes`
});

module.exports = mongoose.model('Image', imageSchema);