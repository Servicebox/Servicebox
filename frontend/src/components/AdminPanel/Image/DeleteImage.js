import React, { useState } from 'react';
import axios from 'axios';

const DeleteImage = () => {
    const [imageId, setImageId] = useState('');
    const [deleted, setDeleted] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteImage = async () => {
        setError(null);
        try {
            const response = await axios.delete(`https://servicebox35.pp.ru/api/images/delete/${imageId}`);
            if (response.status === 200) {
                setDeleted(true);
            } else {
                setError('Не удалось удалить изображение: ' + response.data.message);
            }
        } catch (error) {
            console.error('Полная ошибка:', error);
            setError('Ошибка при удалении изображения: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className='delete'>
            {!deleted ? (
                <>
                    <input type='text' value={imageId} onChange={(e) => setImageId(e.target.value)} placeholder='Введите id изображения' />
                    <button className='delete__btn' onClick={handleDeleteImage}>Удалить изображение</button>
                    {error && <p className="error">{error}</p>}
                </>
            ) : (
                <p>Изображение с id {imageId} успешно удалено</p>
            )}
        </div>
    );
};

export default DeleteImage;