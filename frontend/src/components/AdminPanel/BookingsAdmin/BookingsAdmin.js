// components/admin/BookingsAdmin.jsx
import React, { useState, useEffect } from 'react';
import './BookingsAdmin.css';

const API_URL = "https://servicebox35.pp.ru/api"; // Добавлен базовый URL

const BookingsAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    search: ''
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Функция для авторизованных запросов
  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('auth-token'); // Исправлено на 'auth-token'
    const headers = options.headers || {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'application/json';
    }
    
    const newOptions = { ...options, headers };
    return fetch(url, newOptions);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, filters]);

  const fetchBookings = async () => {
    try {
      const response = await fetchWithAuth(`${API_URL}/bookings`); // Используем единый API_URL
      if (!response.ok) throw new Error('Ошибка загрузки записей');
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let result = [...bookings];
    
    if (filters.status !== 'all') {
      result = result.filter(b => b.status === filters.status);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(b => 
        b.userName.toLowerCase().includes(searchLower) ||
        b.userPhone.includes(searchLower) ||
        b.trackingCode.toLowerCase().includes(searchLower) ||
        b.serviceName.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredBookings(result);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetchWithAuth(
        `${API_URL}/bookings/${id}`, // Исправлен URL
        {
          method: 'PATCH',
          body: JSON.stringify({ status: newStatus })
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка обновления статуса');
      }
      
      const updatedBooking = await response.json();
      
      setBookings(prev => 
        prev.map(booking => 
          booking._id === id ? updatedBooking : booking
        )
      );
    } catch (err) {
      console.error('Ошибка обновления статуса:', err);
      setError(err.message);
    }
  };

  const openDetails = (booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => setIsDetailsOpen(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="loading">Загрузка записей...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="bookings-admin">
      <h1>Управление записями</h1>
      
      <div className="filters">
        <div className="filter-group">
          <label>Статус:</label>
          <select 
            name="status" 
            value={filters.status} 
            onChange={handleFilterChange}
          >
            <option value="all">Все</option>
            <option value="pending">Ожидают</option>
            <option value="confirmed">Подтверждены</option>
            <option value="in_progress">В работе</option>
            <option value="completed">Завершены</option>
            <option value="canceled">Отменены</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Поиск:</label>
          <input 
            type="text" 
            name="search" 
            value={filters.search} 
            onChange={handleFilterChange}
            placeholder="Поиск по записям..."
          />
        </div>
      </div>
      
      <div className="bookings-list">
        {filteredBookings.length === 0 ? (
          <div className="empty">Записи не найдены</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Код</th>
                <th>Клиент</th>
                <th>Услуга</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.trackingCode}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.serviceName}</td>
                  <td>
                    <span className="status-badge" style={{ backgroundColor: getStatusColor(booking.status) }}>
                      {getStatusLabel(booking.status)}
                    </span>
                  </td>
                  <td className="actions">
                    <select
                      value={booking.status}
                      onChange={(e) => updateStatus(booking._id, e.target.value)}
                    >
                      <option value="pending">Ожидает</option>
                      <option value="confirmed">Подтверждена</option>
                      <option value="in_progress">В работе</option>
                      <option value="completed">Завершена</option>
                      <option value="canceled">Отменена</option>
                    </select>
                    
                    <button className="btn-details" onClick={() => openDetails(booking)}>
                      Подробнее
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {isDetailsOpen && selectedBooking && (
        <div className="modal-overlay">
          <div className="booking-details-modal">
            <button className="close-modal" onClick={closeDetails}>×</button>
            <h2>Детали записи #{selectedBooking.trackingCode}</h2>
            
            <div className="details-grid">
              <div className="detail-item">
                <label>Клиент:</label>
                <span>{selectedBooking.userName}</span>
              </div>
              <div className="detail-item">
                <label>Телефон:</label>
                <span>{selectedBooking.userPhone}</span>
              </div>
              <div className="detail-item">
                <label>Email:</label>
                <span>{selectedBooking.userEmail || 'не указан'}</span>
              </div>
              <div className="detail-item">
                <label>Услуга:</label>
                <span>{selectedBooking.serviceName}</span>
              </div>
              <div className="detail-item">
                <label>Устройство:</label>
                <span>{selectedBooking.deviceModel || 'не указано'}</span>
              </div>
              <div className="detail-item">
                <label>Заметки:</label>
                <span>{selectedBooking.notes || 'нет'}</span>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-contact" onClick={() => window.location.href = `tel:${selectedBooking.userPhone}`}>
                Позвонить клиенту
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Ожидает',
    confirmed: 'Подтверждена',
    in_progress: 'В работе',
    completed: 'Завершена',
    canceled: 'Отменена'
  };
  return labels[status] || status;
};

const getStatusColor = (status) => {
  const colors = {
    pending: '#f6c23e',
    confirmed: '#36b9cc',
    in_progress: '#4e73df',
    completed: '#1cc88a',
    canceled: '#e74a3b'
  };
  return colors[status] || '#6c757d';
};

export default BookingsAdmin;