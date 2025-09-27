import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NewsStyles.css';

const ListNews = () => {
  const [news, setNews] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/api/news');

        // Проверка структуры ответа
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setNews(response.data.data);
        } else {
          setError('Некорректный формат данных от сервера');
        }
      } catch (error) {
        setError('Ошибка при загрузке новостей: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://servicebox35.pp.ru/api/news/${id}`);
      setNews(prevNews => prevNews.filter(item => item._id !== id));
      showAlert('Новость успешно удалена', 'success');
    } catch (error) {
      console.error('Error deleting news:', error);
      showAlert('Ошибка при удалении новости: ' + error.message, 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  if (loading) {
    return <div className="loading">Загрузка новостей...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="list-news">
      <h1>Список Новостей</h1>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      {news.length > 0 ? (
        <ul className="news-list">
     // ListNews.js
          {news.map((item) => (
            <li key={item._id} className="news-item">
              <div className="news-content">
                <h3>{item.title}</h3>
                <p className="news-content-text">{item.content}</p> 

                {item.image && (
                  <img
                    src={`https://servicebox35.pp.ru/uploads/${item.image}`}
                    alt={item.title}
                    className="news-image"
                  />
                )}

                <div className="news-actions">
                  <Link
                    to={`/admin-panel/update-news/${item._id}`}
                    className="btn-edit"
                  >
                    Редактировать
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn-delete"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-list">Новостей пока нет</div>
      )}
    </div>
  );
};

export default ListNews;