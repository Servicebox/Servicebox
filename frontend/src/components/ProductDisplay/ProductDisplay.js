import React, {useContext, useState}from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../Contexst/ShopContext'
import { Link } from 'react-router-dom';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  if (!product) {
    return <div>Loading product information...</div>;
  }

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt={product.name} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-prices">

          <div className="productdisplay-right-price-new">₽{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          <h1>Product Description</h1>
          <p>{product.description}</p>
        </div>
        <button onClick={() => addToCart(product.id)}>в корзину</button>
        <p className="productdisplay-right-category"><span>Category :</span>part</p>
      </div>
           <div className="back__btn"> 
      <ul>
      <li><Link to="/shop">На главную</Link>
      </li>
      </ul>
      </div>
    </div>
  );
}

export default ProductDisplay;