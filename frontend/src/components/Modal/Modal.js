import React from "react";
import "./Modal.css"

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-container" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <p className="modal__text">Ваше сообщение успешно отправлено</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default Modal;