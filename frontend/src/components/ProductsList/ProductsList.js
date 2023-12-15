import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductsCard from "../ProductsCard/ProductsCard";
import SearchError from "../../SearchError/SearchError";
import {
  DESKTOP_PRODUCT_COUNT,
  TABLET_PRODUCT_COUNT,
  MOBILE_PRODUCT_COUNT,
} from "../../../utils/constants";
import Preloader from "../Preloader/Preloader";
import "./ProductsCardList.css";

function ProductsCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedProducts,
  isReqError,
  isNotFound,
  getLikeProduct,
  onDeleteCard,
}) {
  const { pathname } = useLocation();
  const [shownProducts, setShownProducts] = useState(0);

  function showProductsDisplay() {
    const display = window.innerWidth;
    if (display > 1023) {
      setShownProducts(12);
    } else if (display > 767) {
      setShownProducts(8);
    } else {
      setShownProducts(5);
    }
  }

  useEffect(() => {
    showProductsDisplay();
  }, [cards]);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", showProductsDisplay);
    }, 500);
  }, []);

  function getShowCountProducts() {
    const display = window.innerWidth;
    if (display > 1023) {
      setShownProducts(shownProducts + DESKTOP_PRODUCT_COUNT);
    } else if (display > 767) {
      setShownProducts(shownProducts + TABLET_PRODUCT_COUNT);
    } else {
      setShownProducts(shownProducts + MOBILE_PRODUCT_COUNT);
    }
  }

  function getSavedProductFromList(savedProducts, card) {
    return savedProducts.find((savedProduct) => savedProduct.productId === card.id);
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"По данному запросу ни чего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка.Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          <ul className="products__list">
            {pathname === "/saved-products"
              ? cards.map((card) => (
                  <ProductsCard
                    key={isSavedFilms ? card._id : card.id}
                    card={card}
                    cards={cards}
                    saved={getSavedProductFromList(savedProducts, card)}
                    getLikeProduct={getLikeProduct}
                    onDeleteCard={onDeleteCard}
                    isSavedFilms={isSavedFilms}
                    savedProducts={savedProducts}
                  />
                ))
              : cards.slice(0, shownProducts).map((card) => (
                  <ProductsCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSavedProductFromList(savedProducts, card)}
                    cards={cards}
                    card={card}
                    getLikeProduct={getLikeProduct}
                    onDeleteCard={onDeleteCard}
                    isSavedFilms={isSavedFilms}
                    savedProducts={savedProducts}
                  />
                ))}
          </ul>
          <div className="cards__button-container">
            {cards.length > shownProducts && (
              <button onClick={getShowCountProducts} className="cards__button">
                Ещё
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default ProductsCardList;