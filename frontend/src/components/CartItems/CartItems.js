import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CartItems.css';
import { ShopContext } from '../Contexst/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import TinkoffPayForm from '../TinkoffPayForm/TinkoffPayForm';

const CartItems = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    purchaseItems,
  } = useContext(ShopContext);

  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('paymentSuccess') === 'true') {
      setIsPaid(true);
    }
  }, []);

  // Функция для проверки можно ли добавить товар
  const canAddMore = (product) => {
    const availableStock = product.quantity || 0;
    const inCart = cartItems[product.slug] || 0;
    return availableStock > inCart;
  };

  const receiptData = all_product.filter(product => cartItems[product.slug] > 0)
    .map(product => ({
      name: product.name,
      price: product.new_price,
      quantity: cartItems[product.slug],
      Description: product.description,
    }));

  if (isPaid) {
    return <DeliveryForm />;
  }

  // Только товары с количеством > 0
  const visibleCartRows = all_product
    .filter(e => cartItems[e.slug] > 0 && e.quantity > 0);

  return (
    <div className="cartitems">
      <div className="cartitems-header">
        <div className="cart-col cart-col-img">Товар</div>
        <div className="cart-col cart-col-name">Описание</div>
        <div className="cart-col cart-col-price">Цена</div>
        <div className="cart-col cart-col-controls">Кол-во</div>
        <div className="cart-col cart-col-total">Всего</div>
        <div className="cart-col cart-col-remove">Удалить</div>
      </div>
      <hr />
      {
        visibleCartRows.length === 0
          ? <div style={{ padding: 16 }}>Корзина пуста</div>
          : visibleCartRows.map((e) => {
              const availableStock = e.quantity || 0;
              const inCart = cartItems[e.slug] || 0;
              
              return (
                <div className="cartitems-row" key={e.slug}>
                  <div className="cart-col cart-col-img">
                    <img 
                      src={e.images && e.images.length > 0 ? e.images[0] : '/placeholder-image.jpg'} 
                      alt={e.name} 
                      className="cartitems-product-icon" 
                    />
                  </div>
                  <div className="cart-col cart-col-name">
                    <div>{e.name}</div>
                    <div className="stock-info">
                      На складе: {availableStock} шт.
                    </div>
                  </div>
                  <div className="cart-col cart-col-price">₽{e.new_price}</div>
                  <div className="cart-col cart-col-controls">
                    <button
                      className="cartitems-ctrl-btn"
                      onClick={() => removeFromCart(e.slug)}
                      disabled={cartItems[e.slug] <= 1}
                    >-</button>
                    <span className="cartitems-product-amount">{cartItems[e.slug]}</span>
                    <button
                      className="cartitems-ctrl-btn"
                      onClick={() => addToCart(e.slug)}
                      disabled={!canAddMore(e)}
                      title={!canAddMore(e) ? 'Нельзя добавить больше товара' : ''}
                    >+</button>
                  </div>
                  <div className="cart-col cart-col-total">₽{e.new_price * cartItems[e.slug]}</div>
                  <div className="cart-col cart-col-remove">
                    <img
                      className="cartitems-remove-icon"
                      src={remove_icon}
                      alt="Удалить товар"
                      title="Удалить весь товар из корзины"
                      onClick={() => {
                        // Удаляем все количество этого товара из корзины
                        for (let i = 0; i < cartItems[e.slug]; i++) {
                          removeFromCart(e.slug);
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
              );
            })
      }

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Итого</h1>
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
            <TinkoffPayForm
              amount={getTotalCartAmount()}
              receiptData={receiptData}
              onPaymentSuccess={() => {
                setIsPaid(true);
                purchaseItems(receiptData);
              }}
            />
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