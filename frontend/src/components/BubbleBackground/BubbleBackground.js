import React, { useRef, useEffect } from "react";
import "./BubbleBackground.css"; 

function BubbleBackground() {
  const bubbleRef = useRef(null);

  useEffect(() => {
   
    const bubble = document.getElementById('bubble');
    const mouseFunction = (e) => {
      let clientX = 0;
      let clientY = 0;
      if (e.clientX) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      bubble.style.setProperty('--top', `${clientY}px`);
      bubble.style.setProperty('--left', `${clientX}px`);
    };

    window.addEventListener('mousemove', mouseFunction);
    window.addEventListener('touchmove', mouseFunction);

    return () => {
      window.removeEventListener('mousemove', mouseFunction);
      window.removeEventListener('touchmove', mouseFunction);
    };
  }, [bubbleRef]);

  return (
    <div className="nav-bubble" >
    <div ref={bubbleRef} className="bubble" id="bubble" style={{ "--top": "50vh", "--left": "50vw" }}>
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