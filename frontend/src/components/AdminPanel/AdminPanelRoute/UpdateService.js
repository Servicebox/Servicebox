import React, { useState } from 'react';
import axios from 'axios';

export const UpdateService = () => {
  const [updatedData, setUpdatedData] = useState({
    serviceId: '',
    serviceName: '',
    description: '',
    price: '',
    category: ''
  });

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://servicebox35.pp.ru/services/${updatedData.serviceId}`, {
        serviceName: updatedData.serviceName,
        description: updatedData.description,
        price: updatedData.price,
        category: updatedData.category
      });
      (response.data);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  }

  return (
    <form className='create__form' onSubmit={handleSubmit}>
      <input className='admin__input'
        type="text" 
        name="serviceId"
        value={updatedData.serviceId} 
        onChange={handleInputChange}
        placeholder="Service ID"
      />
      <input className='admin__input'
        type="text" 
        name="serviceName"
        value={updatedData.serviceName} 
        onChange={handleInputChange}
        placeholder="Service Name"
      />
      <input className='admin__input'
        type="text" 
        name="description"
        value={updatedData.description} 
        onChange={handleInputChange}
        placeholder="Description"
      />
      <input className='admin__input'
        type="text" 
        name="price"
        value={updatedData.price} 
        onChange={handleInputChange}
        placeholder="Price"
      />
      <input className='admin__input'
        type="text" 
        name="category"
        value={updatedData.category} 
        onChange={handleInputChange}
        placeholder="Category"
      />
      <button className='create__btn' type="submit">Обновление услуги</button>
    </form>
  );
}

export default UpdateService;