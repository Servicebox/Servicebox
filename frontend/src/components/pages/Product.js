import React, { useContext } from 'react'
import './Product.css';
import { ShopContext } from '../Contexst/ShopContext';
import { useParams } from 'react-router';
import Breadcrum from '../Breadcrums/Breadcrum';
import ProductDisplay from '../ProductDisplay/ProductDisplay';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  // Проверка на наличие продукта
  if (!product) {
    return <div>Loading product information...</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
    </div>
  )
}

export default Product;