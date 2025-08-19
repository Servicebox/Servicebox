import React, { useState, useEffect } from 'react';
import './ImageList.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImageList = () => {
  // Для вывода изображений
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Для загрузки
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Получаем список изображений
  useEffect(() => {
    fetchImages();
    // очистка превью при размонтировании
    return () => previews.forEach(url => URL.revokeObjectURL(url));
    // eslint-disable-next-line
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://servicebox35.pp.ru/api/images', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setImages(data);
    } catch (error) {
      setError('Не удалось загрузить изображения. Пожалуйста, попробуйте позже.');
    }
    setLoading(false);
  };

  // Удаление изображения
  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это изображение?')) {
      try {
        const response = await fetch(`https://servicebox35.pp.ru/api/images/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        setImages(images.filter(image => image._id !== id));
      } catch (error) {
        alert('Не удалось удалить изображение. Пожалуйста, попробуйте позже.');
      }
    }
  };

  // Загрузка файлов
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.some(file => !isValidFile(file))) {
      alert('Один или несколько файлов недопустимы (максимум 5MB, только изображения)');
      return;
    }
    setFiles(selectedFiles);
    // Превью
    previews.forEach(url => URL.revokeObjectURL(url));
    setPreviews(selectedFiles.map(file => URL.createObjectURL(file)));
  };

  const isValidFile = (file) => (
    file.type.startsWith('image/') && file.size <= MAX_FILE_SIZE
  );

  // Отправка файлов
const handleSubmit = async (e) => {
  e.preventDefault();
  if (files.length === 0) {
    alert('Пожалуйста, выберите файлы');
    return;
  }

  if (files.length > 5) {
    alert('Максимум 5 изображений');
    return;
  }

  setIsUploading(true);
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));
  formData.append('description', description);

  try {
    const response = await fetch('https://servicebox35.pp.ru/api/gallery/group', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка загрузки');
    }
    
    const result = await response.json();
    resetForm();
    await fetchImages();
    alert(`Изображения успешно загружены! Обработано: ${result.processedCount}`);
  } catch (error) {
    alert(error.message);
  }
  setIsUploading(false);
};

  const resetForm = () => {
    setFiles([]);
    previews.forEach(url => URL.revokeObjectURL(url));
    setPreviews([]);
    setDescription('');
  };

  // Верстка
  return (
    <div className="image-list-wrapper">
      <h1>Галерея изображений</h1>

      {/* Блок загрузки */}
      <div className="upload-container">
        <h2>Загрузка изображений</h2>
        <form className="upload-form" onSubmit={handleSubmit}>
          <label className="file-input-label">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              disabled={isUploading}
            />
            <span>Выберите файлы или перетащите их сюда</span>
          </label>
          {previews.length > 0 && (
            <div className="preview-grid">
              {previews.map((url, index) => (
                <div key={index} className="preview-item">
                  <img src={url} alt={`Preview ${index + 1}`} />
                  <span className="image-number">{index + 1}</span>
                </div>
              ))}
            </div>
          )}
          <div className="description-field">
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Описание (опционально)"
              maxLength={500}
            />
            <span className="char-counter">{description.length}/500</span>
          </div>
          <button type="submit" className="upload-button" disabled={isUploading || files.length === 0}>
            {isUploading ? 'Загрузка...' : 'Загрузить изображения'}
          </button>
        </form>
      </div>

      <h2>Список ваших изображений</h2>
      {loading ? (
        <div>Загрузка...</div>
      ) : error ? (
        <div className="load-error">{error}</div>
      ) : (
        <div className="image-grid">
          {images.map(image => (
            <div key={image._id} className="image-item">
              <img
                className='image-icon__item'
                src={`https://servicebox35.pp.ru${image.filePath}`}
                alt={image.description || 'Изображение'}
              />
              <div className="image-info">
                <p>{image.description || <span className="desc-muted">Без описания</span>}</p>
                <button className="delete-btn" onClick={() => handleDelete(image._id)}>
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageList;