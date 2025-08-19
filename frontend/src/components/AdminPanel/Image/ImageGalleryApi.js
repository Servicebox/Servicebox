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
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('https://servicebox35.pp.ru/api/gallery/group');
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        console.error('Ошибка загрузки групп:', error);
      }
    };
    fetchGroups();
  }, []);

  const handleGroupClick = (group, index) => {
    setSelectedGroup(group);
    setCurrentImageIndex(index);
  };

  const handleNavigation = (direction) => {
    setCurrentImageIndex(prev => {
      const newIndex = direction === 'next' ? prev + 1 : prev - 1;
      return Math.max(0, Math.min(newIndex, selectedGroup.images.length - 1));
    });
  };

  useEffect(() => {
    setImages();
    fetchUserLikes();
  }, []);



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

      <h2 className="animated-title ">Фотографии до и после ремонта</h2>
      <div className="group-grid">
        {groups.map(group => (
          <div key={group._id} className="group-card">
            <div className="group-preview">
              {group.images.slice(0, 4).map((img, index) => (
                <img
  key={img._id}
  src={`https://servicebox35.pp.ru${img.filePath}`}
  alt={group.description}
  onClick={() => handleGroupClick(group, index)}
/>
              ))}
              {group.images.length > 4 && (
                <div className="more-images">+{group.images.length - 4}</div>
              )}
            </div>
            <p className="group-description">{group.description}</p>
          </div>
        ))}
      </div>

      {selectedGroup && (
        <ImageModal
          group={selectedGroup}
          currentIndex={currentImageIndex}
          onClose={() => setSelectedGroup(null)}
          onNavigate={handleNavigation}
        />
      )}
    </div>
  );
};

export default ImageGalleryApi;