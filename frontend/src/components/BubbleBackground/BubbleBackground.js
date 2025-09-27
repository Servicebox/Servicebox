import React, { useEffect, useRef } from "react";
import "./BubbleBackground.css";

function BubbleBackground() {
  const bubbleRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Плавная анимация с requestAnimationFrame
  const animateBubble = () => {
    if (bubbleRef.current) {
      bubbleRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
    }
    animationRef.current = requestAnimationFrame(animateBubble);
  };

  useEffect(() => {
    // Запускаем анимацию
    animationRef.current = requestAnimationFrame(animateBubble);

    const handleMove = (clientX, clientY) => {
      // Обновляем целевую позицию
      positionRef.current = { x: clientX - 100, y: clientY - 100 }; // центрируем посередине пузыря
    };

    const mouseMove = (e) => handleMove(e.clientX, e.clientY);
    const touchMove = (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault(); // предотвращаем скролл при свайпе
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('touchmove', touchMove, { passive: false });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('touchmove', touchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="bubble-background">
      <div 
        ref={bubbleRef} 
        className="bubble"
        aria-hidden="true"
      >
        <div className="bubble__rainbow"></div>
        <div className="bubble__white"></div>
        <div className="bubble__bright-circle bubble__bright-circle--first"></div>
        <div className="bubble__bright-circle bubble__bright-circle--second"></div>
        <div className="bubble__brightness bubble__brightness--first"></div>
        <div className="bubble__brightness bubble__brightness--second"></div>
      </div>
    </div>
  );
}

export default BubbleBackground;