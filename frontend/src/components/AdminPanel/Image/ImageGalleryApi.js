import React, { useState, useEffect } from "react";
import "./ImageGalleryApi.css";
import likeIconUrl from "../../../images/likeactive.png";
import likeInactiveIconUrl from "../../../images/like.png";
import ImageModal from "./ImageModal";

const ImageGalleryApi = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userLikes, setUserLikes] = useState([]);
  const [showAfter, setShowAfter] = useState({});

  useEffect(() => {
    fetchImages();
    fetchUserLikes();
  }, []);

  const fetchImages = async () => {
    try {
      console.log('Отправка запроса к серверу для получения изображений...');
      const token = localStorage.getItem('auth-token'); // Получение токена
      console.log('Токен для fetchImages:', token);
      const response = await fetch('https://servicebox35.pp.ru/api/images', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }), // Добавление заголовка Authorization
        },
      });

      if (!response.ok) {
        const errResponse = await response.json();
        throw new Error(errResponse.message || 'Ошибка при получении изображений');
      }

      const fetchedImages = await response.json();
      const imagesWithCorrectPath = fetchedImages.map(img => ({
        ...img,
        filePath: `https://servicebox35.pp.ru/uploads/gallery/${img.filePath.split('/').pop()}`, // Исправление пути к файлу
      }));
      setImages(imagesWithCorrectPath);
    } catch (error) {
      console.error('Ошибка при получении изображений:', error);
      alert('Ошибка загрузки изображений: ' + error.message);
    }
  };

  const fetchUserLikes = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        console.warn('Токен отсутствует, пользователь не авторизован');
        return;
      }
      console.log('Токен для fetchUserLikes:', token);

      const response = await fetch('https://servicebox35.pp.ru/api/images/user-likes', {
        headers: {
          'Authorization': `Bearer ${token}`, // Bearer токен обязателен
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      console.log('Статус ответа fetchUserLikes:', response.status);

      if (!response.ok) {
        let errorMessage = 'Неизвестная ошибка';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Не удалось распарсить JSON из ошибки:', e);
        }
        console.warn('Ошибка получения лайков пользователя:', errorMessage);
        alert(`Ошибка получения лайков: ${errorMessage}`);
        return;
      }

      const likes = await response.json();
      console.log('Полученные лайки пользователя:', likes);
      setUserLikes(likes); // Обновляем состояние
    } catch (error) {
      console.error('Ошибка при получении лайков:', error.message);
      alert('Ошибка при получении лайков: ' + error.message);
    }
  };

  // Handle like operation
  const toggleLikeImage = async (imageId) => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        alert('Пожалуйста, авторизуйтесь для выполнения этого действия');
        return;
      }

      const hasLiked = userLikes.includes(imageId);
      const method = hasLiked ? 'DELETE' : 'POST';
      console.log(`Отправка ${method} запроса для изображения ID: ${imageId}`);
      const response = await fetch(`https://servicebox35.pp.ru/api/images/like/${imageId}`, {
        method,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log(`Статус ответа ${method} запроса:`, response.status);

      if (response.ok) {
        const updatedImage = await response.json();
        console.log('Обновленное изображение после лайка:', updatedImage);
        setImages(images.map(img =>
          img._id === imageId ? { ...img, likes: updatedImage.image.likes } : img
        ));

        // Обновляем userLikes на клиенте
        if (hasLiked) {
          setUserLikes(userLikes.filter(id => id !== imageId));
        } else {
          setUserLikes([...userLikes, imageId]);
        }

        alert(hasLiked ? 'Лайк успешно удален!' : 'Лайк успешно поставлен!');
      } else {
        let errorMessage = 'Неизвестная ошибка';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Не удалось распарсить JSON из ошибки:', e);
        }
        alert(`Ошибка: ${errorMessage}`);
      }
    } catch (error) {
      alert(`Ошибка переключения лайка: ${error.message}`);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const toggleBeforeAfter = (imageId) => {
    setShowAfter(prev => ({
      ...prev,
      [imageId]: !prev[imageId]
    }));
  };

  return (
    <div className="foto">
      <h1 className="foto__title">Фотографии до и после ремонта</h1>
      <div className="images-gallery">
        {images.length > 0 ? images.map(image => (
          <div key={image._id} className="image-item">
            <img className="foto__img" src={image.filePath} alt={image.description || "Изображение"}
              onClick={() => handleImageClick(image)} />
            <p className="foto__description">{image.description}</p>
            <button className="foto__btn" onClick={() => toggleLikeImage(image._id)}>
              <img
                src={userLikes.includes(image._id) ? likeIconUrl : likeInactiveIconUrl}
                alt="Like"
                className={`like-icon ${userLikes.includes(image._id) ? 'liked' : ''}`}
              />
              <span className="foto__sum">
                {Array.isArray(image.likes) ? image.likes.length : 0}
              </span>
            </button>
          </div>
        ))
          : <p>Изображения загружаются...</p>}
        {showModal && <ImageModal image={selectedImage} onClose={handleCloseModal} />}
      </div>
    </div>
  )
}

export default ImageGalleryApi;