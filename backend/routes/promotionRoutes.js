const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Promotion = require('../models/Promotion');
const { requireAdmin } = require('../middlewares/authMiddleware');

const uploadDir = path.join(__dirname, '..', 'uploads', 'promotions');
fs.mkdirSync(uploadDir, { recursive: true });

const promotionImageStorage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, uploadDir); },
    filename: function (req, file, cb) { cb(null, 'promo_' + Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage: promotionImageStorage });

router.get('/', async (req, res) => {
    const promotions = await Promotion.find().sort({ endDate: -1 });
    res.json(promotions);
});

router.get('/:id', async (req, res) => {
    const promo = await Promotion.findById(req.params.id);
    if (!promo) return res.status(404).json({ message: "Not found" });
    res.json(promo);
});

router.post('/', requireAdmin, upload.single('image'), async (req, res) => {
    const { title, description, endDate } = req.body;
    let imageUrl = "";
    if (req.file) imageUrl = `/uploads/promotions/${req.file.filename}`;
    const promo = await Promotion.create({ title, description, endDate, image: imageUrl });
    res.status(201).json(promo);
});
router.put('/:id', requireAdmin, upload.single('image'), async (req, res) => {
    const promo = await Promotion.findById(req.params.id);
    if (!promo) return res.status(404).json({ message: "Promotion not found" });

    if (req.body.title) promo.title = req.body.title;
    if (req.body.description) promo.description = req.body.description;
    if (req.body.endDate) promo.endDate = req.body.endDate;
    if (req.file) {
        // Remove old file
        if (promo.image && promo.image.startsWith("/uploads"))
            fs.unlink(path.join(__dirname, '..', promo.image), err => { });
        promo.image = "/uploads/promotions/" + req.file.filename;
    }
    await promo.save();
    res.json(promo);
});
router.delete('/:id', requireAdmin, async (req, res) => {
    const promo = await Promotion.findById(req.params.id);
    if (!promo) return res.status(404).json({ message: "Promotion not found" });
    if (promo.image && promo.image.startsWith("/uploads"))
        fs.unlink(path.join(__dirname, '..', promo.image), (err) => { });
    await promo.deleteOne();
    res.json({ message: 'Deleted' });
});

module.exports = router;