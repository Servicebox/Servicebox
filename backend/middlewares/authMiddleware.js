const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecret';

// Только если token есть и он админ
function requireAdmin(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Нет токена" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin') return res.status(403).json({ message: "Требуется админ" });
        req.user = decoded;
        next();
    } catch (e) {
        console.log('Token verification error:', e);
        return res.status(401).json({ message: "Некорректный токен" });
    }
}

// Просто требуется юзер (любого типа)
function requireAuth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Нет токена" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: "Некорректный токен" });
    }
}

module.exports = { requireAdmin, requireAuth };