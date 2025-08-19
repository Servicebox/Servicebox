const multer = require('multer');
const path = require('path');
const fs = require('fs');

const galleryStorage = multer.memoryStorage();
const uploadDir = path.resolve(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4', 
    'video/quicktime', // .mov
    'video/x-msvideo', // .avi
    'video/x-matroska' // .mkv
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Разрешены только изображения (JPEG, PNG, WebP) и видео (MP4, MOV, AVI, MKV)!'), false);
  }
};
const galleryUpload = multer({
  storage: galleryStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Неверный тип файла. Разрешены только изображения.'), false);
    }
  },
  limits: {
   MfileSize: 1024 * 1024 * 100
  }
});
// Создаем базовый мидлвар Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 100 // 100MB
  }
});

// Экспортируем uploadDir и базовый мидлвар
module.exports = {
  upload,
  uploadDir,
  galleryUpload
};