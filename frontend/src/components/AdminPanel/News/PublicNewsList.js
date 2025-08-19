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

  // Функция для получения первого изображения из блоков контента
  const getFirstImage = (contentBlocks) => {
    if (!contentBlocks) return null;
    const imageBlock = contentBlocks.find(block => block.type === 'image');
    return imageBlock ? imageBlock.media : null;
  };

  // Функция для получения текстового контента из блоков
  const getContentExcerpt = (contentBlocks) => {
    if (!contentBlocks) return '';
    
    // Собираем весь текст из текстовых блоков
    const textContent = contentBlocks
      .filter(block => block.type === 'text' && block.content)
      .map(block => block.content)
      .join(' ');
    
    // Обрезаем до 150 символов
    return textContent.length > 150 
      ? textContent.substring(0, 150) + '...' 
      : textContent;
  };

  if (loading) return <div className="news-loading">Загрузка новостей...</div>;
  if (error) return <div className="news-error">{error}</div>;

  return (
    <div className="news-page">
      <h2 className="animated-title">Новости</h2>
      <div className="news-grid">
        {news.map(item => {
          const firstImage = getFirstImage(item.contentBlocks);
          const excerpt = getContentExcerpt(item.contentBlocks);
          
          return (
            <article key={item._id} className="news-card">
              <Link to={`/news/${item._id}`} className="news-link">
                {firstImage && (
                  <div className="news-image-wrapper">
                    <img
                      src={`https://servicebox35.pp.ru/uploads/${firstImage}`}
                      alt={item.title}
                      className="news-card-image"
                    />
                  </div>
                )}
                <div className="news-card-content">
                  <h2 className="news-card-title">{item.title}</h2>
                  {excerpt && (
                    <p className="news-card-excerpt">
                      {excerpt}
                    </p>
                  )}
                  <div className="news-card-footer">
                    <time className="news-card-date">
                      {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                    </time>
                    <span className="read-more">Подробнее →</span>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default PublicNewsList;