import React, { useState, useEffect, useCallback } from "react";
import "./Card.css";

// import { AddRemoveBtn } from "../addremoveBtn/AddRemoveBtn";

const Card = ({
product,
addItem,
removeItem,
addedItems = [], // Устанавливаем пустой массив в качестве значения по умолчанию
text,
price
}) => {
const [isAdded, setIsAdded] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => {
setIsModalOpen(true);
}

const closeModal = () => {
setIsModalOpen(false);
}

const escFunction = useCallback((event) => {
if (event.keyCode === 27) {
closeModal();
}
}, []);

useEffect(() => {
const isItemAdded = addedItems.find((item) => item.id === product.id);
setIsAdded(isItemAdded ? true : false);
document.addEventListener("keydown", escFunction, false);

return () => {
document.removeEventListener("keydown", escFunction, false);
};
}, [addedItems, product, escFunction]);

return (
<div className="cardd">

<img
className="card__img-product"
src={product.picture}
alt=""
onClick={openModal}
/>
{isModalOpen && (
<div className="modal-overlay" onClick={closeModal}>
<div className="modal">
<img
className="modal__img"
src={product.picture}
alt=""
/>
<button className="close-modal" onClick={closeModal}>
×
</button>
</div>
</div>
)}
<div>
<h2 className="card__text">{product.name}</h2>
<p className="card-text">{product.detail_text}</p>
</div>
<div className="card-price-add">
<span>Цена : ₽{price}</span>
<button
  className={isAdded ? "remove-item-btn" : "add-item-btn"}
  onClick={() => {
    if (isAdded) {
      removeItem(product);
    } else {
      addItem(product);
    }
  }}
>
  {isAdded ? "Удалить" : "Добавить"}
</button>
</div>
</div>
);
};

export default Card;