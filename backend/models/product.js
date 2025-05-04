{/*// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true, text: true },
  description: { type: String, text: true }, // Добавьте, если необходим текстовый поиск по описанию
  image: { type: String, required: true },
  category: { type: String, required: true, text: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
  quantity: { type: Number, required: true, default: 0 },
});

// Создаем текстовый индекс для поиска
productSchema.index({ name: 'text', description: 'text', category: 'text' });

*/}