import { BrowserRouter as Router, Switch, Route, useParams, Link, Routes } from 'react-router-dom';

import React, { useEffect, useState } from "react";
import Search from "./SearchProducts/SearchProducts";
import AddProducts from "./AddProducts/AddProducts";
import CardBody from "./Card/CardBody";
import Button from "./Button/Button";
import CategoryButton from "./CategoryButton/CategoryButton";


import SearchProducts from "./SearchProducts/SearchProducts";

 
import "./Api.css"; 

import axios from 'axios';


const Api = () => {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [categoryTree, setCategoryTree] = useState([]);
  const [categories, setCategories] = useState({});
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentSubsection, setCurrentSubsection] = useState(null);
  
  const [value, setValue] = useState("");
  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const url = 'http://localhost:8000/products/';

  useEffect(() => {
    axios.get(url)
      .then(response => {
        const baseImageUrl = 'https://optfm.ru';
        const newItems = response.data.response.items.map(item => ({
          ...item,
          picture: baseImageUrl + item.picture
        }));
        setItems(newItems);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  
  function changingSearchData(e) {
    setSearchValue(e.target.value);
  }
  const itemsFilter = items.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    item.price = item.prices[1].price; // Добавление цены товара
    const itemArr = addedItems;
    setAddedItems([...itemArr, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItems(newItems);
  }

  return (
    <div className="body__container">
      <div className="navigation__api">
        <div className="nav-right">
          <Search
            products={items}
            value={value}
            onChange={changingSearchData}
          />
          <Button num={addedItems.length} click={setShowAddProducts} />
        </div>
      </div>

      {showAddProducts && (
        <AddProducts
          click={setShowAddProducts}
          items={addedItems}
          removeItem={removeItem}
          setAddedItems={setAddedItems}
        />
      )}
      <CardBody
        products={itemsFilter}
        addItem={addItem}
        removeItem={removeItem}
        addedItems={addedItems}
      />
    </div>
  );
};

export default Api;