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

 console.log('Product data:', product);

 return (
 <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={product.image} alt={product.name} />
          ))}
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
          <h1>Описание</h1>
          <p>{product.description}</p>
        </div>
      <div className="productdisplay-quantity">
  <p className="productdisplay-right-category">
    <span>Остаток :</span> {product.quantity}
  </p>
</div>
        <button onClick={() => addToCart(product.id)}>в корзину</button>
        <p className="productdisplay-right-category"><span>Категория :</span> {product.category}</p>
        <div className="back__btn"> 
          <ul>
            <li><Link to="/">На главную</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;