import './Form.css';
import CloseIcon from "../../images/x.svg";
import { useState, useEffect } from 'react';

const Form = ({ toggleForm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const [nameDirty, setNameDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [phoneError, setPhoneError] = useState('Телефон не может быть пустым');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (phoneError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [phoneError, nameError]);

  const changeName = (e) => {
    setName(e.target.value);
    const re = /^([а-я]{1}[а-яё]{2,23}|[a-z]{1}[a-z]{2,23})$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setNameError('Некорректное имя');
    } else {
      setNameError('');
    }
  };

  const changeHandlerPhone = (e) => {
    setPhone(e.target.value);
    const re = /^\+?[78][-(]?\d{3}[-)]?\d{3}[-]?\d{2}[-]?\d{2}$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setPhoneError('Некорректный номер телефона');
    } else {
      setPhoneError('');
    }
  };

  const changeHandlerDescription = (e) => {
    setDescription(e.target.value);
  };

  const submitData = (e) => {
    e.preventDefault();
    sendMsg({ name, phone, description })
      .then(response => {
        // Handle the response
      })
      .catch(error => console.error(error));
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'phone':
        setPhoneDirty(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2 className="form__title">
          Оставьте заявку на <span className="besplatnaya">бесплатную</span> консультацию
        </h2>
        <form className="form" onSubmit={submitData}>
          {nameDirty && nameError && <div className="error1">{nameError}</div>}
          <label className="form__label">
            <input
              className="form__input"
              type="text"
              value={name}
              name="name"
              onChange={changeName}
              onBlur={blurHandler}
              placeholder="Введите ваше имя:"
            />
          </label>
          {phoneDirty && phoneError && <div className="error3">{phoneError}</div>}
          <label className="form__label">
            <input
              className="form__input"
              onChange={changeHandlerPhone}
              onBlur={blurHandler}
              type="text"
              value={phone}
              name="phone"
              placeholder="Введите номер телефона:"
            />
          </label>
          <label className="form__label">
            <textarea
              className="form__text"
              onChange={changeHandlerDescription}
              name="description"
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