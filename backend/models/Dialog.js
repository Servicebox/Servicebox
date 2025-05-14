const mongoose = require('mongoose');
const dialogSchema = new mongoose.Schema({
    messages: [{ role: String, content: String }],
    gpt_answer: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Dialog', dialogSchema);