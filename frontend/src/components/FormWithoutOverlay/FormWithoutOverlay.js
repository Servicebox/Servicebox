import React, { useEffect, useState } from 'react';
import './FormWithoutOverlay.css';
import Modal from "../Modal/Modal";
import СloseIcon from "../../images/x.svg";

const FormWithoutOverlay = ({ toggleForm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const [nameDirty, setNameDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [phoneError, setPhoneError] = useState('Телефон не может быть пустым');

  const [formValid, setFormValid] = useState(false);
  const [successSubmit, setSuccessSubmit] = useState(false); // состояние для успешной отправки
  const [errorSubmit, setErrorSubmit] = useState(false); // состояние для неудачной отправки


  useEffect(() => {
    if (phoneError || nameError || !name || !phone) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [phoneError, nameError, name, phone]);

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
    const re = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setPhoneError('Некорректный номер телефона');
    } else {
      setPhoneError('');
    }
  };

  const changeHandlerDescription = (e) => {
    setDescription(e.target.value);
  };

  const [submitError, setSubmitError] = useState('');

  const submitData = (e) => {
    e.preventDefault();
    fetch('https://servicebox35.pp.ru/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, description }),
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'ok') {
        setSuccessSubmit(true); // Устанавливаем состояние успешной отправки в true
        toggleForm(); 
      } else {
        setErrorSubmit(true); // Устанавливаем состояние неудачной отправки в true
        setSubmitError(result.message || 'Произошла ошибка при отправке формы');
      }
    })
    .catch((error) => {
        setErrorSubmit(true); // Устанавливаем состояние неудачной отправки в true
        setSubmitError('Ошибка соединения с сервером');
      });
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
  const UPDATE = ({target, x, y }) => {
    const bounds = target.getBoundingClientRect();
    target.style.setProperty('--x', x - bounds.left);
    target.style.setProperty('--y', y - bounds.top);
  };

  useEffect(() => {
    const BTNS = document.querySelectorAll('button');
    BTNS.forEach(BTN => BTN.addEventListener('pointermove', UPDATE));
    return () => {
      BTNS.forEach(BTN => BTN.removeEventListener('pointermove', UPDATE));
    };
  }, []);

  return (
    <div className="form" onKeyDown={(e) => e.key === 'Enter' && submitData(e)}>
      <div className="form__container">
        <h2 className="form__title">
          Оставьте заявку на <span className="besplatnaya">бесплатную</span> консультацию
        </h2>
        <form className="form__with" onSubmit={submitData}>
          {(nameDirty && nameError) && <div className="error2">{nameError}</div>}
          <label className="form__label">
            <input
              className="form__input"
              type="text"
              value={name}
              name="name"
              onChange={changeName}
              onBlur={blurHandler}
              placeholder="Введите Ваше имя:"
            />
          </label>
          {(phoneDirty && phoneError) && <div className="error4">{phoneError}</div>}
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
              placeholder="Опишите Вашу проблему..."
              value={description}
              cols="30"
              rows="3"
            ></textarea>
          </label>
          <button className="form-btn" disabled={!formValid} type="submit">
            Отправить форму
          </button>
        </form>
        {successSubmit && ( // модальное окно при успешной отправке
         <Modal onClose={() => setSuccessSubmit(false)}>
            <h3>Успешная отправка формы</h3>
            <p>Ваша форма успешно отправлена</p>
            <button onClick={() => setSuccessSubmit(false)}>Закрыть</button>
          </Modal>
        )}
         {errorSubmit && ( // модальное окно при неудачной отправке
          <Modal onClose={() => setErrorSubmit(false)}>
          <h3>Ошибка отправки формы</h3>
          <p>{submitError}</p>
          <button onClick={() => setErrorSubmit(false)}>Закрыть</button>
        </Modal>
           )}
      </div>
    </div>
  );
};

export default FormWithoutOverlay;