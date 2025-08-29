import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Contexst/ShopContext';
import './ProductDisplay.css';

const PLACEHOLDER = "data:image/svg+xml;utf8,<svg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect fill='%23F1F1F1' width='400' height='400'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='%23b3b3b3'>Нет фото</text></svg>";

const ProductDisplay = ({ product }) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(1);

  if (!product) return <div className="loading">Загрузка товара...</div>;

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [PLACEHOLDER];

  const availableStock = product.quantity || 0;
  const inCart = cartItems[product.slug] || 0;
  const canAddToCart = availableStock > inCart;

  const handleAddToCart = () => {
    if (canAddToCart) {
      addToCart(product.slug);
    }
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Миниатюра ${i + 1}`}
              onClick={() => setSelectedImage(i)}
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
            alt={product.name}
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">{product.new_price}₽</div>
        
        </div>

        <div className="productdisplay-right-description">
          <h2>Описание</h2>
          <p>{product.description}</p>
        </div>

        <div className="productdisplay-quantity-info">
          <p>На складе: <strong>{availableStock} шт.</strong></p>
          {inCart > 0 && <p>В вашей корзине: {inCart} шт.</p>}
        </div>

        <button 
          className={`btn-productdisplay ${!canAddToCart ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={!canAddToCart}
        >
          {canAddToCart ? 'В корзину' : 'Нет в наличии'}
        </button>

        <div className="productdisplay-meta">
          <p><span>Категория:</span> {product.category}</p>
          {product.subcategory && (
            <p><span>Подкатегория:</span> {product.subcategory}</p>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <div className="image-popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="image-popup-content" onClick={e => e.stopPropagation()}>
            <span className="close-popup" onClick={() => setIsPopupOpen(false)}>×</span>
            <img src={images[selectedImage]} alt={product.name} className="popup-main-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;