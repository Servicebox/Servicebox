//middlewares/auth.js
const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
    // Проверяем наличие уникального идентификатора у клиента
    let clientId = req.cookies['client-id'];

    // Если идентификатора нет, создаём его и устанавливаем в течение года
    if (!clientId) {
        clientId = uuidv4(); // Создаём уникальный идентификатор
        res.cookie('client-id', clientId, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
    }

    // Можно использовать clientId для дальнейшей логики в приложении
    console.log('Client ID:', clientId);
    
    next();
});

// Тестовый маршрут для проверки мидлвара
app.get('/', (req, res) => {
    res.send('Hello, your client ID has been set if it was not present.');
});

// Запускаем приложение
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});