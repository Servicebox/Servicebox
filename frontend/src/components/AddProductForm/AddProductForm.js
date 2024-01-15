{/*import React, { useState } from 'react';

function AddProductForm() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (event) => {
   
    event.preventDefault();
    console.log('Отправка данных на сервер:', { productName, productDescription, productPrice, productCategory });
  };
  useEffect(() => {
    // Выполнение запроса на сервер для проверки роли администратора
    axios.get('http://localhost:5000/userRoleCheck', { withCredentials: true }) 
      .then((response) => {
        setIsAdmin(response.data.isAdmin);
      })
      .catch((error) => {
        console.log('Ошибка при получении данных пользователя:', error);
      });
  }, []);

  if (!isAdmin) {
    return <div>Доступ запрещен</div>;
  }

  return (
    <div>
      <h2>Добавление товара</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Название товара:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productDescription">Описание товара:</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="productPrice">Цена:</label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productCategory">Категория:</label>
          <input
            type="text"
            id="productCategory"
            name="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit">Добавить товар</button>
      </form>
    </div>
  );
}

export default AddProductForm;*/}