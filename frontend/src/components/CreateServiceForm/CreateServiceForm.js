import React, { useState } from 'react';
import axios from 'axios';
import "./CreateServiceForm.css"

const CreateServiceForm = () => {
  const [formData, setFormData] = useState({
    serviceId: '', // Добавляем serviceId в начальное состояние
    serviceName: '',
    description: '',
    price: 0,
    category: '',
  });

  const { serviceId } = formData; 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //создание услуг
  const createNewService = async (serviceData) => {
    try {
      const response = await axios.post('https://servicebox35.pp.ru/services', serviceData);
      if (response.status === 201) {
        console.log("Услуга успешно создана", response.data);
        setFormData({ ...formData, serviceId: response.data.id }); // Обновить serviceId из ответа
      }
    } catch (error) {
      console.error('Ошибка при создании новой услуги:', error);
    }
  };

  // Функция для редактирования услуги
  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData }; // Получить обновленные данные из состояния формы
    try {
      const response = await axios.put(`https://servicebox35.pp.ru/services/${updatedData.serviceId}`, updatedData);
      if (response.status === 200) {
        console.log("Услуга успешно обновлена", response.data);
        // Дополнительные действия после успешного обновления
      }
    } catch (error) {
      console.error('Ошибка при обновлении услуги:', error);
    }
  };

  // Функция для удаления услуги
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://servicebox35.pp.ru/services/${formData.serviceId}`);
      if (response.status === 200) {
        console.log("Услуга успешно удалена");
        // Дополнительные действия после успешного удаления
      }
    } catch (error) {
      console.error('Ошибка при удалении услуги:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewService(formData);
  };

  return (
    <form className='create__form' onSubmit={handleSubmit}>
    <input
    type="text"
    name="serviceName"
    value={formData.serviceName}
    onChange={handleInputChange}
    placeholder="Название услуги"
    required
    />
    <textarea
    name="description"
    value={formData.description}
    onChange={handleInputChange}
    placeholder="Описание"
    required
    />
    <input
    type="text"
    name="price"
    value={formData.price}
    onChange={handleInputChange}
    placeholder="Цена"
    required
    />
    <input
    type="text"
    name="category"
    value={formData.category}
    onChange={handleInputChange}
    placeholder="Категория"
    required
    />
    <button className='create__btn' type="submit">Создать</button>
    {serviceId && (
    <div>
    <button onClick={handleEdit}>Редактировать</button>
    <button onClick={handleDelete}>Удалить</button>
    </div>
    )}
    </form>
    );
    };
    
    export default CreateServiceForm;