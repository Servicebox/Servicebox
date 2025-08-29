// backend/scripts/fix-empty-names.js
// backend/scripts/fixEmptyNames.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/serviceboxdb';

async function fixEmptyNames() {
  try {
    console.log('Starting to fix empty product names...');
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Находим товары с пустыми или отсутствующими названиями
    const products = await Product.find({
      $or: [
        { name: { $exists: false } },
        { name: '' },
        { name: null },
        { name: { $regex: /^\s*$/ } } // Только пробелы
      ]
    });

    console.log(`Found ${products.length} products with empty names`);

    // Обновляем каждый товар
    for (const product of products) {
      try {
        let newName;
        
        // Пытаемся создать имя на основе slug
        if (product.slug) {
          newName = product.slug
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace(/Product\s+/i, ''); // Убираем "product" из начала
        } else {
          // Если slug тоже нет, используем generic имя
          newName = `Товар ${product._id.toString().slice(-6)}`;
        }

        // Обновляем товар
        await Product.findByIdAndUpdate(product._id, { 
          $set: { name: newName } 
        });
        
        console.log(`Updated product ${product._id}: -> "${newName}"`);
      } catch (error) {
        console.error(`Error fixing product ${product._id}:`, error.message);
      }
    }

    console.log('Empty names fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to fix empty names:', error);
    process.exit(1);
  }
}

fixEmptyNames();