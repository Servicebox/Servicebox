
import React, { useContext,useState } from 'react'
import { Link } from'react-router-dom'

import Item from '../Item/Item'
import './ShopCategory.css'
import { ShopContext } from '../Contexst/ShopContext'

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [visibleCount, setVisibleCount] = useState(10); // Начинаем с 20 товаров

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 20); // Увеличиваем количество на 20
  };

  // Фильтруем товары по категории и отображаем только видимые
  const filteredProducts = all_product.filter(item => props.category === item.category).slice(0, visibleCount);

  return (
    <div className='shop-category'>
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
      
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
      {visibleCount < all_product.filter(item => props.category === item.category).length && (
        <div className="shopcategory-loadmore" onClick={handleLoadMore}>
          Ещё
        </div>
      )}
      <div className="back__btn"> 
        <ul>
          <li><Link to="/">На главную</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default ShopCategory;