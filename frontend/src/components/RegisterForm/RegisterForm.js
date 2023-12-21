import React from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css";

function RegisterForm({
  title,
  children,
  linkText,
  buttonText,
  isLoading,
  link,
  onSubmit,
  registrationPrompt,
  isDisabledButton,
}) {
  return (
    <div className="form__block">
      <h3 className="form__title-one">{title}</h3>
      <form onSubmit={onSubmit} id="registerform" className="register-form" noValidate>
        {children}

        <button
          type="submit"
          className={
            isDisabledButton || isLoading
              ? "form__button-save form__button-save_inactive"
              : "form__button-save"
          }
          disabled={isDisabledButton ? true : false}
        >
          {buttonText}
        </button>
      </form>
      <p className="form__text">
        {registrationPrompt}
        <Link to={link} className="form__link">
          {linkText}
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;