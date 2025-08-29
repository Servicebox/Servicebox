import React, { useContext } from 'react'
import './Product.css';
import { ShopContext } from '../Contexst/ShopContext';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrum from '../Breadcrums/Breadcrum';
import ProductDisplay from '../ProductDisplay/ProductDisplay';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productSlug } = useParams();

  const product = all_product.find((e) => e.slug === String(productSlug));

  if (!product) {
    return <div>Загруз...</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
    </div>
  )
}

export default Product;