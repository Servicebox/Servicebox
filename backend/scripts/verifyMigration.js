// backend/scripts/verifyMigration.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/serviceboxdb';

async function verifyMigration() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Проверяем товары без slug
    const withoutSlug = await Product.countDocuments({
      $or: [
        { slug: { $exists: false } },
        { slug: null },
        { slug: '' }
      ]
    });
    console.log(`Products without slug: ${withoutSlug}`);

    // Проверяем товары с пустыми именами
    const emptyNames = await Product.countDocuments({
      $or: [
        { name: { $exists: false } },
        { name: '' },
        { name: null }
      ]
    });
    console.log(`Products with empty names: ${emptyNames}`);

    // Проверяем дубликаты slug
    const duplicateSlugs = await Product.aggregate([
      { $group: { 
        _id: "$slug", 
        count: { $sum: 1 } 
      }},
      { $match: { 
        _id: { $ne: null },
        count: { $gt: 1 } 
      }}
    ]);
    console.log(`Duplicate slugs found: ${duplicateSlugs.length}`);

    // Выводим примеры дубликатов
    if (duplicateSlugs.length > 0) {
      console.log('Duplicate slugs:');
      duplicateSlugs.forEach(dup => {
        console.log(`- ${dup._id}: ${dup.count} products`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  }
}

verifyMigration();