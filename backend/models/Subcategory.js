const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Виртуальное поле для подсчета товаров в подкатегории
SubcategorySchema.virtual('productCount', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'subcategory',
  count: true
});

module.exports = mongoose.model('Subcategory', SubcategorySchema);