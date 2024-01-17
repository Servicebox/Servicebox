import React, { useEffect, useState } from "react";
import Search from "./Search/Search";
import AddProducts from "./AddProducts/AddProducts";
import CardBody from "./Card/CardBody";
import Button from "./Button/Button";
import "./Api.css";

import axios from 'axios';


const Api = () => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const url = "http://localhost:8000/api";

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  function changingSearchData(e) {
    setValue(e.target.value);
  }

  const itemsFilter = items.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    setAddedItems([...addedItems, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItems(newItems);
  }

  return (
    <div className="body__container">
      <div className="navigation">
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
          setAddedItem={setAddedItems}
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