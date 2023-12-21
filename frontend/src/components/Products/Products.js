import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/ProductsApi';
import "./Products.css"

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const authId = 5948; 
      const authKey = 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp'; 
      const method = 'catalog.getElementList'; 
      const limit = 500; 
      const page = 1; 

      try {
        const fetchedProducts = await fetchProducts(authId, authKey, method, limit, page);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h2 className="catalog-list">Каталог товаров</h2>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <ul>
            {product.prices.map(price => (
              <li key={price.id}>{price.name} - {price.price} {price.currency}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Products;