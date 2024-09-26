import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cross_icon from '../Assets/cross_icon.png';
import "./ListService.css"

const ListService = () => {
  const [servicesPrices, setServicesPrices] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingService, setEditingService] = useState(null);

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
      fetchServices(); // Обновляем список после удаления
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
      fetchServices(); // Обновляем список после редактирования
    } catch (error) {
      console.error('Error updating service: ', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingService(prev => ({ ...prev, [name]: value }));
  };

  const filteredPrices = servicesPrices.filter((servicesPrice) =>
    servicesPrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='list-service'>
      <p>Список услуг</p>
      <input
        type="text"
        placeholder="Поиск услуги..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className='listservice-format-main'>
        <p>Услуга</p>
        <p>Описание</p>
        <p>Цена</p>
        <p>Категория</p>
        <p>Действия</p>
      </div>
      <div className='listservice-allservice'>
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
          <button className='glass__btn-active' onClick={handleShowAll}>Посмотреть прайс</button>
        ) : (
          <button className='glass__btn' onClick={handleHideAll}>Скрыть прайс</button>
        )}
      </div>
    </div>
  );
}

export default ListService;