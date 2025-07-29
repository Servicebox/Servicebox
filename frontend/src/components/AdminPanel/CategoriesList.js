import React, { useState, useEffect } from 'react';

const API_URL = 'https://servicebox35.pp.ru';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/api/categories-full`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка загрузки категорий');
    }

    const data = await response.json();
    
    // Всегда гарантируем, что работаем с массивом
    const categoriesArray = Array.isArray(data) ? data : [];
    setCategories(categoriesArray);
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    setCategories([]); // Устанавливаем пустой массив при ошибке
  }
};

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Введите название категории');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка создания категории');
      }
      
      setNewCategoryName('');
      await fetchCategories();
    } catch (error) {
      console.error('Add category error:', error);
      alert(error.message);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory?.name?.trim()) {
      alert('Введите название категории');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/categories/${editingCategory._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingCategory.name })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка обновления категории');
      }
      
      setEditingCategory(null);
      await fetchCategories();
    } catch (error) {
      console.error('Update category error:', error);
      alert(error.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Удалить эту категорию и все подкатегории?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/categories/${categoryId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Ошибка удаления категории');
      
      await fetchCategories();
    } catch (error) {
      console.error('Delete category error:', error);
      alert(error.message);
    }
  };

  return (
    <div className="admin-card">
      <h2>Управление категориями</h2>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Новая категория"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button className="btn-primary" onClick={handleAddCategory}>
          Добавить категорию
        </button>
      </div>
      
      <div className="adminusers-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Кол-во подкатегорий</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>
                  {editingCategory?._id === category._id ? (
                    <input
                      type="text"
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({
                        ...editingCategory,
                        name: e.target.value
                      })}
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td>{category.subcategories?.length || 0}</td>
                <td>
                  {editingCategory?._id === category._id ? (
                    <>
                      <button className="list-button" onClick={handleUpdateCategory}>
                        Сохранить
                      </button>
                      <button className="list-button" onClick={() => setEditingCategory(null)}>
                        Отмена
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="list-button" 
                        onClick={() => setEditingCategory(category)}
                      >
                        Редактировать
                      </button>
                      <button 
                        className="list-button" 
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        Удалить
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesList;