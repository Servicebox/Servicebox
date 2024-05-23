//models/Devise.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const deviceSchema = new Schema({
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    img: { type: String, required: true },
    typeId: { type: Schema.Types.ObjectId, ref: 'Type' },
    brandId: { type: Schema.Types.ObjectId, ref: 'Brand' },
    info: [{
        title: { type: String, required: true },
        description: { type: String, required: true }
    }]
});

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;