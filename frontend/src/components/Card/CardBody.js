import React from "react";
import Card from "../Card/Card";
import "./CardBody.css";
import AddProducts from "../AddProducts/AddProducts";
import Search from "../Search/Search";
import Button from "../Button/Button";

const CardBody = ({
  items,
  value,
  changingSearchData,
  setShowAddProducts,
  showAddProducts,
  addedItems,
  removeItem,
  setAddedItem,
  itmesFilter,
  addItem,
  products,
}) => {
  return (
    <div className="card__body">
      {products && products.map((product) => (
        <Card
          key={product.id}
          product={product}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      ))}
      
      {showAddProducts && (
        <AddProducts
          click={setShowAddProducts}
          items={addedItems}
          removeItem={removeItem}
          setAddedItem={setAddedItem}
        />
      )}
    </div>
  );
};

export default CardBody;
