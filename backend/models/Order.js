const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        price: Number,
        count: Number,
    }],
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'paid', 'done', 'cancel'], default: "pending" }
});
module.exports = mongoose.model("Order", OrderSchema);