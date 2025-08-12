const mongoose = require('mongoose');

const userMessageSchema = new mongoose.Schema({
  userId: String,
  telegramMessageId: Number,
  createdAt: { type: Date, default: Date.now, expires: 604800 } // Самоудаление через 7 дней
});

module.exports = mongoose.model('UserMessage', userMessageSchema);