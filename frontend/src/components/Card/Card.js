import React, { useEffect } from "react";
import "./Card.css";
// import { AddRemoveBtn } from "../addremoveBtn/AddRemoveBtn";
import { useState } from "react";
const Card = ({ product, addItem, removeItem, addedItems }) => {
  const [isAdded, setIsAdded] = useState(true);
  const item = addedItems.filter((addedItem) => addedItem.id == product.id);
  useEffect(() => {
    // Доступ к новым данным объекта product
    const item = addedItems.filter((addedItem) => addedItem.id === product.id);
    item.length === 0 ? setIsAdded(true) : setIsAdded(false);
  }, [addedItems, product]);

  return (
    <div className="cardd">
      <img className="card__img" src={product.image} alt="" />
      <div>
        {/* Использование новых ключей для получения данных */}
        <h2>{product.name}</h2>
        <h4>{product.title}</h4>
        <p>{product.description}</p>
      </div>
      <div className="card-price-add">
        <span>Цена : ₽{product.price}</span>
        <button
          className={isAdded ? "add-item-btn" : "remove-item-btn"}
          onClick={() => {
            isAdded ? addItem(product) : removeItem(product);
            setIsAdded(!isAdded);
          }}
        >
          {isAdded ? "Добавить " : "Удалить"}
        </button>
      </div>
    </div>
  );
};

export default Card;
