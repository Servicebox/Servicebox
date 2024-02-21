import React from "react";
import "./SearchProducts.css";

const SearchProducts = ({ value, onChangeData }) => {
  return (
    <div>
      <input
        className="search__input"
        type="text"
        placeholder="поиск товара"
        value={value}
        onChange={onChangeData}
      />
    </div>
  );
};

export default SearchProducts;
