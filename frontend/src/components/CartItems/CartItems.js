import React, { useContext, useEffect, useState } from 'react';
import { Link } from'react-router-dom';
import './CartItems.css';
import { ShopContext } from '../Contexst/ShopContext'; 
import remove_icon from '../Assets/cart_cross_icon.png';
import TinkoffPayForm from '../TinkoffPayForm/TinkoffPayForm';




const CartItems = (props) => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, addToCart, quantity } = useContext(ShopContext);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('paymentSuccess') === 'true') {
      setIsPaid(true);
    }
  }, []);

  const receiptData = all_product.filter(product => cartItems[product.id] > 0)
    .map(product => ({
      name: product.name, 
      price: product.new_price,
      quantity: cartItems[product.id],
      quantity: product.quantity,
    }));

  if (isPaid) {
    return <DeliveryForm />;
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Товары</p>
        <p>Описание</p>
        <p>Цена</p>
        <p>Количество</p>
        <p>Всего</p>
        <p>Добавить</p>
        <p>Удалить</p>
      </div>
      <hr />
      {all_product.map((e, index) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={index}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="изо товара" className="cartitems-product-icon" />
                <p>{e.name}</p>
                <p>₽{e.new_price}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>₽{e.new_price * cartItems[e.id]}</p>
               <button onClick={() => addToCart(e.id)} disabled={cartItems[e.id] >= e.quantity}>+</button>
                <img className="cartitems-remove-icon" src={remove_icon} alt="" onClick={() => { removeFromCart(e.id) }} />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Количество</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Цена</p>
              <p>₽{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Ваша скидка</p>
              <p>Скидка</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Всего</h3>
              <h3>₽{getTotalCartAmount()}</h3>
            </div>
            <TinkoffPayForm amount={getTotalCartAmount()} receiptData={receiptData} onPaymentSuccess={() => setIsPaid(true)} />
          </div>
        </div>
  
      </div>
      <div className="back__btn"> 
        <ul>
          <li><Link to="/">На главную</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default CartItems;