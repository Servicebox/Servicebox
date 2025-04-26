import React, { useContext, useState } from 'react'
import './ProductDisplay.css'

import { Link } from 'react-router-dom'

import { ShopContext } from '../Contexst/ShopContext'
const PLACEHOLDER = "data:image/svg+xml;utf8,<svg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect fill='%23F1F1F1' width='400' height='400'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='%23b3b3b3'>Нет фото</text></svg>";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (!product) return <div>Загрузка...</div>;

  // если нет фоток, то всегда используем placeholder
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ['/placeholder-image.jpg'];

  const handlePopupNavigation = (direction) => {
    setSelectedImage(prev => {
      if (direction === 'next') return (prev + 1) % images.length;
      return (prev - 1 + images.length) % images.length;
    });
  };
  const handleThumbnailClick = (idx) => setSelectedImage(idx);



  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Миниатюра ${i}`}
              onClick={() => handleThumbnailClick(i)}
              className={i === selectedImage ? 'selected-thumbnail' : ''}
              onError={e => e.target.src = PLACEHOLDER}
            />
          ))}
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={images[selectedImage]}
            onClick={() => setIsPopupOpen(true)}
            onError={e => e.target.src = PLACEHOLDER}
          />
        </div>
        {isPopupOpen && (
          <div className="image-popup-overlay">
            <div className="image-popup-content">
              <span className="close-popup" onClick={() => setIsPopupOpen(false)}>&times;</span>
              <img src={images[selectedImage]} alt={product.name} className="popup-main-image" />
              <div className="popup-navigation">
                <button onClick={() => handlePopupNavigation('prev')}>&lt;</button>
                <button onClick={() => handlePopupNavigation('next')}>&gt;</button>
              </div>
              <div className="popup-thumbnails">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Маленькая ${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={index === selectedImage ? 'active-popup-thumbnail' : ''}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">₽{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          <h1>Описание</h1>
          <p>{product.description}</p>
        </div>
        <div className="productdisplay-quantity">
          <p className="productdisplay-right-category">
            <span>На складе :</span> {product.quantity} шт
          </p>
        </div>
        <button className='btn-productdisplay' onClick={() => addToCart(product.id)}>В корзину</button>

        <p className="productdisplay-right-category"><span>Категория :</span> {product.category}</p>
        <div className="back__btn">
          <ul>
            <li><Link to="/">На главную</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;