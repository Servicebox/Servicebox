import React, { useState, useEffect } from "react";
import "./ImageGalleryApi.css";
import likeIconUrl from "../../../images/likeactive.png"; 
import likeInactiveIconUrl from "../../../images/like.png";

const ImageGalleryApi = () => {
    const [images, setImages] = useState([]);
    const [likes, setLikes] = useState({});
    const clientId = getClientId();
    
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
            const imagesWithCorrectPath = fetchedImages.map((img) => {
                return {
                  ...img,
                  src: `/uploads/${img.filePath.split('/').pop()}`, // добавляем корректный относительный путь
                };
              });
            
              setImages(imagesWithCorrectPath);
        
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при получении списка изображений: ' + error.message);
        }
    };

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
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Указываем `include` для того, чтобы куки были отправлены с запросом
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                alert(`Ошибка: ${errorData.message}`);
            } else {
                // Получаем обновленные данные изображения
                const updatedImage = await response.json();
    
                // Обновляем локальный стейт images с новым количеством лайков
                setImages((prevImages) =>
                prevImages.map((img) =>
                    img._id === imageId ? { ...img, likes: updatedImage.likes } : img
                )
            );
    
                // Обновляем локальный стейт likes
                setLikes((prevLikes) => ({
                    ...prevLikes,
                    [imageId]: true
                }));
                
                // Обновление локального хранилища (если используется)
                localStorage.setItem('likes', JSON.stringify({ ...likes, [imageId]: true }));
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
            console.log(data.clientId); // Здесь у вас будет client-id, который можно сохранить в стейт или использовать как нужно
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
    useEffect(() => {
      fetchImages();
  }, []);

  return (
    <div>
        <h1 className="foto__title">Фотографии до и после ремонта</h1>
        <div className="images-gallery">
            {images.length > 0 ? images.map((image) => (
                <div key={image._id} className="image-item">
                    <img className="foto__img" src={image.src} alt={image.description || "Изображение"} />
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
    </div>
);
};

export default ImageGalleryApi;