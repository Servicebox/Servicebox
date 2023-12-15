import React, { useState, useEffect } from "react";
import "./Products.css";
import SearchForm from "../SearchForm/SearchForm";
import ProductsList from "../ProductsList/ProductsList.js";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { filterProducts, counterDurationProduct } from "../../utils/functionHelpers.js";
import * as products from "../utils/ProductsApi.js";

function Products({ loggedIn, savedProducts, getLikeProduct, onDeleteCard }) {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [initialCardsProducts, setInitialCardsProducts] = useState([]);
  const [isShortProducts, setisShortProducts] = useState(false);
  const [isReqError, setisReqError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  /** поиск продуктов */
  function searchProducts(query) {
    localStorage.setItem("productSearch", query);
    localStorage.setItem("shortProducts", isShortProducts);
    if (localStorage.getItem("allProducts")) {
      const Products = JSON.parse(localStorage.getItem("allProducts"));
      handleFilterProduct(Products, query, isShortProducts);
    } else {
      setIsLoading(true);
      products
        .getProducts()
        .then((cardsSavedFilms) => {
          handleFilterProduct(cardsSavedFilms, query, isShortProducts);
          setisReqError(false);
        })
        .catch((error) => {
          setisReqError(true);
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function shortProductsToggle() {
    setisShortProducts(!isShortProducts);
    if (!isShortProducts) {
      const filteredCardsProducts = counterDurationProduct(initialCardsProducts);
      setFilteredProducts(filteredCardsProducts);
    } else {
      setFilteredProducts(initialCardsProducts);
    }
    localStorage.setItem("shortProducts", !isShortProducts);
  }

  // Функция фильтрации продуктов
  function handleFilterProduct(products, query, short) {
    const productsFilmList = filterproducts(products, query);
    setInitialCardsProducts(prProductsFilmList);
    setFilteredProducts(
      short ? counterDurationProduct(productsFilmList) : productsFilmList
    );
    localStorage.setItem("products", JSON.stringify(productsFilmList));
    localStorage.setItem("allProducts", JSON.stringify(products));
  }

  // Получение продуктов из localStorage
  useEffect(() => {
    if (localStorage.getItem("products")) {
      const products = JSON.parse(localStorage.getItem("products"));
      setInitialCardsProducts(products);
      if (localStorage.getItem("shortProducts") === "true") {
        setFilteredProducts(counterDurationProduct(products));
      } else {
        setFilteredProducts(products);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("productSearch")) {
      setIsNotFound(filteredProducts.length === 0);
    } else {
      setIsNotFound(false);
    }
  }, [filteredProducts]);

  return (
    <section className="Poducts">
      <Header loggedIn={loggedIn} />
      <SearchForm
        isShortProducts={isShortProducts}
        onFilterProducts={shortProductsToggle}
        getSearchProducts={searchProducts} // Передаем функцию searchProducts в качестве пропса getSearchProducts
      />
      <ProductsCardList
        cards={filteredProducts}
        isLoading={isLoading}
        isSavedFilms={false}
        savedProducts={savedProducts}
        isReqError={isReqError}
        getLikeProduct={getLikeProduct}
        onDeleteCard={onDeleteCard}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  );
}

export default Products;