import React, { useState, useContext, useEffect } from "react";
import "./Profile.css";
import { Link } from "react-router-dom"
import  CurrentUserContext  from "../contexts/CurrentUserContext"
import Header from "../Header/Header"
import { EMAIL_REGEX } from "../utils/constants"
import useForm from "../hooks/useForm"


function Profile({ loggedIn, isLoading, onUpdateUser, signOut }) {
  const currentUser = useContext(CurrentUserContext)

  const { enteredValues, errors, handleChangeInput, isFormValid, resetForm } =
    useForm()

  const [isLastValues, setIsLastValues] = useState(false)

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm])

  function editProfileInfo(e) {
    e.preventDefault()
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    })
  }

  useEffect(() => {
    if (
      currentUser.name === enteredValues.name &&
      currentUser.email === enteredValues.email
    ) {
      setIsLastValues(true)
    } else {
      setIsLastValues(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h3 className="profile__title">Привет, {currentUser.name}!</h3>
        <form
          id="form"
          className="profile__form"
          onSubmit={editProfileInfo}
          noValidate
        >
          <div className="profile__form-item">
          <label className="profile__form-label">
            Имя
            <input
              name="name"
              className="profile__input"
              type="text"
              minLength="2"
              maxLength="20"
              onChange={handleChangeInput}
              value={enteredValues.name || ""}
              placeholder="Виталий"
              required
            />
            
            <span className="profile__input-error">{errors.name}</span>
          </label>
          </div>

          <div className="profile__border"></div>
          <div className="profile__form-item">
          <label className="profile__form-label">
            E-mail
            <input
              name="email"
              className="profile__input"
              type="email"
              onChange={handleChangeInput}
              pattern={EMAIL_REGEX}
              value={enteredValues.email || ""}
              placeholder="yandex@yandex.ru"
              required
            />
            <span className="profile__input-error">{errors.email}</span>
          </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid ? true : false}
            className={
              !isFormValid || isLoading || isLastValues
                ? "profile__button-save form__button-save_inactive"
                : "profile__button-save"
            }
          >
            Редактировать
          </button>

          <Link to="/profile" className="profile__exit-link" onClick={signOut}>
            <button type="button" className="profile__exit-button">
              Выйти из аккаунта
            </button>
          </Link>
        </form>
      </section>
    </>
  )
}

export default Profile