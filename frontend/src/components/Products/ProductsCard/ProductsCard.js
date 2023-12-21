{/*import React from "react";
import btnRemoveProduct from "../../../images/x.svg"



function ProductsCard({
    card,
    saved,
    savedProducts,
    isSavedProducts,
    getLikeProduct,
    onDeleteCard,
  }) {
    const onCardClick = () => {
      if (saved) {
        const productToDelete = savedProducts.find((m) => m.productId === card.id);
        onDeleteCard(productToDelete);
      } else {
        getLikeProduct(card);
      }
    };
  
    const onDelete = () => {
      onDeleteCard(card);
    };
  
    const productLikeBtnClassName = saved
      ? "card__like-button card__like-button_active"
      : "card__like-button";
  
    return (
      <li className="products__card" key={card.id}>
  
          <a href={card.trailerLink} target="_blank" rel="noreferrer">
            <img
              className="card__photo"
              alt={card.nameRU}
              src={
                isSavedProducts
                  ? card.image
                  : `https://optfm.ru/api/${card.image.url}`
              }
            />
          </a>
    
          <div className="card__about">
            <div className="card__text">
            <h2 className="card__title">{card.nameRU}</h2>
              {converterDurationProduct(card.duration)}
            {isSavedProducts ? (
            <button
              type="button"
              className="card__like-remove"
              onClick={onDelete}
            >
              <img
                className="card__like-remove"
                src={btnRemoveProduct}
                alt="крестик удаления карточки с фильмом"
              />
            </button>
          ) : (
            <button
              className={productLikeBtnClassName}
              onClick={onCardClick}
              type="button"
            ></button>
          )}
          </div>
          </div>
      </li>
    );
  }
  
export default ProductsCard;*/}