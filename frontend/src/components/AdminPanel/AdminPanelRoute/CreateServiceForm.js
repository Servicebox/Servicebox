import React, { useState } from 'react';
import axios from 'axios';
import "./CreateServiceForm.css"

//создание
const createNewService = async (serviceData) => {
  try {
    const response = await axios.post('https://servicebox35.pp.ru/services', serviceData);
    if (response.status === 201) {
      // Обработка успешно созданного продукта, например показать сообщение или обновить список услуг
      console.log("Услуга успешно создана", response.data);
    }
  } catch (error) {
    console.error('Ошибка при создании новой услуги:', error);
  }
};


const CreateServiceForm = () => {
  const [formData, setFormData] = useState({
    serviceName: '',
    description: '',
    price: 0,
    category: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewService(formData);
      // Очистка формы, обновление состояния или другие действия после успешного создания услуги
      setFormData({ serviceName: '', description: '', price: 0, category: '' }); // Сброс формы
    } catch (error) {
      // Обработка ошибок
    }
  };

  return (
    <form className='create__form' onSubmit={handleSubmit}>
      <input className='admin__input'
        type="text"
        name="serviceName"
        value={formData.serviceName}
        onChange={handleInputChange}
        placeholder="Название услуги"
        required
      />
      <textarea className='admin__input'
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Описание"
        required
      />
      <input className='admin__input'
        type="text"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="Цена"
        required
      />
      <input className='admin__input'
        type="text"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        placeholder="Категория"
        required
      />
      <button className='create__btn' type="submit">Создать</button>
    </form>
  );
};

export default CreateServiceForm;