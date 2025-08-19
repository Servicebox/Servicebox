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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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

  const openFullscreen = (imageUrl, description) => {
    setCurrentImage({ url: imageUrl, description });
    setIsFullscreen(true);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setCurrentImage(null);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Закрытие по клавише Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        closeFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  if (loading) return <div className="news-loading">Загрузка новости...</div>;
  if (error) return <div className="news-error">{error}</div>;
  if (!newsItem) return <div className="news-error">Новость не найдена</div>;

  return (
    <div className="news-detail-page">
      {isFullscreen && currentImage && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <div 
            className="fullscreen-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="fullscreen-controls">
              <button className="control-btn" onClick={handleZoomIn}>
                <i className="zoom-in-icon">+</i>
              </button>
              <button className="control-btn" onClick={handleZoomOut}>
                <i className="zoom-out-icon">-</i>
              </button>
              <button className="control-btn" onClick={handleResetZoom}>
                <i className="reset-icon">⟳</i>
              </button>
              <button className="control-btn close-btn" onClick={closeFullscreen}>
                <i className="close-icon">×</i>
              </button>
            </div>
            
            <div 
              className="image-container"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={currentImage.url}
                alt={currentImage.description || 'Изображение новости'}
                style={{
                  transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                  cursor: zoomLevel > 1 ? 'grab' : 'default'
                }}
                className="zoomed-image"
              />
            </div>
            
            {currentImage.description && (
              <div className="image-caption">{currentImage.description}</div>
            )}
          </div>
        </div>
      )}


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
                  onClick={() => openFullscreen(`https://servicebox35.pp.ru/uploads/${block.media}`, block.description)}
                  className="clickable-image"
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
       <button onClick={() => navigate(-1)} className="back-button">
        ← Назад к списку
      </button>
    </div>
  );
};

export default NewsDetail;