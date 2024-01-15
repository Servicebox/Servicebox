//models/serviceSchema.js


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  serviceName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;