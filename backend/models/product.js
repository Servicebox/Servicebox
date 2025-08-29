// models/product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true
  },
  slug: { 
    type: String, 
    unique: true 
  },
  images: { type: [String], required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true }
}, {
  versionKey: false
});

// Генерация slug перед сохранением
ProductSchema.pre('save', async function(next) {
  // Генерируем slug только если его нет или имя изменилось
  if (!this.slug || this.isModified('name')) {
    const slugify = (text) => {
      if (!text) return `product-${this._id.toString()}`;
      return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    };

    let baseSlug = slugify(this.name);
    let slug = baseSlug;
    let counter = 1;
    let existingProduct;
    
    // ИСПРАВЛЕНИЕ: используем this.constructor вместо Product
    do {
      existingProduct = await this.constructor.findOne({ 
        slug, 
        _id: { $ne: this._id } 
      });
      if (existingProduct) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    } while (existingProduct);
    
    this.slug = slug;
  }
  
  // Обработка изображений
  if (this.isModified('images') && Array.isArray(this.images)) {
    this.images = this.images.map(img => {
      if (typeof img === 'string') {
        return img.replace(/(\/images\/)+/g, '/images/');
      }
      return img;
    });
  }
  
  next();
});

// Создание индекса для поиска
ProductSchema.index({ category: 1 });
ProductSchema.index({ subcategory: 1 });
ProductSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', ProductSchema);