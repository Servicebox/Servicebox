import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../Assets/cross_icon.png';

const API_URL = 'https://servicebox35.pp.ru';

const emptyProduct = {
  name: "",
  description: "",
  category: "",
  subcategory: "",
  old_price: "",
  new_price: "",
  quantity: "",
  images: []
};

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingSubcategories, setEditingSubcategories] = useState([]);
  const [adding, setAdding] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newProduct, setNewProduct] = useState({ ...emptyProduct, images: [] });
  const [newProductPreview, setNewProductPreview] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/categories-with-subcategories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const selectedCategory = categories.find(c => c.category === newProduct.category);
    setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
  }, [newProduct.category, categories]);

  useEffect(() => {
    if (!editingProduct) return;
    const selectedCategory = categories.find(c => c.category === editingProduct.category);
    setEditingSubcategories(selectedCategory ? selectedCategory.subcategories : []);
  }, [editingProduct?.category, categories]);

  const handleNewImages = async (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    if (files.length < 1) return;

    const formData = new FormData();
    files.forEach(file => formData.append('product', file));

    try {
      const res = await fetch(`${API_URL}/api/uploads`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Ошибка сервера: ${errorText}`);
      }

      const data = await res.json();
      setNewProduct(prev => ({ ...prev, images: data.image_urls }));
      setNewProductPreview(data.image_urls);
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Ошибка загрузки: ${error.message}`);
    }
  };
  const handleNewChange = (e) => {
    setNewProduct(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

const handleNewSubmit = async (e) => {
  e.preventDefault();
  if (!newProduct.images || newProduct.images.length === 0) {
    alert("Сначала загрузите минимум 1 изображение!");
    return;
  }
  setAdding(true);

  try {
    const cat = newProduct.category === "__new__" 
      ? newProduct.category_typed 
      : newProduct.category;
      
    const subcat = newProduct.subcategory === "__new__"
      ? newProduct.subcategory_typed
      : newProduct.subcategory;

    const response = await fetch(`${API_URL}/api/addproduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newProduct.name,
        category: cat,
        subcategory: subcat,
        old_price: Number(newProduct.old_price),
        new_price: Number(newProduct.new_price),
        description: newProduct.description.replace(/\n/g, '<br>'),
        quantity: Number(newProduct.quantity),
        images: newProduct.images
      }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      setNewProduct({ ...emptyProduct, images: [] });
      setNewProductPreview([]);
      await fetchInfo();
      alert('Товар успешно добавлен!');
    } else {
      alert(data.message || 'Ошибка при добавлении товара');
    }
  } catch (error) {
    console.error('Error adding product:', error);
    alert("Ошибка при добавлении товара: " + error.message);
  } finally {
    setAdding(false);
  }
};
const fetchInfo = async () => {
  try {
    const response = await fetch(`${API_URL}/api/allproducts`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && Array.isArray(data.products)) {
      setAllProducts(data.products);
    } else if (Array.isArray(data)) {
      setAllProducts(data);
    } else {
      console.error('Неверный формат данных:', data);
      setAllProducts([]);
    }
  } catch (e) {
    console.error("Ошибка загрузки списка товаров:", e);
    setAllProducts([]);
    alert("Ошибка загрузки списка товаров: " + e.message);
  }
};

  useEffect(() => { fetchInfo(); }, []);

const remove_product = async (slug) => {
  if (!slug) {
    alert('Неверный идентификатор товара');
    return;
  }
  
  if (!window.confirm('Удалить этот товар?')) return;
  
  try {
    const response = await fetch(`${API_URL}/api/removeproduct/${slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert('Товар успешно удален');
      await fetchInfo();
    } else {
      alert(data.message || 'Ошибка при удалении товара');
    }
  } catch (error) {
    console.error('Error removing product:', error);
    alert('Ошибка удаления: ' + error.message);
  }
};
  const startEditing = (p) => {
    setEditingProduct({
      ...p,
      images: Array.isArray(p.images) ? p.images : [p.images]
    });
    const selectedCategory = categories.find(c => c.category === p.category);
    setEditingSubcategories(selectedCategory ? selectedCategory.subcategories : []);
  };

  const handleEditChange = (e) => {
    setEditingProduct(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditCategoryChange = (e) => {
    const value = e.target.value;
    setEditingProduct(prev => ({
      ...prev,
      category: value,
      subcategory: "",
      category_typed: "",
      subcategory_typed: ""
    }));
    const selectedCategory = categories.find(c => c.category === value);
    setEditingSubcategories(selectedCategory ? selectedCategory.subcategories : []);
  };

  const handleEditSubcategoryChange = (e) => {
    setEditingProduct(prev => ({
      ...prev,
      subcategory: e.target.value
    }));
  };

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
  const saveEdit = async () => {
    if (!editingProduct) return;
    // Аналогичная логика, как в handleNewSubmit
    const cat = editingProduct.category === "__new__"
      ? editingProduct.category_typed
      : editingProduct.category;
    let subcat = "";
    if (editingProduct.category === "__new__") {
      subcat = editingProduct.subcategory_typed || "";
    } else {
      if (editingProduct.subcategory === "__new__") {
        subcat = editingProduct.subcategory_typed;
      } else {
        subcat = editingProduct.subcategory || "";
      }
    }

    try {
      const response = await fetch(`${API_URL}/api/updateproduct/${editingProduct.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingProduct,
          category: cat,
          subcategory: subcat,
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

  const filteredProducts = allproducts.filter(product => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      (product.name && product.name.toLowerCase().includes(q)) ||
      (product.description && product.description.toLowerCase().includes(q)) ||
      (product.category && product.category.toLowerCase().includes(q)) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(q))
    );
  });
  return (
    <div className='list-product'>
      <h2>Добавить новый товар</h2>
      <input
        type="text"
        placeholder="Поиск."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <form className='listproduct-create-row' onSubmit={handleNewSubmit} style={{ marginBottom: 24 }}>
        <div>
          <input type="file" multiple accept="image/*" onChange={handleNewImages} />
          <div style={{ display: 'flex', gap: 8, marginTop: 5 }}>
            {(newProduct.images?.length > 0 ? newProduct.images : newProductPreview).map((img, i) => (
              <img
                key={`new-img-${img}`}
                src={img}
                alt="preview"
                style={{ width: 48, height: 48, objectFit: 'cover', border: '1px solid #ccc' }}
              />
            ))}
          </div>
        </div>
        <input name="name" placeholder="Название" value={newProduct.name} onChange={handleNewChange} required />
        <textarea name="description" placeholder="Описание" value={newProduct.description} onChange={handleNewChange} rows={3} required />
        <select
          name="category"
          value={newProduct.category}
          onChange={e => {
            setNewProduct(prev => ({
              ...prev,
              category: e.target.value,
              subcategory: "",
              category_typed: "",
              subcategory_typed: ""
            }));
          }}
          required
        >
          <option value="">Выберите категорию...</option>
          {categories.map(c => (
            <option key={c.category} value={c.category}>{c.category}</option>
          ))}
          <option value="__new__">+ Новая категория</option>
        </select>
        {newProduct.category === "__new__" && (
          <input
            name="category_typed"
            placeholder="Введите новую категорию"
            value={newProduct.category_typed || ""}
            onChange={e => setNewProduct(prev => ({
              ...prev,
              category_typed: e.target.value
            }))}
            required
          />
        )}
        {(
          (newProduct.category === "__new__") || subcategories.length > 0
        ) && (
            <>
              <label>Подкатегория</label>
              {newProduct.category === "__new__" ? (
                <input
                  name="subcategory_typed"
                  placeholder="Введите подкатегорию (опционально)"
                  value={newProduct.subcategory_typed || ""}
                  onChange={e => setNewProduct(prev => ({
                    ...prev,
                    subcategory_typed: e.target.value
                  }))}
                />
              ) : (
                <select
                  name="subcategory"
                  value={newProduct.subcategory}
                  onChange={e => setNewProduct(prev => ({
                    ...prev,
                    subcategory: e.target.value,
                    subcategory_typed: ""
                  }))}
                >
                  <option value="">Выберите подкатегорию...</option>
                  {subcategories.map(s => <option key={s} value={s}>{s}</option>)}
                  <option value="__new__">+ Новая подкатегория</option>
                </select>
              )}
              {newProduct.category !== "__new__" && newProduct.subcategory === "__new__" &&
                <input
                  name="subcategory_typed"
                  placeholder="Введите новую подкатегорию"
                  value={newProduct.subcategory_typed || ""}
                  onChange={e => setNewProduct(prev => ({
                    ...prev,
                    subcategory_typed: e.target.value
                  }))}
                  required
                />
              }
            </>
          )}

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
        <p>Подкатегория</p>
        <p>Старая цена</p>
        <p>Новая цена</p>
        <p>Кол-во</p>
        <p>Действия</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {filteredProducts.map((product) => (
          <div key={product.slug} className='listproduct-format-main listproduct-format'>
            {editingProduct && editingProduct.slug === product.slug ? (
              <>
                <div>
                  <input type="file" multiple accept="image/*" onChange={handleEditImages} />
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    {(editingProduct.images || []).map((img) => (
                      <img
                        key={`edit-img-${img}`}
                        src={img}
                        alt=""
                        style={{ width: 40, height: 40, objectFit: 'cover', border: '1px solid #ccc' }}
                      />
                    ))}
                  </div>
                </div>
                <input name="name" value={editingProduct.name} onChange={handleEditChange} />
                <textarea name="description" value={editingProduct.description} onChange={handleEditChange} rows={3} />
                <select
                  name="category"
                  value={editingProduct.category}
                  onChange={handleEditCategoryChange}
                  required
                >
                  <option value="">Выберите категорию...</option>
                  {categories.map(c => (
                    <option key={c.category} value={c.category}>{c.category}</option>
                  ))}
                  <option value="__new__">+ Новая категория</option>
                </select>
                {editingProduct.category === "__new__" && (
                  <input
                    name="category_typed"
                    placeholder="Введите новую категорию"
                    value={editingProduct.category_typed || ""}
                    onChange={e =>
                      setEditingProduct(prev => ({
                        ...prev,
                        category_typed: e.target.value
                      }))}
                    required
                  />
                )}
                {(
                  (editingProduct.category === "__new__") || editingSubcategories.length > 0
                ) && (
                    <>
                      {editingProduct.category === "__new__" ? (
                        <input
                          name="subcategory_typed"
                          placeholder="Введите подкатегорию (опционально)"
                          value={editingProduct.subcategory_typed || ""}
                          onChange={e =>
                            setEditingProduct(prev => ({
                              ...prev,
                              subcategory_typed: e.target.value
                            }))}
                        />
                      ) : (
                        <select
                          name="subcategory"
                          value={editingProduct.subcategory}
                          onChange={handleEditSubcategoryChange}
                        >
                          <option value="">Выберите подкатегорию...</option>
                          {editingSubcategories.map(s =>
                            <option key={s} value={s}>{s}</option>
                          )}
                          <option value="__new__">+ Новая подкатегория</option>
                        </select>
                      )}
                      {editingProduct.category !== "__new__" && editingProduct.subcategory === "__new__" &&
                        <input
                          name="subcategory_typed"
                          placeholder="Введите новую подкатегорию"
                          value={editingProduct.subcategory_typed || ""}
                          onChange={e =>
                            setEditingProduct(prev => ({
                              ...prev,
                              subcategory_typed: e.target.value
                            }))}
                          required
                        />
                      }
                    </>
                  )}

                <input name="old_price" value={editingProduct.old_price} onChange={handleEditChange} type="number" />
                <input name="new_price" value={editingProduct.new_price} onChange={handleEditChange} type="number" />
                <input name="quantity" value={editingProduct.quantity} onChange={handleEditChange} type="number" />
                <div>
                  <button className='list-button' type="button" onClick={saveEdit}>Сохранить</button>
                  <button className='list-button' type="button" onClick={() => setEditingProduct(null)}>Отмена</button>
                </div>
              </>
            ) : (
              <>
              <div>
  {(Array.isArray(product.images) ? product.images : 
   product.image ? [product.image] : []).slice(0, 3).map((img) =>
    img && <img
      key={`prod-img-${img}`}
      className='listproduct-product-icon'
      src={img}
      alt='Запчасти для ремонта телефонов, планшетов, ноутбуков, видеокарт в Вологде'
      style={{ width: 40, height: 40, objectFit: 'cover', border: '1px solid #eee', marginRight: 4 }}
    />
  )}
</div>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.category}</p>

                <p>{product.old_price}₽</p>
                <p>{product.new_price}₽</p>
                <p>{product.quantity}</p>
                <div className='list-btn'>
                  <button className='list-button' onClick={() => startEditing(product)}>Редактировать</button>
                  <img 
  onClick={() => remove_product(product.slug)} 
  className='listproduct-remove-icon' 
  src={cross_icon} 
  style={{ cursor: 'pointer' }} 
  alt='Удалить' 
/>
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