import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import { EMAIL_REGEX } from "../utils/constants"
import useForm from "../hooks/useForm"

function Register({ isLoading, getRegistrationUser }) {
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  function editProfileInfo(e) {
    e.preventDefault()
    getRegistrationUser({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      registrationPrompt="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin"
      onSubmit={editProfileInfo}
      isLoading={isLoading}
      isDisabledButton={!isFormValid}
    >
      <label className="form__label">
        Имя
        <input
          name="name"
          className="form__input"
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
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          type="email"
          value={enteredValues.email || ""}
          onChange={handleChangeInput}
          pattern={EMAIL_REGEX}
          placeholder="yandex@yandex.ru"
          required
        />
        <span className="form__input-error">{errors.email}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          name="password"
          className="form__input form__input-data_error"
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
    </Form>
  )
}

export default Register