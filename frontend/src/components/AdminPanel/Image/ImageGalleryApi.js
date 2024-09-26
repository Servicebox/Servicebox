// ImageGalleryApi.js
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

  const fetchImages = async () => {
    try {
      console.log('Отправка запроса к серверу для получения изображений...');
      const response = await fetch('https://servicebox35.pp.ru/api/images', {
        credentials: 'include',
      });

      if (!response.ok) {
        const errResponse = await response.json();
        throw new Error(errResponse.errors || 'Ошибка при получении изображений');
      }

      const fetchedImages = await response.json();
      const imagesWithCorrectPath = fetchedImages.map(img => ({
        ...img,
        filePath: `https://servicebox35.pp.ru/uploads/gallery/${img.filePath.split('/').pop()}`,
        beforeImage: img.beforeImage ? `https://servicebox35.pp.ru/uploads/gallery/${img.beforeImage.split('/').pop()}` : null,
        afterImage: img.afterImage ? `https://servicebox35.pp.ru/uploads/gallery/${img.afterImage.split('/').pop()}` : null,
      }));
      setImages(imagesWithCorrectPath);
      
      // Initialize showAfter state
      const initialShowAfter = {};
      imagesWithCorrectPath.forEach(img => {
        initialShowAfter[img._id] = false;
      });
      setShowAfter(initialShowAfter);
    } catch (error) {
      console.error('Ошибка при получении изображений:', error);
      alert('Ошибка загрузки изображений: ' + error.message);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchUserLikes();
  }, []);



const fetchUserLikes = async () => {
  try {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    const response = await fetch('https://servicebox35.pp.ru/api/images/user-likes', {
      headers: {
        'auth-token': token
      },
      credentials: 'include'
    });

    if (response.ok) {
      const likes = await response.json();
      setUserLikes(likes);
    }
  } catch (error) {
    console.error('Error fetching user likes:', error);
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
    const response = await fetch(`https://servicebox35.pp.ru/api/images/like/${imageId}`, {
      method,
      headers: {
        'Accept': 'application/json',
        'auth-token': token,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (response.ok) {
      const updatedImage = await response.json();
      setImages(images.map(img => 
        img._id === imageId ? { ...img, likes: updatedImage.likes } : img
      ));
      
      if (hasLiked) {
        setUserLikes(userLikes.filter(id => id !== imageId));
      } else {
        setUserLikes([...userLikes, imageId]);
      }

      alert(hasLiked ? 'Лайк успешно удален!' : 'Лайк успешно поставлен!');
    } else {
      const errorData = await response.json();
      alert(`Ошибка: ${errorData.message}`);
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
        {images.map((image) => (
          <div key={image._id} className="image-item">
            <div className="image-container">
              {image.beforeImage && image.afterImage ? (
                <>
                  <img
                    className="foto__img"
                    src={showAfter[image._id] ? image.afterImage : image.beforeImage}
                    alt={showAfter[image._id] ? "После" : "До"}
                    onClick={() => handleImageClick(image)}
                  />
                  <button onClick={() => toggleBeforeAfter(image._id)}>
                    {showAfter[image._id] ? "Показать ДО" : "Показать ПОСЛЕ"}
                  </button>
                </>
              ) : (
                <img
                  className="foto__img"
                  src={image.filePath}
                  alt={image.description}
                  onClick={() => handleImageClick(image)}
                />
              )}
            </div>
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
        ))}
      </div>
      {showModal && <ImageModal image={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default ImageGalleryApi;