const mongoose = require('mongoose');
 const { uploadDir } = require('../config/multer');
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Заголовок обязателен'],
    trim: true,
    maxlength: [200, 'Заголовок не может быть длиннее 200 символов']
  },
  contentBlocks: [{
    type: { 
      type: String, 
      enum: ['text', 'image', 'video'],
      required: true
    },
    content: String,
    media: String,
    mediaType: String,
    description: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

newsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('News', newsSchema);