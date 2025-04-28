import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../Assets/cross_icon.png';

const API_URL = 'https://servicebox35.pp.ru';

const emptyProduct = {
  name: "",
  description: "",
  category: "",
  old_price: "",
  new_price: "",
  quantity: "",
  images: [] // массив строк (url)
};

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [adding, setAdding] = useState(false);

  // State for new product
  const [newProduct, setNewProduct] = useState({ ...emptyProduct, images: [] });
  const [newProductPreview, setNewProductPreview] = useState([]); // для превью картинок до загрузки

  // ---------- Функции ----------

  // Загрузка картинок (новый товар)
  const handleNewImages = async (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    if (files.length < 1) return;

    const formData = new FormData();
    files.forEach(file => formData.append('product', file));
    try {
      const res = await fetch(`${API_URL}/api/uploads`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Ошибка загрузки картинок');
      const data = await res.json();
      setNewProduct(prev => ({ ...prev, images: data.image_urls }));
      setNewProductPreview(data.image_urls);
    } catch {
      alert('Ошибка загрузки изображений');
    }
  };

  // Получение значений форм
  const handleNewChange = (e) => {
    setNewProduct(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Отправка нового товара
  const handleNewSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.images || newProduct.images.length === 0) {
      alert("Сначала загрузите минимум 1 изображение!");
      return;
    }
    setAdding(true);
    try {
      const response = await fetch(`${API_URL}/api/addproduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          old_price: Number(newProduct.old_price),
          new_price: Number(newProduct.new_price),
          quantity: Number(newProduct.quantity)
        }),
      });
      if (!response.ok) throw new Error('Ошибка создания товара');
      setNewProduct({ ...emptyProduct, images: [] });
      setNewProductPreview([]);
      await fetchInfo();
    } catch {
      alert("Ошибка при добавлении товара");
    }
    setAdding(false);
  };

  // Получить все товары
  const fetchInfo = async () => {
    try {
      const response = await fetch(`${API_URL}/api/allproducts`);
      const data = await response.json();
      setAllProducts(data);
    } catch (e) {
      alert("Ошибка загрузки списка товаров");
    }
  };

  useEffect(() => { fetchInfo(); }, []);

  // Удаление товара
  const remove_product = async (id) => {
    if (!window.confirm('Удалить этот товар?')) return;
    try {
      await fetch(`${API_URL}/api/removeproduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      await fetchInfo();
    } catch {
      alert("Ошибка удаления");
    }
  };

  // --- Редактирование
  const startEditing = (p) => {
    // Копируем, если картинки - массив строк
    setEditingProduct({ ...p, images: Array.isArray(p.images) ? p.images : [p.images] });
  };
  const handleEditChange = (e) => {
    setEditingProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // Загрузка новых изображений (replace все картинки)
  const handleEditImages = async (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    if (files.length < 1) return;
    const formData = new FormData();
    files.forEach(file => formData.append('product', file));
    try {
      const res = await fetch(`${API_URL}/api/uploads`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Ошибка загрузки файлов');
      const data = await res.json();
      setEditingProduct(p => ({ ...p, images: data.image_urls }));
    } catch {
      alert('Ошибка загрузки изображений');
    }
  };
  // Сохранение измененного товара
  const saveEdit = async () => {
    try {
      const response = await fetch(`${API_URL}/api/updateproduct/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingProduct,
          old_price: Number(editingProduct.old_price),
          new_price: Number(editingProduct.new_price),
          quantity: Number(editingProduct.quantity),
        }),
      });
      if (!response.ok) throw new Error();
      setEditingProduct(null);
      await fetchInfo();
    } catch {
      alert("Ошибка обновления товара");
    }
  };

  // ------------- JSX -------------

  return (
    <div className='list-product'>
      <h2>Добавить новый товар</h2>
      <form className='listproduct-create-row' onSubmit={handleNewSubmit} style={{ marginBottom: 24 }}>
        <div>
          <input type="file" multiple accept="image/*" onChange={handleNewImages} />
          <div style={{ display: 'flex', gap: 8, marginTop: 5 }}>
            {(newProduct.images?.length > 0 ? newProduct.images : newProductPreview).map((img, i) => (
              <img key={i} src={img} alt="preview" style={{ width: 48, height: 48, objectFit: 'cover', border: '1px solid #ccc' }} />
            ))}
          </div>
        </div>
        <input name="name" placeholder="Название" value={newProduct.name} onChange={handleNewChange} required />
        <textarea name="description" placeholder="Описание" value={newProduct.description} onChange={handleNewChange} rows={3} required />
        <input name="category" placeholder="Категория" value={newProduct.category} onChange={handleNewChange} required />
        <input name="old_price" placeholder="Старая цена" value={newProduct.old_price} onChange={handleNewChange} type="number" />
        <input name="new_price" placeholder="Новая цена" value={newProduct.new_price} onChange={handleNewChange} type="number" required />
        <input name="quantity" placeholder="Количество" value={newProduct.quantity} onChange={handleNewChange} type="number" required />
        <button disabled={adding}>{adding ? "Добавление..." : "Добавить"}</button>
      </form>

      <h2>Все товары</h2>
      <div className='listproduct-format-main'>
        <p>Фото</p>
        <p>Название</p>
        <p>Описание</p>
        <p>Категория</p>
        <p>Старая цена</p>
        <p>Новая цена</p>
        <p>Кол-во</p>
        <p>Действия</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {allproducts.map((product) => (
          <div key={product.id} className='listproduct-format-main listproduct-format'>
            {editingProduct && editingProduct.id === product.id ? (
              <>
                <div>
                  <input type="file" multiple accept="image/*" onChange={handleEditImages} />
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    {(editingProduct.images || []).map((img, i) => (
                      <img key={i} src={img} alt="" style={{ width: 40, height: 40, objectFit: 'cover', border: '1px solid #ccc' }} />
                    ))}
                  </div>
                </div>
                <input name="name" value={editingProduct.name} onChange={handleEditChange} />
                <textarea name="description" value={editingProduct.description} onChange={handleEditChange} rows={3} />
                <input name="category" value={editingProduct.category} onChange={handleEditChange} />
                <input name="old_price" value={editingProduct.old_price} onChange={handleEditChange} type="number" />
                <input name="new_price" value={editingProduct.new_price} onChange={handleEditChange} type="number" />
                <input name="quantity" value={editingProduct.quantity} onChange={handleEditChange} type="number" />
                <div>
                  <button className='list-button' onClick={saveEdit}>Сохранить</button>
                  <button className='list-button' onClick={() => setEditingProduct(null)}>Отмена</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  {(product.images ?? product.image ? [product.image] : []).slice(0, 3).map((img, i) =>
                    !!img && <img key={i} className='listproduct-product-icon' src={img} alt='' style={{ width: 40, height: 40, objectFit: 'cover', border: '1px solid #eee', marginRight: 4 }} />
                  )}
                </div>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.category}</p>
                <p>₽{product.old_price}</p>
                <p>₽{product.new_price}</p>
                <p>{product.quantity}</p>
                <div className='list-btn'>
                  <button className='list-button' onClick={() => startEditing(product)}>Редактировать</button>
                  <img onClick={() => remove_product(product.id)} className='listproduct-remove-icon' src={cross_icon} style={{ cursor: 'pointer' }} alt='' />
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