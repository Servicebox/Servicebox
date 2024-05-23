//models/Brand.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const brandSchema = new Schema({
    name: { type: String, unique: true, required: true },
    types: [{ type: Schema.Types.ObjectId, ref: 'Type' }]
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand; 