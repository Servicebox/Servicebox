import React from 'react';
import "./ImageGallery.css";



import Love from "../../images/like.png";
import Like from "../../images/likeactive.png"

const ImageGallery = () => {

return (
  <div className="gallery-container">
  <h2 className="gallery-title"> Фотографии после ремонтов и до ремонтов </h2>
  <div>
  <form id="imageUploadForm">
          <input type="file" id="imageInput" accept="image/*" />
          <input type="text" id="descriptionInput" placeholder="Введите описание..." />
          <button type="submit">Отправить</button>
        </form>
   </div>
  </div>
  );
};


export default ImageGallery;