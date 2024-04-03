//controllers/images
const Image = require('../models/image');
const multer = require('multer');

const fs = require('fs');
const path = require('path');


const uploadDirectory = path.join(__dirname, '..', 'uploads'); 

 
// Создание изображения
  
exports.createImage = async (req, res) => { 
    try { 
        if (!req.file) {
            throw new Error('Необходимо загрузить файл.');
        }

        const { description } = req.body; 
        const { filename, mimetype } = req.file; // Используем filename из req.file

        const newImage = new Image({
            // Вместо пути на файловой системе отправляем относительный URL
            filePath: `/uploads/${filename}`,
            description,
            mimeType: mimetype,
            likes: [] // Инициализируем как пустой массив
        });

        await newImage.save();

        res.status(201).json({
            message: 'Изображение успешно загружено',
            image: {
                // Вернем клиенту объект без пути на сервере
                _id: newImage._id,
                filePath: newImage.filePath,
                description: newImage.description,
                mimeType: newImage.mimeType
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Обновление изображения
exports.updateImage = async (req, res) => {
    try {
        const { src, description, likes } = req.body;
        const updatedImage = await Image.findByIdAndUpdate(req.params.id, {
            src,
            description,
            likes
        }, { new: true });
        res.json(updatedImage);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Удаление изображения
exports.deleteImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (image) {
            // Удалить файл из файловой системы
            const filepath = image.filePath;
            if (fs.existsSync(filepath)) {
                await fs.promises.unlink(filepath);
            }
            // Удалить запись из базы данных
            await image.remove();
            res.json({ message: 'Image deleted successfully'});
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getImages = async (req, res) => {
    try {
        const allImages = await Image.find({});
        const imagesWithBase64 = await Promise.all(allImages.map(async (img) => {
            if (fs.existsSync(img.filePath)) {
                const imageData = await fs.promises.readFile(img.filePath, { encoding: 'base64' });
                return {
                    _id: img._id,
                    description: img.description,
                    mimeType: img.mimeType,
                    src: `data:${img.mimeType};base64,${imageData}`
                };
            } else {
                //  удалить запись из базы данных, если файл больше не существует
                // await Image.findByIdAndRemove(img._id);
                return null;
            }
        }));

        // Убрать из массива все значения null перед отправкой клиенту
        const filteredImages = imagesWithBase64.filter(image => image !== null);

        res.status(200).json(filteredImages);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Добавить функцию для лайка изображения

exports.likeImage = async (req, res) => {
    const imageId = req.params.id;
    const clientId = req.cookies['client-id'];

    if (!clientId) {
        return res.status(400).json({ message: "clientId отсутствует в куках." });
    }

    try {
        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(404).json({ message: "Изображение не найдено." });
        }
        
        // Инициализируем массив likes, если он не существует
        if (!Array.isArray(image.likes)) {
            image.likes = [];
        }

        // Проверяем, есть ли уже clientId в массиве likes
        if (image.likes.includes(clientId)) {
            return res.status(400).json({ message: "Вы уже лайкали это изображение." });
        }

        // Добавляем clientId в массив likes
        image.likes.push(clientId);
        await image.save();

        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};