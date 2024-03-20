import React, { useState, useEffect } from "react";
import "./ImageGalleryApi.css";
import likeIconUrl from "../../../images/likeactive.png"; 
import likeInactiveIconUrl from "../../../images/like.png";

const ImageGalleryApi = () => {
    const [images, setImages] = useState([]);
    const [likes, setLikes] = useState({});
    
    // Функция для загрузки списка изображений 
    const fetchImages = async () => {
        try {
            const response = await fetch('https://servicebox35.pp.ru/api/images');
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Произошла ошибка при загрузке изображений');
            }
            const fetchedImages = await response.json();
            setImages(fetchedImages); // Сохраняем изображения в стейт
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при получении списка изображений: ' + error.message);
        }
    };

      // Функции для лайка изображения
      const likeImage = async (id) => {
        // ... код для обновления лайков на сервере
    
        setLikes((prevLikes) => {
            const newLikes = { ...prevLikes, [id]: true };
            localStorage.setItem('likes', JSON.stringify(newLikes)); // Обновляем localStorage
            return newLikes;
        });
    
        const index = images.findIndex((image) => image._id === id);
        if (index !== -1) {
            let newImages = [...images];
            let newLikesCount = 1;
    
            if (typeof newImages[index].likes === 'number') {
                newLikesCount = newImages[index].likes + 1;
                newImages[index].likes += 1;
            } else {
                newImages[index].likes = newLikesCount;
            }
    
            setImages(newImages);
    
            // Храним количество лайков для каждого изображения
            const imageLikes = JSON.parse(localStorage.getItem('imageLikes')) || {};
            imageLikes[id] = newLikesCount;
            localStorage.setItem('imageLikes', JSON.stringify(imageLikes));
        }
    };

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
    useEffect(() => {
      fetchImages();
  }, []);

  return (
    <div>
        <h1 className="foto__title">Фотографии до и после ремонта</h1>
        <div>
            {images.length > 0 ? (
                <div className="images-gallery">
                   {images.map((image) => (
                       <div key={image._id} className="image-item">
                           <img className="foto__img" src={image.src} alt={image.description || "Изображение"} />
                           <p className="foto__description">{image.description}</p>
                           <button className="foto__btn" onClick={() => likeImage(image._id)}>
    <img 
        src={likes[image._id] ? likeIconUrl : likeInactiveIconUrl} // Используйте переменные, а не относительные пути
        alt="Like"
        className={`like-icon ${likes[image._id] ? 'liked' : ''}`}
    />
    <span className="foto__sum" >{image.likes}</span>
</button>
                       </div>
                   ))}
                </div>
            ) : (
                <p>Изображения не найдены.</p>
            )}
        </div>
    </div>
  );
};

export default ImageGalleryApi;