import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const response = await axios.get(`https://servicebox35.pp.ru/api/news/${id}`);
        if (response.data?.success) {
          setNewsItem(response.data.data);
        } else {
          throw new Error('Новость не найдена');
        }
      } catch (err) {
        setError(err.message);
        setTimeout(() => navigate('/news'), 3000);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNewsItem();
  }, [id, navigate]);

  if (loading) return <div className="news-loading">Загрузка новости...</div>;
  if (error) return <div className="news-error">{error}</div>;

  return (
    <div className="news-detail-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Назад к списку
      </button>

      <article className="news-detail">
        <header className="news-detail-header">
          <h1 className="news-detail-title">{newsItem.title}</h1>
          <div className="news-detail-meta">
            <time className="news-detail-date">
              {new Date(newsItem.createdAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
          </div>
        </header>

        {newsItem.image && (
          <figure className="news-detail-image">
            <img
              src={`https://servicebox35.pp.ru/uploads/${newsItem.image}`}
              alt={newsItem.title}
            />
          </figure>
        )}

        <div
          className="news-detail-content"
          dangerouslySetInnerHTML={{ __html: newsItem.content.replace(/\n/g, '<br/>') }}
        />

        {newsItem.video && (
          <div className="news-video-wrapper">
            <video controls className="news-video">
              <source
                src={`https://servicebox35.pp.ru/uploads/${newsItem.video}`}
                type={`video/${newsItem.video.split('.').pop()}`}
              />
            </video>
          </div>
        )}
      </article>
    </div>
  );
};

export default NewsDetail;