import React from "react"
import "../InfoToolTip/InfoToolTip.css"

function UpdateProfileInfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onCloseOverlay}
    >
      <div className="popup__container">
        {props.isUpdate ? (
          <>
            <p className="popup__signup-title">
              Редактирование прошло успешно!
            </p>
          </>
        ) : (
          <>
            <p className="popup__signup-title">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
      
    </div>
  )
}

export default UpdateProfileInfoTooltip