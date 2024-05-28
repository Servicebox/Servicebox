import React, { useState, useEffect } from "react";
import "./ImageGalleryApi.css";
import likeIconUrl from "../../../images/likeactive.png"; 
import likeInactiveIconUrl from "../../../images/like.png";
import ImageModal from "./ImageModal";

const getClientId = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; client-id=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const ImageGalleryApi = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const clientId = getClientId();

  // Fetch images from server
const fetchImages = async () => {
  try {
    console.log('Отправка запроса к серверу для получения изображений...');
    const token = localStorage.getItem('auth-token'); // Получить токен из localStorage
    
    if (!token) throw new Error('Token is missing');
    
    const response = await fetch('https://servicebox35.pp.ru/api/images', {
      headers: { 'auth-token': token },
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errResponse = await response.json();
      throw new Error(errResponse.errors || 'Error fetching images');
    }
    
    const fetchedImages = await response.json();
    const imagesWithCorrectPath = fetchedImages.map(img => ({
      ...img,
      filePath: `https://servicebox35.pp.ru/uploads/gallery/${img.filePath.split('/').pop()}`,
    }));
    setImages(imagesWithCorrectPath);
  } catch (error) {
    console.error('Ошибка при получении изображений:', error);
    alert('Error fetching images: ' + error.message);
  }
};

  // Initialize component
  useEffect(() => {
    fetchImages();
  }, [clientId]);

  // Handle like operation
  const toggleLikeImage = async (imageId, hasLiked) => {
    try {
      const token = localStorage.getItem('auth-token'); // Assuming token is stored in localStorage
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
        
        // Update likes status and local storage
        const newImages = images.map(img => 
          img._id === imageId ? { ...img, likes: updatedImage.likes, hasLiked: !hasLiked } : img
        );
        setImages(newImages);

        alert(hasLiked ? 'Лайк успешно удален!' : 'Лайк успешно поставлен!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error toggling like: ${error.message}`);
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

  return (
    <div className="foto">
      <h1 className="foto__title">Фотографии до и после ремонта</h1>
      <div className="images-gallery">
        {images.length > 0 ? images.map(image => (
          <div key={image._id} className="image-item">
            <img className="foto__img" src={image.filePath} alt={image.description || "Изображение"}
              onClick={() => handleImageClick(image)} />
            <p className="foto__description">{image.description}</p>
            <button className="foto__btn" onClick={() => toggleLikeImage(image._id, image.hasLiked)}>
              <img
                src={image.hasLiked ? likeIconUrl : likeInactiveIconUrl}
                alt="Like"
                className={`like-icon ${image.hasLiked ? 'liked' : ''}`}
              />
              <span className="foto__sum">{Array.isArray(image.likes) ? image.likes.length : 0}</span>
            </button>
          </div>
        )) : <p>Изображения не найдены.</p>}
      </div>
      {showModal && <ImageModal image={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default ImageGalleryApi;