// backend/scripts/migrateSlugs.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/product'); // Исправьте путь если нужно

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/serviceboxdb';

// Функция для генерации slug
function slugify(text) {
  if (!text) return '';
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
}

async function migrateSlugs() {
  try {
    console.log('Starting slug migration...');
    
    // Подключаемся к базе
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Получаем все товары без slug или с проблемными slug
    const products = await Product.find({
      $or: [
        { slug: { $exists: false } },
        { slug: null },
        { slug: '' },
        { slug: 'undefined' }
      ]
    });

    console.log(`Found ${products.length} products to migrate`);

    // Обновляем каждый товар
    for (const product of products) {
      try {
        // Генерируем slug из названия
        let baseSlug = slugify(product.name);
        
        // Если название пустое или slug не получился, используем ID как fallback
        if (!baseSlug) {
          baseSlug = `product-${product._id.toString()}`;
          console.warn(`Empty name for product ${product._id}, using fallback slug: ${baseSlug}`);
        }

        let slug = baseSlug;
        let counter = 1;
        let existingProduct;

        // Проверяем уникальность slug
        do {
          existingProduct = await Product.findOne({ 
            slug, 
            _id: { $ne: product._id } 
          });
          if (existingProduct) {
            slug = `${baseSlug}-${counter}`;
            counter++;
          }
        } while (existingProduct);

        // Обновляем товар
        await Product.findByIdAndUpdate(product._id, { 
          $set: { slug } 
        });
        
        console.log(`Updated product: ${product.name} -> ${slug}`);
      } catch (error) {
        console.error(`Error migrating product ${product._id}:`, error.message);
      }
    }

    console.log('Slug migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
} finally {
    await mongoose.connection.close();
  }
}

// Запускаем миграцию
migrateSlugs();