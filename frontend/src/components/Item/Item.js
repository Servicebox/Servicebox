
import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Item.css'
const PLACEHOLDER = "data:image/svg+xml;utf8,<svg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect fill='%23F1F1F1' width='400' height='400'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='%23b3b3b3'>Нет фото</text></svg>";
const Item = (props) => {
  const mainImage = props.images && props.images.length > 0
    ? props.images[0]
    : 'https://placehold.co/400x400?text=No+Photo';

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img
          onClick={() => window.scrollTo(0, 0)}
          src={mainImage}
          alt={props.name}
          style={{ objectFit: 'contain', width: "200px", height: "200px", background: '#f6f6f7', borderRadius: "8px" }}
          onError={e => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
        />
      </Link>
      <p className='item-title'>{props.name}</p>
      <div className='item-prices'>
        <div className='item-price-new'>₽{props.new_price}</div>
        {props.old_price > 0 && <div className='item-price-old'>₽{props.old_price}</div>}
        <div className='item-price-col'>Остаток: {props.quantity}</div>
      </div>
    </div>
  );
};
export default Item
