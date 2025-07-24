import React, { useEffect, useState } from 'react';
import './ImageModal.css';

const PLACEHOLDER = "data:image/svg+xml;utf8,<svg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect fill='%23F1F1F1' width='400' height='400'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='%23b3b3b3'>Нет фото</text></svg>";

const ImageModal = ({ group, currentIndex, onClose, onNavigate }) => {
  const [zoomed, setZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };

    const handleOrientationChange = () => {
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [onClose, onNavigate]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (diff > 50) onNavigate('next'); // Свайп влево
    if (diff < -50) onNavigate('prev'); // Свайп вправо
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="modal-content__img" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>

        <div className="image-container__foto">
          <img
            className={`modal-image__foto ${zoomed ? 'zoomed' : ''}`}
            onClick={() => setZoomed(!zoomed)}
            src={`https://servicebox35.pp.ru${group.images[currentIndex].filePath}`}
            alt={group.description}
            onError={e => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
          />
        </div>

        <div className="navigation-controls">
          <button
            className="nav-button prev"
            onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
            disabled={currentIndex === 0}
          >
            ‹
          </button>

          <div className="image-counter">
            {currentIndex + 1} / {group.images.length}
          </div>

          <button
            className="nav-button next"
            onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
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
              onClick={(e) => { 
                e.stopPropagation(); 
                onNavigate(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;