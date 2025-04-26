import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import Item from '../Item/Item'
import './ShopCategory.css'
import { ShopContext } from '../Contexst/ShopContext'
import banner from '../../images/banner.webp'
const PLACEHOLDER = "data:image/svg+xml;utf8,<svg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect fill='%23F1F1F1' width='400' height='400'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='%23b3b3b3'>Нет фото</text></svg>";
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [visibleCount, setVisibleCount] = useState(12); // Начинаем с 10 товаров
  const [searchTerm, setSearchTerm] = useState(""); // Строка поиска

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 12); // Увеличиваем количество на 20
  };

  // Фильтруем товары по категории и строке поиска, и отображаем только видимые
  const filteredProducts = all_product
    .filter(item => props.category === item.category && item.quantity > 0 && item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, visibleCount);

  return (
    <div className='shop-category'>
      <img className="shopcategory-banner" src={banner} alt="" />
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
          <Item key={i} id={item.id} name={item.name} images={item.images} new_price={item.new_price} old_price={item.old_price} quantity={item.quantity} />
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