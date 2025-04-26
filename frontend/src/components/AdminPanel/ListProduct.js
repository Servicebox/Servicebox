import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../Assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // --- NEW PRODUCT ---
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    old_price: "",
    new_price: "",
    quantity: "",
    image: ""
  });
  const [adding, setAdding] = useState(false);

  // загрузка файла картинки для нового товара
  const handleNewImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('product', file);
    try {
      const response = await fetch('https://servicebox35.pp.ru/api/uploads', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Ошибка загрузки фото');
      const data = await response.json();
      setNewProduct(prev => ({
        ...prev,
        image: data.image_url
      }));
    } catch (e) {
      alert('Ошибка загрузки изображения');
    }
  };

  // поля нового товара
  const handleNewChange = (e, field) => {
    setNewProduct({
      ...newProduct,
      [field]: e.target.value
    });
  };

  // Отправка нового товара
  const handleNewSubmit = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const response = await fetch('https://servicebox35.pp.ru/api/addproduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error('Ошибка создания товара');
      setNewProduct({
        name: "",
        category: "",
        old_price: "",
        new_price: "",
        quantity: "",
        image: ""
      });
      await fetchInfo();
    } catch (error) {
      alert('Ошибка при добавлении товара');
      console.error(error);
    }
    setAdding(false);
  };

  const fetchInfo = async () => {
    try {
      const response = await fetch('https://servicebox35.pp.ru/api/allproducts', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTPS error! status: ${response.status}`);
      }

      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Fetch error: ', error.message);
    }
  };

  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line
  }, []);

  const remove_product = async (id) => {
    try {
      const response = await fetch('https://servicebox35.pp.ru/api/removeproduct', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

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
    if (!file) return;
    const formData = new FormData();
    formData.append('product', file);

    try {
      const response = await fetch('https://servicebox35.pp.ru/api/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
      const response = await fetch(`https://servicebox35.pp.ru/api/updateproduct/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

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
      <form className='listproduct-format-main listproduct-create-row' onSubmit={handleNewSubmit}>
        <>
          <input type="file" accept="image/*" onChange={handleNewImageChange} />
          <input placeholder="Название" value={newProduct.name} onChange={e => handleNewChange(e, 'name')} required />
          <input placeholder="Категория" value={newProduct.category} onChange={e => handleNewChange(e, 'category')} required />
          <input placeholder="Старая цена" value={newProduct.old_price} onChange={e => handleNewChange(e, 'old_price')} type="number" required />
          <input placeholder="Новая цена" value={newProduct.new_price} onChange={e => handleNewChange(e, 'new_price')} type="number" required />
          <input placeholder="Количество" value={newProduct.quantity} onChange={e => handleNewChange(e, 'quantity')} type="number" required />
          <button className='create__btn' type="submit" disabled={adding}>{adding ? "Сохр..." : "Добавить"}</button>
        </>
      </form>
      <div className='listproduct-allproducts'>
        <hr />
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
                  <button className='list-button' onClick={saveEdit}>Сохранить</button>
                  <button className='list-button' onClick={() => setEditingProduct(null)}>Отмена</button>
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
};

export default ListProduct;