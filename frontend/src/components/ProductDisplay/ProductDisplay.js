import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Contexst/ShopContext';
import './ProductDisplay.css';

const PLACEHOLDER = "data:image/svg+xml;utf8,<svg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect fill='%23F1F1F1' width='400' height='400'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='%23b3b3b3'>Нет фото</text></svg>";

const ProductDisplay = ({ product }) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (!product) return <div className="loading">Загрузка товара...</div>;

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [PLACEHOLDER];

  const availableStock = product.quantity || 0;
  const inCart = cartItems[product.slug] || 0;
  const canAddToCart = availableStock > inCart;
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": images,
    "description": product.description,
    "sku": product.slug,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "RUB",
      "price": product.new_price,
      "availability": availableStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "inventoryLevel": {
        "@type": "QuantitativeValue",
        "value": availableStock
      }
    },
    "category": product.category
  };

  const handleAddToCart = () => {
    if (canAddToCart) {
      addToCart(product.slug);
    }
  };

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />

      <article className="product-display" itemScope itemType="https://schema.org/Product">
        <div className="product-display__gallery">
          <div className="product-display__thumbnails">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`product-display__thumbnail-btn ${i === selectedImage ? 'product-display__thumbnail-btn--active' : ''}`}
                aria-label={`Просмотреть изображение ${i + 1}`}
              >
                <img
                  src={img}
                  alt={`Миниатюра товара ${product.name} - изображение ${i + 1}`}
                  className="product-display__thumbnail-img"
                  width="100"
                  height="150"
                  loading={i === 0 ? "eager" : "lazy"}
                  onError={e => e.target.src = PLACEHOLDER}
                />
              </button>
            ))}
          </div>
          
          <div className="product-display__main-image-container">
            <img
              className="product-display__main-image"
              src={images[selectedImage]}
              onClick={() => setIsPopupOpen(true)}
              onError={e => e.target.src = PLACEHOLDER}
              alt={`Основное изображение товара ${product.name}`}
              itemProp="image"
              width="400"
              height="500"
              loading="eager"
            />
            <button 
              className="product-display__zoom-btn"
              onClick={() => setIsPopupOpen(true)}
              aria-label="Увеличить изображение"
            >
              🔍
            </button>
          </div>
        </div>

        <div className="product-display__info">
          <header className="product-display__header">
            <h1 className="product-display__title" itemProp="name">
              {product.name}
            </h1>
            
            <div className="product-display__pricing" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <meta itemProp="priceCurrency" content="RUB" />
              <meta itemProp="price" content={product.new_price} />
              <meta itemProp="availability" content={availableStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
              
              <div className="product-display__price product-display__price--current">
                <span className="product-display__price-label">Цена:</span>
                <span className="product-display__price-value" itemProp="price">
                  {product.new_price} ₽
                </span>
              </div>
            </div>
          </header>

          <section className="product-display__description">
            <h2 className="product-display__section-title">Описание товара</h2>
            <div 
              className="product-display__description-text" 
              itemProp="description"
              dangerouslySetInnerHTML={{ __html: product.description || 'Описание отсутствует' }}
            />
          </section>

          <section className="product-display__details">
            <h2 className="product-display__section-title">Детали товара</h2>
            
            <div className="product-display__stock-info">
              <p className="product-display__stock-item">
                <span className="product-display__stock-label">В наличии:</span>
                <span className="product-display__stock-value">{availableStock} шт.</span>
              </p>
              {inCart > 0 && (
                <p className="product-display__stock-item">
                  <span className="product-display__stock-label">В корзине:</span>
                  <span className="product-display__stock-value">{inCart} шт.</span>
                </p>
              )}
            </div>

            <div className="product-display__categories">
              <p className="product-display__category-item">
                <span className="product-display__category-label">Категория:</span>
                <span className="product-display__category-value" itemProp="category">
                  {product.category}
                </span>
              </p>
              {product.subcategory && (
                <p className="product-display__category-item">
                  <span className="product-display__category-label">Подкатегория:</span>
                  <span className="product-display__category-value">
                    {product.subcategory}
                  </span>
                </p>
              )}
            </div>
          </section>

          <div className="product-display__actions">
            <button 
              className={`btn btn--primary btn--large ${!canAddToCart ? 'btn--disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              itemProp="availability"
              itemScope
              itemType="https://schema.org/ItemAvailability"
            >
              {canAddToCart ? 'Добавить в корзину' : 'Нет в наличии'}
            </button>
          </div>
        </div>
        {isPopupOpen && (
          <div 
            className="modal-overlay" 
            onClick={() => setIsPopupOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Увеличенное изображение товара"
          >
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button 
                className="modal-close"
                onClick={() => setIsPopupOpen(false)}
                aria-label="Закрыть"
              >
                ×
              </button>
              <img 
                src={images[selectedImage]} 
                alt={`Увеличенное изображение товара ${product.name}`}
                className="modal-image"
                onError={e => e.target.src = PLACEHOLDER}
              />
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default ProductDisplay;