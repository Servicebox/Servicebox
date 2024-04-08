import React, { useState, useEffect } from "react";
import "./ImageGalleryApi.css";
import likeIconUrl from "../../../images/likeactive.png"; 
import likeInactiveIconUrl from "../../../images/like.png";
import ImageModal from "./ImageModal";

const ImageGalleryApi = () => {
    const [images, setImages] = useState([]);
    const [likes, setLikes] = useState({});
    const clientId = getClientId();
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setSelectedImage(null);
        setShowModal(false);
      };
// Функция для загрузки списка изображений 
const fetchImages = async () => {
    try {
      const response = await fetch('https://servicebox35.pp.ru/api/images', {
        credentials: 'include'
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Произошла ошибка при загрузке изображений');
      }
      const fetchedImages = await response.json();

      const imagesWithCorrectPath = fetchedImages.map(img => ({
        ...img,
        filePath: `/uploads/${img.filePath.split('/').pop()}` // Путь до изображений для клиента
      }));
      
      setImages(imagesWithCorrectPath);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при получении списка изображений: ' + error.message);
    }
  };
  
  useEffect(() => {
    fetchImages();
  }, []);

      // Функции для лайка изображения
    
      function getClientId() {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; client-id=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    
    const likeImage = async (imageId) => {
        try {
          const response = await fetch(`https://servicebox35.pp.ru/api/images/like/${imageId}`, {
            method: 'POST',
            credentials: 'include', // include для отправки куки
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            alert(`Ошибка: ${errorData.message}`);
          } else {
            const updatedImage = await response.json();
      
            setImages((prevImages) =>
              prevImages.map((img) =>
                img._id === imageId ? { ...img, likes: updatedImage.likes } : img
              )
            );
      
            // Функция для проверки, был ли уже поставлен лайк
            if (updatedImage.likes.includes(getClientId())) {
              alert("Лайк уже поставлен");
            } else {
              alert("Лайк поставлен");
            }
      
            // состояние prevLikes
             setLikes((prevLikes) => ({
               ...prevLikes,
               [imageId]: !prevLikes[imageId]
             }));
      
            // Сохранение лайков в localStorage
             localStorage.setItem('likes', JSON.stringify({ ...likes, [imageId]: !prevLikes[imageId] }));
          }
        } catch (error) {
          alert(`Ошибка при попытке лайкнуть изображение: ${error.message}`);
        }
      };

    useEffect(() => {
        const fetchClientId = async () => {
            const response = await fetch('https://servicebox35.pp.ru/get-client-id', {
                credentials: 'include' // включить куки в запрос
            });
            const data = await response.json();
            console.log(data.clientId); // Здесь  будет client-id, который можно сохранить в стейт или использовать как нужно
        };
    
        fetchClientId();
    }, []);    

    useEffect(() => {
      // Загрузите состояние лайков из localStorage
      const savedLikes = JSON.parse(localStorage.getItem('likes')) || {};
      setLikes(savedLikes);
  
      const fetchImagesAndUpdateLikes = async () => {
          await fetchImages();
          updateLikesFromStorage();
      };
  
      fetchImagesAndUpdateLikes();
  }, []);
  
  // Вспомогательная функция для обновления изображений с количеством лайков
  const updateLikesFromStorage = () => {
      setImages((currentImages) => {
         return currentImages.map((image) => {
    const likesFromStorage = JSON.parse(localStorage.getItem('imageLikes')) || {};
    if (likesFromStorage[image._id]) {
        image.likes = likesFromStorage[image._id];
    }
    return image;
});
      });
  };


  return (
    <div className="foto">
        <h1 className="foto__title">Фотографии до и после ремонта</h1>
        <div className="images-gallery">
            {images.length > 0 ? images.map((image) => (
                <div key={image._id} className="image-item">
                  <img className="foto__img" src={`https://servicebox35.pp.ru${image.filePath}`} alt={image.description || "Изображение"} 
                  onClick={() => handleImageClick(image)}
                  />
                    <p className="foto__description">{image.description}</p>
                    <button className="foto__btn" onClick={() => likeImage(image._id)}>
                        <img 
                            src={likes[image._id] ? likeIconUrl : likeInactiveIconUrl} 
                            alt="Like"
                            className={`like-icon ${likes[image._id] ? 'liked' : ''}`}
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