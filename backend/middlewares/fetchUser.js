// middlewares/fetchUser.js

const jwt = require('jsonwebtoken'); // Импортируем jsonwebtoken
const JWT_SECRET = process.env.JWT_SECRET || 'secret_ecom'; // Определяем секретный ключ

const fetchUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Извлекаем токен из заголовка

    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен или неверен' });
    }

    try {
        // Проверяем токен
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Добавляем информацию о пользователе в объект запроса
        next(); // Переходим к следующему middleware или обработчику маршрута
    } catch (err) {
        console.error('Ошибка при проверке токена:', err.message);
        return res.status(403).json({ message: 'Токен недействителен' });
    }
};

module.exports = fetchUser;