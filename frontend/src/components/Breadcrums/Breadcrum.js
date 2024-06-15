import React from 'react'
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
      Домашняя <img className='breadcrum-img' src={arrow_icon} alt="" /> Каталог <img className='breadcrum-img' src={arrow_icon} alt="" /> {product.category} <img className='breadcrum-img' src={arrow_icon} alt="" /> {product.name}
    </div>
  );
}

export default BreadCrum;