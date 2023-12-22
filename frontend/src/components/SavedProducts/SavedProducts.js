{/*import React, { useState, useEffect } from "react";
import ProductsList from "../ProductsList/ProductsList.js"
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm";

function savedProducts({ loggedIn, onDeleteCard, savedProducts }) {
  const [isShortProducts, setisShortProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(savedProducts);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (filteredProducts.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredProducts]);

  useEffect(() => {
    const ProductsFilmList = filterProducts(savedProducts, searchQuery);
    setFilteredProducts(
      isShortProducts ? counterDurationMovie(ProductsFilmList) : ProductsFilmList
    );
  }, [savedProducts, isShortProducts, searchQuery]);

  function searchProducts(query) {
    setSearchQuery(query);
  }

  function shortProductsToggle() {
    setisShortProducts(!isShortProducts);
  }

  return (
    <section className="Products">
      <Header loggedIn={loggedIn} />
      <SearchForm
        getSearchProducts={searchProducts}
        onFilterProducts={shortProductsToggle}
        isShortProducts={isShortProducts}
      />
      <ProductsList
        cards={filteredProducts}
        isSavedproduct={true}
        savedProducts={savedProducts}
        onDeleteCard={onDeleteCard}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  );
}

export default savedProducts;*/}