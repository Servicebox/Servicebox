import React, { useState, useEffect } from 'react';
import './ImageList.css'; // Не забудьте создать этот файл для стилей

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('https://servicebox35.pp.ru/api/images', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setImages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Не удалось загрузить изображения. Пожалуйста, попробуйте позже.');
      setLoading(false);
    }
  };

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

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setImages(images.filter(image => image._id !== id));
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Не удалось удалить изображение. Пожалуйста, попробуйте позже.');
      }
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="image-list">
      <h1>Список изображений</h1>
      <div className="image-grid">
        {images.map(image => (
          <div key={image._id} className="image-item">
            <img className='image-icon__item'
              src={`https://servicebox35.pp.ru${image.filePath}`} 
              alt={image.description || 'Изображение'}
            />
            <div className="image-info">
              <p>{image.description || 'Без описания'}</p>
              <button onClick={() => handleDelete(image._id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;