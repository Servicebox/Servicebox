// models/GlassReplacementModel.js

const mongoose = require('mongoose');

const glassReplacementSchema = new mongoose.Schema({
  brand: String,
  model: String,
  price: String
});

const GlassReplacementModel = mongoose.model('GlassReplacement', glassReplacementSchema);

module.exports = GlassReplacementModel;