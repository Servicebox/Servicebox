
import React, { useEffect } from "react";
import './ImageModal.css';

const ImageModal = ({ image, onClose }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!image) return null;

  return (
    <div className="modal" onClick={onClose}>
      <span className="cancel" onClick={onClose}>&times;</span>
      <img src={image.filePath} alt={image.description} className="modal-content" />
      <div className="caption">{image.description}</div>
    </div>
  );
};

export default ImageModal;