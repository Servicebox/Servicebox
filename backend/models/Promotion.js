const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    endDate: { type: Date, required: true },
    image: { type: String, default: "" }, // url или путь к файлу
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Promotion', PromotionSchema);