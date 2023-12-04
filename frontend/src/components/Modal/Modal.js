import React from "react";
import "./Modal.css"

const Modal = ({ message }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;