import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../Assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchInfo = async () => {
    try {
      const response = await fetch('https://servicebox35.pp.ru/allproducts', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchInfo();
    } catch (error) {
      console.error('Remove product error: ', error.message);
    }
  };

  const startEditing = (product) => {
    setEditingProduct({ ...product });
  };

  const handleEditChange = (e, field) => {
    setEditingProduct({
      ...editingProduct,
      [field]: e.target.value
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('product', file);

    try {
      const response = await fetch('https://servicebox35.pp.ru/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setEditingProduct({
        ...editingProduct,
        image: data.image_url
      });
    } catch (error) {
      console.error('Upload image error: ', error.message);
    }
  };

  const saveEdit = async () => {
    try {
      const response = await fetch(`https://servicebox35.pp.ru/updateproduct/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEditingProduct(null);
      await fetchInfo();
    } catch (error) {
      console.error('Update product error: ', error.message);
    }
  };

  return (
    <div className='list-product'>
      <h2>Список всех товаров</h2>
      <div className='listproduct-format-main'>
        <p>Фото</p>
        <p>Название</p>
        <p>Категория</p>
        <p>Старая цена</p>
        <p>Новая цена</p>
        <p>Количество</p>
        <p>Действия</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr/>
        {allproducts.map((product) => (
          <div key={product.id} className='listproduct-format-main listproduct-format'>
            {editingProduct && editingProduct.id === product.id ? (
              <>
                <input type="file" onChange={handleImageChange} />
                <input value={editingProduct.name} onChange={(e) => handleEditChange(e, 'name')} />
                <input value={editingProduct.category} onChange={(e) => handleEditChange(e, 'category')} />
                <input value={editingProduct.old_price} onChange={(e) => handleEditChange(e, 'old_price')} type="number" />
                <input value={editingProduct.new_price} onChange={(e) => handleEditChange(e, 'new_price')} type="number" />
                <input value={editingProduct.quantity} onChange={(e) => handleEditChange(e, 'quantity')} type="number" />
                <div>
                  <button onClick={saveEdit}>Сохранить</button>
                  <button onClick={() => setEditingProduct(null)}>Отмена</button>
                </div>
              </>
            ) : (
              <>
                <img className='listproduct-product-icon' src={product.image} alt='' />
                <p>{product.name}</p>
                <p>{product.category}</p>
                <p>₽{product.old_price}</p>
                <p>₽{product.new_price}</p>
                <p>{product.quantity}</p>
                <div className='list-btn'>
                  <button className='list-button' onClick={() => startEditing(product)}>Редактировать</button>
                  <img onClick={() => remove_product(product.id)} className='listproduct-remove-icon' src={cross_icon} alt='' />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListProduct;