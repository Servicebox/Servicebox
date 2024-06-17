import React from 'react'
import { Link } from 'react-router-dom';
import './Breadcrum.css'
import arrow_icon from "../Assets/breadcrum_arrow.png"


const BreadCrum = (props) => {
  const { product } = props;

  // Проверка на наличие продукт и его категории и имени
  if (!product || !product.category || !product.name) {
    return <div>Loading breadcrumb information...</div>;
  }

  return (
    <div className="breadcrum">
     <Link to="/" className="breadcrum-link">Домашняя</Link> 
     <img className='breadcrum-img' src={arrow_icon} alt="стелочка" />
      <a href="https://servicebox35.ru/Shop" className="breadcrum-link">Каталог</a> 
      <img className='breadcrum-img' src={arrow_icon} alt="стрелочка" /> {product.category} 
      <img className='breadcrum-img' src={arrow_icon} alt="стрелочка" /> {product.name}
    </div>
  );
}

export default BreadCrum;