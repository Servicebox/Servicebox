// telegramMsg.js

const config = require('../config/config.json');
const axios = require('axios');
const TELEGRAM_API_URL = 'https://api.telegram.org/bot';
let lastUpdateId = 0; // Переменная для отслеживания последнего update_id

// Функция для отправки сообщений
module.exports.sendMsg = async (req, res) => {
    let reqBody = req.body;
    let fields = [
        '<b>Name</b>: ' + reqBody.name,
        '<b>Phone</b>: ' + reqBody.phone,
        '<b>Description</b>: ' + reqBody.description,
    ];
    let msg = fields.join('\n');
    msg = encodeURI(msg);

   await axios.post(
        `https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${msg}`,
        function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            if (response.statusCode === 200) {
                res.status(200).json({
                    status: 'ok',
                    message: 'Успешно отправлено!',
                });
            } else {
                res.status(400).json({
                    status: 'error',
                    message: 'Произошла ошибка!',
                });
            }
        }
    );
};

// Функция для отправки сообщений из чата
module.exports.sendChatMessage = async (req, res) => {
    const { text, userId } = req.body;

    if (!text || !userId) {
        return res.status(400).json({ status: 'error', message: 'Недостаточно данных для отправки сообщения.' });
    }

    const message = `USER:${userId}\n${text}`;

    try {
        const response = await axios.post(`${TELEGRAM_API_URL}${config.telegram.token}/sendMessage`, {
            chat_id: config.telegram.chat,
            parse_mode: 'HTML',
            text: message
        });

        if (response.status === 200) {
            res.status(200).json({
                status: 'ok',
                message: 'Сообщение успешно отправлено!'
            });
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Ошибка при отправке сообщения.'
            });
        }
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error.message);
        res.status(500).json({ status: 'error', message: 'Ошибка сервера' });
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