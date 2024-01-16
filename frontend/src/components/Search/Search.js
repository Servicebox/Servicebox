import React from "react";
import "./Search.css";
//import { FaSearch } from 'react-icons/fa';


const Search = ({ value, onChange, placeholder }) => {
  return (
    <div className="search">
      <i className="fa fa-search search__icon"></i>
      <input
        className="search__input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;