//components/listproduct
// eslint-disable-next-line no-unused-vars
import React,{useState, useEffect} from 'react'
import './ListProduct.css';
import cross_icon from '../Assets/cross_icon.png'


const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch('https://servicebox35.pp.ru/allproducts', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status: ', response.status); // Для отладки статуса ответа

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Fetch error: ', error.message);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      const response = await fetch('https://servicebox35.pp.ru/removeproduct', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      console.log('Response status for remove_product: ', response.status); // Для отладки статуса ответа

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchInfo();
    } catch (error) {
      console.error('Remove product error: ', error.message);
    }
  };

  return (
    <div className='list-product'>
      <p>All product List</p>
      <div className='listproduct-format-main'>
        <p>Товар</p>
        <p>Название</p>
        <p>Остаток</p>
        <p>Старая цена</p>
        <p>Новая цена</p>
        <p>Категория</p>
        <p>Удалить</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr/>
        {allproducts.map((product) => {
          return (
            <div key={product.id} className='listproduct-format-main listproduct-format'>
              <img className='listproduct-product-icon' src={product.image} alt='иконка листа продукта' />
              <p>{product.name}</p>
              <p>{product.quantity}</p>
              <p>₽{product.old_price}</p>
              <p>₽{product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt='удаление ' />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListProduct;