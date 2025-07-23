import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TrackingPage = () => {
  const { trackingCode } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

// Добавьте обработку ошибок даты
useEffect(() => {
  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/track/${trackingCode}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сервера');
      }
      
      const data = await response.json();
      
      // Проверка и форматирование даты
  
      
      setBooking(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchBooking();
}, [trackingCode]);



  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="tracking-container">
      <h1>Отслеживание записи #{booking.trackingCode}</h1>
      
      <div className="status-timeline">
        {booking.statusHistory.map((entry, index) => (
          <div key={index} className={`timeline-item ${entry.status}`}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>{getStatusText(entry.status)}</h3>
              <p>{new Date(entry.changedAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

     {booking && (
  <div className="booking-details">
    <h2>Детали записи</h2>
    <p><strong>Услуга:</strong> {booking.serviceName}</p>
        <p><strong>Статус:</strong> {getStatusText(booking.status)}</p>
        <p><strong>Техник:</strong> {booking.assignedTo || 'Еще не назначен'}</p>
      </div>
     )
    }
    </div>
  );
};
    


// Функция для отображения статуса
const getStatusText = (status) => 
{
  const statuses = {
    pending: 'Ожидает подтверждения',
    confirmed: 'Подтверждена',
    in_progress: 'В работе',
    completed: 'Завершена',
    canceled: 'Отменена'
  };
  return statuses[status] || status;
};

export default TrackingPage;