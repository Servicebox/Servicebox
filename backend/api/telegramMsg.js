const request = require('request');
const config = require('../config/config.json'); // Подставьте путь к вашему файлу конфигурации

module.exports.sendMsg = (req, res) => {
    let reqBody = req.body;

    let fields = [
        '<b>Name</b>: ' + reqBody.name,
        '<b>Phone</b>: ' + reqBody.phone,
        '<b>Description</b>: ' + reqBody.description,
    ];
    let msg = fields.join('\n');

    request.post(
        {
            url: `https://api.telegram.org/bot${config.telegram.token}/sendMessage`,
            form: {
                chat_id: config.telegram.chat,
                parse_mode: 'html',
                text: msg, // Сообщение для отправки
            },
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
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