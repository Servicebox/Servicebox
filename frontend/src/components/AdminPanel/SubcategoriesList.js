import React, { useState, useEffect } from 'react';

const API_URL = 'https://servicebox35.pp.ru';

const SubcategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/api/categories-full`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка загрузки категорий');
      }

      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
      
      // Выбираем первую категорию по умолчанию
      if (data.length > 0) {
        setSelectedCategory(data[0]._id);
      } else {
        setSelectedCategory('');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(`Ошибка загрузки категорий: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/api/categories/${categoryId}/subcategories`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка загрузки подкатегорий');
      }

      const data = await response.json();
      setSubcategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setError(`Ошибка загрузки подкатегорий: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubcategory = async () => {
    if (!newSubcategoryName.trim()) {
      alert('Введите название подкатегории');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/api/categories/${selectedCategory}/subcategories`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: newSubcategoryName })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка создания подкатегории');
      }
      
      setNewSubcategoryName('');
      await fetchSubcategories(selectedCategory);
    } catch (error) {
      console.error('Add subcategory error:', error);
      setError(`Ошибка создания подкатегории: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubcategory = async () => {
    if (!editingSubcategory?.name?.trim()) {
      alert('Введите название подкатегории');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/api/subcategories/${editingSubcategory._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: editingSubcategory.name })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка обновления подкатегории');
      }
      
      setEditingSubcategory(null);
      await fetchSubcategories(selectedCategory);
    } catch (error) {
      console.error('Update subcategory error:', error);
      setError(`Ошибка обновления подкатегории: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    if (!window.confirm('Удалить эту подкатегорию?')) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/api/subcategories/${subcategoryId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка удаления подкатегории');
      }
      
      await fetchSubcategories(selectedCategory);
    } catch (error) {
      console.error('Delete subcategory error:', error);
      setError(`Ошибка удаления подкатегории: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-card">
        <div className="loader-container">
          <div className="loader"></div>
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-card">
        <div className="error-message">
          <h3>Ошибка</h3>
          <p>{error}</p>
          <button 
            className="btn-retry"
            onClick={() => {
              if (selectedCategory) {
                fetchSubcategories(selectedCategory);
              } else {
                fetchCategories();
              }
            }}
          >
            Повторить попытку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-card">
      <h2>Управление подкатегориями</h2>
      
      <div className="form-group">
        <label className="form-label">Категория:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={categories.length === 0}
        >
          {categories.length > 0 ? (
            categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))
          ) : (
            <option value="">Нет доступных категорий</option>
          )}
        </select>
      </div>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Новая подкатегория"
          value={newSubcategoryName}
          onChange={(e) => setNewSubcategoryName(e.target.value)}
          disabled={!selectedCategory || loading}
        />
        <button 
          className="btn-primary" 
          onClick={handleAddSubcategory}
          disabled={!selectedCategory || loading || !newSubcategoryName.trim()}
        >
          {loading ? 'Добавление...' : 'Добавить подкатегорию'}
        </button>
      </div>
      
      {subcategories.length > 0 ? (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map(subcategory => (
                <tr key={subcategory._id}>
                  <td>{subcategory._id}</td>
                  <td>
                    {editingSubcategory?._id === subcategory._id ? (
                      <input
                        type="text"
                        value={editingSubcategory.name}
                        onChange={(e) => setEditingSubcategory({
                          ...editingSubcategory,
                          name: e.target.value
                        })}
                        disabled={loading}
                      />
                    ) : (
                      subcategory.name
                    )}
                  </td>
                  <td>
                    {editingSubcategory?._id === subcategory._id ? (
                      <>
                        <button 
                          className="btn-action btn-save"
                          onClick={handleUpdateSubcategory}
                          disabled={loading}
                        >
                          {loading ? 'Сохранение...' : 'Сохранить'}
                        </button>
                        <button 
                          className="btn-action btn-cancel"
                          onClick={() => setEditingSubcategory(null)}
                          disabled={loading}
                        >
                          Отмена
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="btn-action btn-edit"
                          onClick={() => setEditingSubcategory(subcategory)}
                          disabled={loading}
                        >
                          Редактировать
                        </button>
                        <button 
                          className="btn-action btn-delete"
                          onClick={() => handleDeleteSubcategory(subcategory._id)}
                          disabled={loading}
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
      ) : selectedCategory ? (
        <div className="no-data-message">
          <p>Нет подкатегорий для выбранной категории</p>
          <button 
            className="btn-refresh"
            onClick={() => fetchSubcategories(selectedCategory)}
          >
            Обновить список
          </button>
        </div>
      ) : (
        <div className="no-data-message">
          <p>Выберите категорию для управления подкатегориями</p>
        </div>
      )}
    </div>
  );
};

export default SubcategoriesList;