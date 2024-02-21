import React, { useState } from "react";
import Card from "../Card/Card";
import "./CardBody.css";

const CardBody = ({ category, products, addItem, removeItem, addedItems, subsectionName }) => {
return (
<div className="card__category">
<h2>{category}</h2>
<h3>{subsectionName}</h3>
<div className="card__grid">
{products.map((product) => (
<Card
key={product.id}
product={product}
addItem={addItem}
removeItem={removeItem}
addedItems={addedItems} // Убедитесь, что addedItems передаётся сюда
text={product.detail_text}
price={product.prices[1].price}
/>

))}
</div>
</div>
);
};

export default CardBody;