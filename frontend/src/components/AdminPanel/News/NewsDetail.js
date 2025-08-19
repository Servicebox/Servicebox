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
  if (!newsItem) return <div className="news-error">Новость не найдена</div>;

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

        {newsItem.contentBlocks && newsItem.contentBlocks.map((block, index) => (
          <div key={index} className="content-block">
            {block.type === 'text' && (
              <div className="text-content">
                {block.content.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}
            
            {block.type === 'image' && block.media && (
              <figure className="news-detail-image">
                <img
                  src={`https://servicebox35.pp.ru/uploads/${block.media}`}
                  alt={block.description || newsItem.title}
                />
                {block.description && (
                  <figcaption>{block.description}</figcaption>
                )}
              </figure>
            )}
            
            {block.type === 'video' && block.media && (
              <div className="news-video-wrapper">
                <video controls className="news-video">
                  <source
                    src={`https://servicebox35.pp.ru/uploads/${block.media}`}
                    type={block.mediaType || 'video/mp4'}
                  />
                  Ваш браузер не поддерживает видео тег.
                </video>
                {block.description && (
                  <p className="video-description">{block.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </article>
    </div>
  );
};

export default NewsDetail;