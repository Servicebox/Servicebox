import React from 'react'
import { Link } from 'react-router-dom';
import './Breadcrum.css'
import arrow_icon from "../Assets/breadcrum_arrow.png"


const getCategoryUrl = (category) => {
  switch (category) {
    case 'для СЦ':
      return '/parts';
    case 'electronic':
      return '/electronics';
    case 'usedsparepart':
      return '/usedspareparts';
    default:
      return '/parts';
  }
};


const BreadCrum = (props) => {
  const { product } = props;

  // Проверка на наличие продукта, его категории и имени
  if (!product || !product.category || !product.name) {
    return <div>Загрузка информации...</div>;
  }

  return (
    <div className="breadcrum">
      <Link to="/" className="breadcrum-link">Домашняя</Link>
      <img className='breadcrum-img' src={arrow_icon} alt="стрелочка" />
      <a href="https://servicebox35.ru/parts" className="breadcrum-link">Каталог</a>
      <img className='breadcrum-img' src={arrow_icon} alt="стрелочка" />
      <Link to={getCategoryUrl(product.category)} className="breadcrum-link">{product.category}</Link>
      <img className='breadcrum-img' src={arrow_icon} alt="стрелочка" />
      {product.name}
    </div>
  );
}

export default BreadCrum;