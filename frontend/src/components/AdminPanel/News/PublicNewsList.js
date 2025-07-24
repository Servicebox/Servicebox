import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './NewsStyles.css';

const PublicNewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/api/news');
        if (response.data?.success) {
          setNews(response.data.data);
        } else {
          setError('Ошибка загрузки новостей');
        }
      } catch (err) {
        setError('Ошибка при загрузке: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div className="news-loading">Загрузка новостей...</div>;
  if (error) return <div className="news-error">{error}</div>;

  return (
    <div className="news-page">
      <h2 className="animated-title ">Новости</h2>
      <div className="news-grid">
        {news.map(item => (
          <article key={item._id} className="news-card">
            <Link to={`/news/${item._id}`} className="news-link">
              {item.image && (
                <div className="news-image-wrapper">
                  <img
                    src={`https://servicebox35.pp.ru/uploads/${item.image}`}
                    alt={item.title}
                    className="news-card-image"
                  />
                </div>
              )}
              <div className="news-card-content">
                <h2 className="news-card-title">{item.title}</h2>
                <p className="news-card-excerpt">
                  {item.content.substring(0, 150)}...
                </p>
                <div className="news-card-footer">
                  <time className="news-card-date">
                    {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                  </time>
                  <span className="read-more">Подробнее →</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PublicNewsList;