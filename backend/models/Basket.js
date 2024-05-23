//models/Basket.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const basketSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Basket = mongoose.model('Basket', basketSchema);
module.exports = Basket;