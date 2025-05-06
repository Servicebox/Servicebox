
import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Item.css'
const PLACEHOLDER = "data:image/svg+xml;utf8,<svg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect fill='%23F1F1F1' width='400' height='400'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='%23b3b3b3'>Нет фото</text></svg>";


const Item = ({ id, name, images, new_price, old_price, description, quantity, category, subcategory }) => {
  const mainImage = images && images.length > 0
    ? images[0]
    : PLACEHOLDER;

  const hasDiscount = old_price > 0 && new_price < old_price;
  const discount = hasDiscount ? Math.round((1 - new_price / old_price) * 100) : 0;

  return (
    <div className='item'>
      <div className="item-img-box">
        {hasDiscount && <span className="item-badge">-{discount}%</span>}
        <Link to={`/product/${id}`}>
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={mainImage}
            alt={name}
            onError={e => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
            loading="lazy"
          />
        </Link>
      </div>
      <div className='item-title'>{name}</div>
      <div className='item-prices'>
        <div className="shopitem-prices">{new_price ? `₽${new_price}` : ''}</div>
        <div className="shopitem-tags">{category}{subcategory ? ' / ' + subcategory : ''}</div>
        {hasDiscount && <div className='item-price-old'>₽{old_price}</div>}


        <div className='item-price-col'>Ост: {quantity}</div>
      </div>
    </div>
  );
};

export default Item;