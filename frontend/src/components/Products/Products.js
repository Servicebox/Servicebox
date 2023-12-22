import React, { useState, useEffect } from 'react';
import { fetchProducts} from '../utils/ProductsApi';

import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const authId = '5948'; 
  const authKey = 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp';

  useEffect(() => {
    const loadProducts = async () => {
      const method = 'catalog.getElementList';
      const limit = 500;
      const page = 1;

      try {
        const data = await fetchProducts(authId, authKey, method, limit, page);
        if (data.status && data.status !== 1) {
          throw new Error(data.error); // Передаем сообщение об ошибке в Error
        }

        const productsWithImages = data.response.items.map(product => ({
          ...product,
          imageSrc: product.picture, // Используем поле picture для изображения
        }));

        setProducts(productsWithImages);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        // Отобразить ошибку пользователю через уведомления или другие методы
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h2 className="catalog-list">Каталог товаров</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <ul>
            {product.prices && product.prices.map((price) => (
              <li key={price.id}>
                {price.name} - {price.price} {price.currency}
              </li>
            ))}
          </ul>
          {product.imageSrc && (
            <img src={product.imageSrc} alt={product.name} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;