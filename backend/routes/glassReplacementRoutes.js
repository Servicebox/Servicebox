// routes/glassReplacementRoutes.js
const express = require('express');
const router = express.Router();
const glassReplacementController = require('../controllers/glassReplacementController');

router.post('/glass-replacements', glassReplacementController.createGlassReplacement);

module.exports = router;