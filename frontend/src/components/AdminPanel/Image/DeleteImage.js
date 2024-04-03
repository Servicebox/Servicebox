import React, { useState } from 'react';
import axios from 'axios';

const DeleteImage = () => {
    const [imageId, setImageId] = useState('');
    const [deleted, setDeleted] = useState(false);
  
    const handleDeleteImage = async () => {
        try {
          const response = await axios.delete(`https://servicebox35.pp.ru/api/images/delete/${imageId}`);
      
          if (response.status === 200) {
            setDeleted(true);
          } else {
            throw new Error('Не удалось удалить изображение');
          }
        } catch (error) {
          console.error('Ошибка при удалении изображения:', error);
        }
      };
  
    return (
      <div className='delete'>
        {!deleted ? (
          <>
            <input type='text' value={imageId} onChange={(e) => setImageId(e.target.value)} placeholder='Введите id изображения'/>
            <button className='delete__btn' onClick={handleDeleteImage}>Удалить изображение</button>
          </>
        ) : (
          <p>Изображение с id {imageId} успешно удалено</p>
        )}
      </div>
    );
  };
  
  export default DeleteImage;