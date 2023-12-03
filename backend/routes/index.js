const express = require('express')
const router = express.Router()


const ctrlTelegram = require('../api/telegramMsg');
router.post('/telegram', ctrlTelegram.sendMsg);

module.exports = router;