import './Form.css';
import CloseIcon from "../../images/x.svg";
import { useState } from 'react';

const Form = ({ toggleForm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [formValid, setFormValid] = useState(false);

  const changeName = (e) => {
    setName(e.target.value);
    const re = /^([а-я]{1}[а-яё]{2,23}|[a-z]{1}[a-z]{2,23})$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setNameError('Некорректное имя');
    } else {
      setNameError('');
    }
    validateForm();
  };

  const changeHandlerPhone = (e) => {
    setPhone(e.target.value);
    const re = /^(\+?7|8)?[-(]?\d{3}[-)]?\d{3}[-]?\d{2}[-]?\d{2}$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setPhoneError('Некорректный номер телефона');
    } else {
      setPhoneError('');
    }
    validateForm();
  };

  const changeHandlerDescription = (e) => {
    setDescription(e.target.value);
  };

  const submitData = (e) => {
    e.preventDefault();
    if (!name || !phone || nameError || phoneError) {
      return; // Не отправляем форму если есть ошибки или поля не заполнены
    }
    console.log("Form submitted:", { name, phone, description });
  };

  const validateForm = () => {
    if (name && phone && !nameError && !phoneError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2 className="form__title">
          Оставьте заявку на <span className="besplatnaya">бесплатную</span> консультацию
        </h2>
        <form className="form" onSubmit={submitData}>
          {nameError && <div className="error1">{nameError}</div>}
          <label className="form__label">
            <input
              className="form__input"
              type="text"
              value={name}
              onChange={changeName}
              placeholder="Введите ваше имя:"
            />
          </label>
          {phoneError && <div className="error3">{phoneError}</div>}
          <label className="form__label">
            <input
              className="form__input"
              onChange={changeHandlerPhone}
              type="text"
              value={phone}
              placeholder="Введите номер телефона:"
            />
          </label>
          <label className="form__label">
            <textarea
              className="form__text"
              onChange={changeHandlerDescription}
              placeholder="Опишите вашу проблему..."
              value={description}
              cols="30"
              rows="3"
            ></textarea>
          </label>
          <button className="form-overlay__btn" type="submit" disabled={!formValid}>
            Отправить форму
          </button>
        </form>
        <button className="close-button" onClick={toggleForm}>
          <img className="close-button__img" src={CloseIcon} alt="Закрыть" />
        </button>
      </div>
    </div>
  );
};

export default Form;