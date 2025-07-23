const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecret';
const fetchUser = require('../middlewares/fetchUser');


// Для генерации токенов, с ролью
function createTokens(user) {
    const accessToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
    const refreshToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
    return { accessToken, refreshToken };
}
router.get('/profile', fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, '-password -refreshToken');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/all', fetchUser, async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Нет доступа" });
    const users = await User.find({}, '-password');
    res.json(users);
});
// USER REGISTRATION
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, phone, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Требуются имя, email и пароль" });
        }
        if (role && role !== "user") {
            return res.status(403).json({ message: "Нельзя выбрать эту роль" });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(409).json({ message: "Пользователь с такой почтой уже есть" });
        }

        const user = await User.create({
            username, email, phone,
            password: await bcrypt.hash(password, 10),
            role: "user"
        }); // по умолчанию role = user
        const tokens = createTokens(user);
        user.refreshToken = tokens.refreshToken;
        await user.save();
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            tokens
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/signup', async (req, res) => {
    const { username, email, password, phone } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "Заполните все поля" });
    if (await User.findOne({ email })) return res.status(409).json({ message: "Email занят" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, phone });
    res.json({ message: "Регистрация успешна" });
});
router.get('/validate-token', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ valid: false, message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id, '-password -refreshToken');
    
    if (!user) {
      return res.status(404).json({ valid: false, message: "User not found" });
    }

    res.json({
      valid: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(401).json({ valid: false, message: "Invalid token" });
  }
});
// USER LOGIN
// USER LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Пользователь не найден' });
        }
        const passOk = await bcrypt.compare(password, user.password);
        if (!passOk) {
            return res.status(401).json({ message: 'Пароль неверен' });
        }

        // Всё хорошо — выдаём токены
        const tokens = createTokens(user);
        user.refreshToken = tokens.refreshToken;
        await user.save();

        // Отправляем role, username и т.д.
        res.json({
            tokens,
            role: user.role,
            id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка входа' });
    }
});

module.exports = router;