// middlewares/fetchUser.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_ecom';

const fetchUser = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ errors: "Пожалуйста, пройдите аутентификацию" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ errors: "Пожалуйста, пройдите аутентификацию" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error('Ошибка при проверке токена:', error.message);
        res.status(401).json({ errors: "Пожалуйста, пройдите аутентификацию" });
    }
};

module.exports = fetchUser;