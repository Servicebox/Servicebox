import React, { useState } from 'react';
import axios from 'axios';
import "./DeleteService.css"

export const DeleteService = ({ serviceId }) => {
  const [deleted, setDeleted] = useState(false);
  const [inputValue, setInputValue] = useState(serviceId);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://servicebox35.pp.ru/services/${inputValue}`);
      console.log(response.data);
      setDeleted(true);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className='deleted'>
      <h2>Удаление услуги</h2>
      {!deleted ? (
        <>
          <input className='admin__input'
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className='create__btn' onClick={handleDelete}>Удалить услугу</button>
        </>
      ) : (
        <p>Услуга успешно удалена</p>
      )}
    </div>
  );
};

export default DeleteService;