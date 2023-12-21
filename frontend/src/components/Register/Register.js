import React from "react";
import "../Form/Form.css";
import RegisterForm from "../RegisterForm/RegisterForm";
import useForm from "../hooks/useForm";
import { EMAIL_REGEX } from "../utils/constants";

function Register({ isLoading, getRegistrationUser }) {
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm();

  function editProfileInfo(e) {
    e.preventDefault();
    getRegistrationUser({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    });
  }

  return (
      <RegisterForm
 title="Добро пожаловать!"
 buttonText="Зарегистрироваться"
 registrationPrompt="Уже зарегистрированы?"
 linkText=" Войти"
 link="/signin"
 onSubmit={editProfileInfo}
 isLoading={isLoading}
 isDisabledButton={!isFormValid}
>
 <label className="form__label-one">
   Имя
   <input
     name="name"
     className="form__input-one"
     type="text"
     minLength="2"
     maxLength="40"
     value={enteredValues.name || ""}
     onChange={handleChangeInput}
     placeholder="Виталий"
     required
   />
   <span className="form__input-error">{errors.name}</span>
 </label>
 <label className="form__label-one">
   E-mail
   <input
     name="email"
     className="form__input-one"
     type="email"
     value={enteredValues.email || ""}
     onChange={handleChangeInput}
     pattern={EMAIL_REGEX}
     placeholder="yandex@yandex.ru"
     required
   />
   <span className="form__input-error">{errors.email}</span>
 </label>
 <label className="form__label-one">
   Пароль
   <input
     name="password"
     className="form__inpu-one form__input-data_error"
     type="password"
     value={enteredValues.password || ""}
     onChange={handleChangeInput}
     placeholder="********"
     minLength="6"
     maxLength="16"
     required
   />
   <span className="form__input-error">{errors.password}</span>
 </label>
      </RegisterForm>
  );
}

export default Register;