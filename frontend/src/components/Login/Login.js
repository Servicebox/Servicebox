import React from "react"
import Form from "../Form/Form"
import useForm from "../hooks/useForm"
import { EMAIL_REGEX } from "../utils/constants"
import "./Login.css"

function Login({ onAuthorization, isLoading }) {
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  function editProfileInfo(event) {
    event.preventDefault()
    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      registrationPrompt="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
      isLoading={isLoading}
      isDisabledButton={!isFormValid}
      onSubmit={editProfileInfo}
    >
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          type="email"
          placeholder="почта"
          value={enteredValues.email || ""}
          onChange={handleChangeInput}
          pattern={EMAIL_REGEX}
          required
        />
        <span className="form__input-error">{errors.email}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          name="password"
          className="form__input"
          type="password"
          minLength="4"
          maxLength="10"
          placeholder="пароль"
          value={enteredValues.password || ""}
          onChange={handleChangeInput}
          required
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Login