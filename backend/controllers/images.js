//controllers/images
const Image = require('../models/image');
const multer = require('multer');

const fs = require('fs');
const path = require('path');
//const imageData = fs.readFileSync(path);
//const encodedImage = imageData.toString('base64');



// Создание изображения
exports.createImage = async (req, res) => {
  try {
      if (!req.file) {
          throw new Error('Необходимо загрузить файл.');
      }
      
      const { description } = req.body;
      const { path, mimetype } = req.file;
      
      // Чтение содержимого файла и преобразование в base64
      const imageData = fs.readFileSync(path, { encoding: 'base64' });

      const newImage = new Image({
          filePath: path,
          description,
          mimeType: mimetype,
          src: `data:${mimetype};base64,${imageData}`,
          likes: 0
      });

      const savedImage = await newImage.save();
      res.status(201).json(savedImage);
      
      // Удаление временного файла после сохранения его в базу данных
      fs.unlinkSync(path);
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
        const image = await Image.findByIdAndRemove(req.params.id);
        res.json({ message: 'Image deleted successfully', image });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getImages = async (req, res) => {
  try {
      // Здесь получаем полный список изображений из базы данных
      const allImages = await Image.find({});
      
      // Маппим каждый объект Image, преобразуя filePath в base64
      const imagesWithBase64 = await Promise.all(allImages.map(async (img) => {
          const imageData = await fs.promises.readFile(img.filePath, { encoding: 'base64' });
          return {
              _id: img._id,
              description: img.description,
              mimeType: img.mimeType,
              src: `data:${img.mimeType};base64,${imageData}`
          };
      }));

      res.status(200).json(imagesWithBase64);
  } catch (error) {
      res.status(500).send(error.message);
  }
};

// Добавить функцию для лайка изображения
exports.likeImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    
    // Поиск изображения по ID и увеличение счетчика лайков
    const updatedImage = await Image.findByIdAndUpdate(imageId, {
      $inc: { likes: 1 }
    }, { new: true });
    
    if (!updatedImage) {
      return res.status(404).send("Изображение не найдено.");
    }
    
    // Отправить обновленные данные обратно клиенту
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).send(error.message);
  }
};