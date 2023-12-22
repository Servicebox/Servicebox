import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://optfm.ru/api/', {
          auth_id: '5948',
          auth_key: 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp',
          method: 'catalog.getSectionList',
          limit: 500,
          page: 0
        });
        setData(response.data);
      } catch (error) {
        // Обработка ошибки
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей означает, что этот эффект будет запускаться только один раз при монтировании компонента

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <h2> Каталог</h2>
    </div>
  );
}

export default Products;