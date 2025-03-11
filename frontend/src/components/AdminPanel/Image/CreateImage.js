import React, { useState, useEffect } from 'react';
import './CreateImage.css';

const CreateImage = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (selectedFiles.some(file => !isValidFile(file))) {
      alert('Один или несколько файлов недопустимы (максимальный размер 5MB, только изображения)');
      return;
    }

    setFiles(selectedFiles);
    
    // Создание превью
    const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const isValidFile = (file) => {
    return file.type.startsWith('image/') && file.size < 5 * 1024 * 1024;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      alert('Пожалуйста, выберите файлы для загрузки');
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    formData.append('description', description);

    try {
      const response = await fetch('https://servicebox35.pp.ru/api/gallery/group', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Ошибка загрузки');
      
      const result = await response.json();
      alert('Изображения успешно загружены!');
      resetForm();
    } catch (error) {
      alert(error.message);
    }
  };

  const resetForm = () => {
    setFiles([]);
    setPreviews([]);
    setDescription('');
  };

  useEffect(() => {
    return () => previews.forEach(url => URL.revokeObjectURL(url));
  }, [previews]);

  return (
    <div className="upload-container">
      <h2>Загрузка группы изображений</h2>
      <form onSubmit={handleSubmit}>
        <div className="upload-area">
          <label className="file-input-label">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
            <span>Выберите файлы или перетащите их сюда</span>
          </label>
          
          <div className="preview-grid">
            {previews.map((url, index) => (
              <div key={index} className="preview-item">
                <img src={url} alt={`Preview ${index + 1}`} />
                <span className="image-number">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="description-field">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Добавьте описание для группы изображений"
            maxLength="500"
          />
          <span className="char-counter">{description.length}/500</span>
        </div>

        <button type="submit" className="upload-button">
          Загрузить группу изображений
        </button>
      </form>
    </div>
  );
};

export default CreateImage;