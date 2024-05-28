import React, { useState, useEffect } from 'react';

const CreateImage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; 
    if (selectedFile && isValidFile(selectedFile)) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      alert('Выбран некорректный файл.');
    }
  };
  
  const isValidFile = (file) => {
    return file.type.startsWith('image/') && file.size < 5 * 1024 * 1024; // Проверка типа и размера файла
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Пожалуйста, выберите файл для загрузки');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);

    try {
      const response = await fetch('https://servicebox35.pp.ru/api/gallery', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'auth-token': localStorage.getItem('auth-token'), // Добавление токена
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorText = errorData.message || 'Неизвестная ошибка';
        throw new Error(`Ошибка: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      alert('Изображение успешно загружено');
      setFile(null);
      setDescription('');
      setPreviewUrl('');
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div>
      <h1>Загрузка изображения с описанием</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        {previewUrl && <img src={previewUrl} alt="Preview" width="200" />}
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Описание изображения"
        />
        <button type="submit">Загрузить</button>
      </form>
    </div>
  );
};

export default CreateImage;