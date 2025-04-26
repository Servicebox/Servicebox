import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cross_icon from '../Assets/cross_icon.png';
import "./ListService.css"

const ListService = () => {
  const [servicesPrices, setServicesPrices] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingService, setEditingService] = useState(null);

  // Для строки создания новой услуги:
  const [newService, setNewService] = useState({
    serviceName: '',
    description: '',
    price: '',
    category: ''
  });
  const [adding, setAdding] = useState(false); // индикатор ожидания

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('https://servicebox35.pp.ru/services');
      setServicesPrices(response.data);
    } catch (error) {
      console.error('Error fetching services prices: ', error);
    }
  };

  const handleShowAll = () => setShowAll(true);
  const handleHideAll = () => setShowAll(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://servicebox35.pp.ru/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service: ', error);
    }
  };

  const handleEdit = (service) => {
    setEditingService({ ...service });
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://servicebox35.pp.ru/services/${editingService._id}`, editingService);
      setEditingService(null);
      fetchServices();
    } catch (error) {
      console.error('Error updating service: ', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingService(prev => ({ ...prev, [name]: value }));
  };

  // ---- ДЛЯ СОЗДАНИЯ -----
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  const handleNewSubmit = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      await axios.post('https://servicebox35.pp.ru/services', newService);
      setNewService({ serviceName: '', description: '', price: '', category: '' });
      fetchServices();
    } catch (error) {
      alert('Ошибка при добавлении услуги');
      console.error(error);
    }
    setAdding(false);
  };

  const filteredPrices = servicesPrices.filter((servicesPrice) =>
    servicesPrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='list-service'>
      <div className="list-service__title-row">
        <p>Список услуг</p>
        <input
          type="text"
          placeholder="Поиск услуги..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='listservice-allservice'>
        <div className='listservice-format-main'>
          <p>Услуга</p>
          <p>Описание</p>
          <p>Цена</p>
          <p>Категория</p>
          <p>Действия</p>
        </div>

        {/* Строка для добавления */}
        <form className='listservice-format-main listservice-format listservice-create-row'
          onSubmit={handleNewSubmit}>
          <input
            className='admin__input'
            name="serviceName"
            value={newService.serviceName}
            onChange={handleNewChange}
            placeholder="Новая услуга"
            required
          />
          <input
            className='admin__input'
            name="description"
            value={newService.description}
            onChange={handleNewChange}
            placeholder="Описание"
            required
          />
          <input
            className='admin__input'
            name="price"
            value={newService.price}
            onChange={handleNewChange}
            placeholder="Цена"
            required
          />
          <input
            className='admin__input'
            name="category"
            value={newService.category}
            onChange={handleNewChange}
            placeholder="Категория"
            required
          />
          <button className='create__btn' type="submit" disabled={adding}>
            {adding ? "Добав..." : "Добавить"}
          </button>
        </form>

        <hr />

        {filteredPrices.slice(0, showAll ? filteredPrices.length : 15).map((servicesPrice) => (
          <div key={servicesPrice._id} className='listservice-format-main listservice-format'>
            {editingService && editingService._id === servicesPrice._id ? (
              <>
                <input name="serviceName" value={editingService.serviceName} onChange={handleChange} />
                <input name="description" value={editingService.description} onChange={handleChange} />
                <input name="price" value={editingService.price} onChange={handleChange} />
                <input name="category" value={editingService.category} onChange={handleChange} />
                <button onClick={handleSave}>Сохранить</button>
              </>
            ) : (
              <>
                <p>{servicesPrice.serviceName}</p>
                <p>{servicesPrice.description}</p>
                <p>{servicesPrice.price}</p>
                <p>{servicesPrice.category}</p>
                <div className='list-btn'>
                  <button className='list-button' onClick={() => handleEdit(servicesPrice)}>Редактировать</button>
                  <img
                    onClick={() => handleDelete(servicesPrice._id)}
                    className='listservice-remove-icon'
                    src={cross_icon}
                    alt='Удалить'
                  />
                </div>
              </>
            )}
          </div>
        ))}

        {!showAll ? (
          <button className='glass__btn-active' onClick={handleShowAll}>
            Посмотреть прайс
          </button>
        ) : (
          <button className='glass__btn' onClick={handleHideAll}>
            Скрыть прайс
          </button>
        )}
      </div>
    </div>
  );
}

export default ListService;