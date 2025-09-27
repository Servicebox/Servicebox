// telegramMsg.js

const config = require('../config/config.json');
const axios = require('axios');
const TELEGRAM_API_URL = 'https://api.telegram.org/bot';
let lastUpdateId = 0; // Переменная для отслеживания последнего update_id

// Функция для отправки сообщений
// Универсальная функция для отправки сообщений
async function sendTelegramMessage(text) {
    try {
        const response = await axios.post(
            `${TELEGRAM_API_URL}${config.telegram.token}/sendMessage`,
            {
                chat_id: config.telegram.chat,
                parse_mode: 'HTML',
                text: text
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 8000 // Таймаут 5 секунд
            }
        );
        
        return response.data;
    } catch (error) {
        console.error('Telegram API error:', error.response?.data || error.message);
        throw new Error('Failed to send message to Telegram');
    }
}

module.exports.sendMsg = async (req, res) => {
    try {
        const { name, phone, description } = req.body;
        const message = `
            <b>Name</b>: ${name}
            <b>Phone</b>: ${phone}
            <b>Description</b>: ${description}
        `;
        
        await sendTelegramMessage(message);
        
        res.status(200).json({
            status: 'ok',
            message: 'Успешно отправлено!'
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка при отправке сообщения'
        });
    }
};

module.exports.sendChatMessage = async (req, res) => {
    try {
        const { text, userId } = req.body;
        const message = `USER:${userId}\n${text}`;
        
        await sendTelegramMessage(message);
        
        res.status(200).json({
            status: 'ok',
            message: 'Сообщение успешно отправлено!'
        });
    } catch (error) {
        console.error('Error sending chat message:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка при отправке сообщения'
        });
    }
};
let isFetchingUpdates = false;

// Эндпоинт для обработки входящих обновлений
module.exports.webhook = (req, res) => {
  const update = req.body; // Получаем данные из тела запроса

  // Обработка входящих сообщений
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    // Здесь логика отправки ответа пользователю через ваш сервер
    sendReplyToUser(chatId, "Ваше сообщение получено!");
  }

  res.status(200).send('ok'); // Уведомляем Telegram, что всё обработано
};

const sendReplyToUser = async (chatId, text) => {
  try {
    await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: chatId,
      text: text,
    });
  } catch (error) {
    console.error("Ошибка при отправке ответа пользователю:", error);
  }
};