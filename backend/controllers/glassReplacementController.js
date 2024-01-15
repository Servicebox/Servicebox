// controllers/glassReplacementController.js
const GlassReplacementModel = require('../models/glassReplacementModel');

const createGlassReplacement = async (req, res) => {
try {
const { brand, model, price } = req.body;
const newGlassReplacement = new GlassReplacementModel({ brand, model, price });
await newGlassReplacement.save();
res.status(201).json({ message: 'Glass Replacement created successfully' });
} catch (error) {
res.status(500).json({ message: 'Failed to create Glass Replacement' });
}
};

module.exports = { createGlassReplacement };