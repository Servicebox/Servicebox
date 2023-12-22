import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchImage } from '../utils/ProductsApi';
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const authId = 5948;
  const authKey = 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp';

  useEffect(() => {
    const loadProducts = async () => {
      const method = 'catalog.getElementList';
      const limit = 500;
      const page = 1;

      try {
        const fetchedProducts = await fetchProducts(authId, authKey, method, limit, page);
        setProducts(fetchedProducts.response.items);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    loadProducts();
  }, []);

  const loadImage = async (elementId) => {
    try {
      const response = await fetchImage(authId, authKey, elementId);
      // Обработка полученного изображения
      return response;
    } catch (error) {
      console.error('Ошибка при получении изображения:', error);
      return null;
    }
  };

  return (
    <div>
      <h2 className="catalog-list">Каталог товаров</h2>
      {products.map(async (product) => ( // Использование async для поддержки await
        <div key={product.id}>
          <h3>{product.name}</h3>
          <ul>
            {product.prices.map((price) => (
              <li key={price.id}>
                {price.name} - {price.price} {price.currency}
              </li>
            ))}
          </ul>
          {product.picture && (
            <img src={await loadImage(product.id)} alt={product.name} /> // Использование await для ожидания получения изображения
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;
