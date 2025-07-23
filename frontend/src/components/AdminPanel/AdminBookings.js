import React, { useState, useEffect } from 'react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [filter, dateFilter]);

const fetchBookings = async () => {
  try {
    const query = new URLSearchParams({ status: filter, date: dateFilter });
    const response = await fetch(`/api/admin/bookings?${query}`);
    
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    
    const data = await response.json();
    
    // Добавляем форматированные даты
    const bookingsWithFormattedDates = data.map(booking => ({
      ...booking,
      formattedDate: new Date(booking.bookingDate).toLocaleDateString()
    }));
    
    setBookings(bookingsWithFormattedDates);
  } catch (err) {
    setError(err.message);
  }
};

  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchBookings();
  };

  return (
    <div className="admin-bookings">
      <h1>Управление записями</h1>
      
      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Все</option>
          <option value="pending">Ожидающие</option>
          <option value="confirmed">Подтвержденные</option>
          <option value="in_progress">В работе</option>
          <option value="completed">Завершенные</option>
        </select>
        
        <input 
          type="date" 
          value={dateFilter} 
          onChange={(e) => setDateFilter(e.target.value)} 
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Трек-код</th>
            <th>Клиент</th>
            <th>Услуга</th>
            <th>Дата</th>
            <th>Время</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td>{booking.trackingCode}</td>
              <td>{booking.userName}<br/>{booking.userPhone}</td>
              <td>{booking.serviceName}</td>
              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>{booking.bookingTime}</td>
              <td>{booking.formattedDate}</td>
              <td>{getStatusText(booking.status)}</td>
              <td>
                <select 
                  value={booking.status} 
                  onChange={(e) => updateStatus(booking._id, e.target.value)}
                >
                  <option value="pending">Ожидание</option>
                  <option value="confirmed">Подтверждено</option>
                  <option value="in_progress">В работе</option>
                  <option value="completed">Завершено</option>
                  <option value="canceled">Отменено</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ... getStatusText функция

export default AdminBookings;