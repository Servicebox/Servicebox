import React, { useEffect, useCallback } from "react";
import "./ImageModal.css";

const ImageModal = ({ image, onClose }) => {
  const handleKeyPress = useCallback((e) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal">
        <img src={`https://servicebox35.pp.ru${image.filePath}`} alt={image.description} />
        <button className="close-modal" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default ImageModal;