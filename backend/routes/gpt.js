const express = require('express');
const router = express.Router();
const axios = require('axios');
const Dialog = require('../models/Dialog');
// Можно вынести ключ в переменные окружения!
const GOGPT_API_KEY = 'Tk-Qdtp8AhSRVIEhnaGCqQam5u4dC0VsKLoMTvVPNtUl20u0Ua';

router.post('/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        const result = await axios.post(
            'https://api.gogpt.ru/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: messages, // [{ role: 'user', content: 'Моя проблема...' }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${GOGPT_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        res.json(result.data); // Возвращаем ответ GPT
    } catch (err) {
        console.error(err?.response?.data || err);
        res.status(500).json({ error: 'Ошибка общения с GPT' });
    }
});

router.post('/generate-image', async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await axios.post(
            'https://api.gogpt.ru/v1/images/generations',
            {
                prompt,          // запрос на русском или английском
                n: 1,
                size: '512x512' // или другая
            },
            {
                headers: {
                    'Authorization': `Bearer ${GOGPT_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        res.json(result.data); // в ответе будет url изображения
    } catch (err) {
        console.error(err.response?.data || err);
        res.status(500).json({ error: err.response?.data || 'Ошибка генерации изображения' });
    }
});

router.post('/generate-voice', async (req, res) => {
    try {
        const { text } = req.body;
        const result = await axios.post(
            'https://api.gogpt.ru/v1/audio/speech',
            {
                model: "tts-1",
                input: text,           // Текст для озвучки
                voice: "nova",         // или alloy, echo, fable, onyx
                response_format: "mp3",// еще есть 'opus'
                speed: 1.0,
            },
            {
                headers: {
                    'Authorization': `Bearer ${GOGPT_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                responseType: 'arraybuffer'
            }
        );
        // Отсылаем mp3 клиенту
        res.set('Content-Type', 'audio/mpeg');
        res.send(Buffer.from(result.data, 'binary'));
    } catch (err) {
        console.error(err.response?.data || err);
        res.status(500).json({ error: err.response?.data || 'Ошибка text-to-speech' });
    }
});

router.post('/dialogs/save', async (req, res) => {
    try {
        const { messages } = req.body;
        const gpt_answer = messages.filter(m => m.role === 'assistant').map(m => m.content).join('\n');
        await Dialog.create({ messages, gpt_answer });
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ error: "Ошибка сохранения" });
    }
});

module.exports = router;