
import React, { useContext,useState } from 'react'
import { Link } from'react-router-dom'

import Item from '../Item/Item'
import './ShopCategory.css'
import { ShopContext } from '../Contexst/ShopContext'


const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [visibleCount, setVisibleCount] = useState(10); // Начинаем с 10 товаров
  const [searchTerm, setSearchTerm] = useState(""); // Строка поиска

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 20); // Увеличиваем количество на 20
  };

  // Фильтруем товары по категории и строке поиска, и отображаем только видимые
  const filteredProducts = all_product
    .filter(item => props.category === item.category && item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, visibleCount);

  return (
    <div className='shop-category'>
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <input className='shopcategory-input'
          type="text"
          placeholder="Поиск товаров..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
      {visibleCount < all_product.filter(item => props.category === item.category && item.name.toLowerCase().includes(searchTerm.toLowerCase())).length && (
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