import React, { useEffect, useState } from 'react';
import './ImageModal.css';

const ImageModal = ({ group, currentIndex, onClose, onNavigate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate]);

  return (
      <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="image-container">
          <img
  src={`https://servicebox35.pp.ru${group.images[currentIndex].filePath}`}
  alt={group.description}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/placeholder.jpg'; // Добавьте fallback изображение
  }}
/>
        </div>

        <div className="navigation-controls">
          <button 
            className="nav-button prev" 
            onClick={() => onNavigate('prev')}
            disabled={currentIndex === 0}
          >
            ‹
          </button>
          
          <div className="image-counter">
            {currentIndex + 1} / {group.images.length}
          </div>

          <button
            className="nav-button next"
            onClick={() => onNavigate('next')}
            disabled={currentIndex === group.images.length - 1}
          >
            ›
          </button>
        </div>

        <div className="group-description">
          {group.description}
        </div>
          <div className="pagination-dots">
          {group.images.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;