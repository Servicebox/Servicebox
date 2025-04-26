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
  const UPDATE = ({ target, x, y }) => {
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
        <form action='' className="form" onSubmit={submitData}>
          {(nameDirty && nameError) && <div className="error2">{nameError}</div>}
          <label className="form__label">
            <input
              className="input"
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
              className="input"
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
              className="input"
              onChange={changeHandlerDescription}
              name="description"
              placeholder="Опишите Вашу проблему..."
              value={description}
              cols="30"
              rows="3"
            ></textarea>
          </label>
          <button className="login-button" disabled={!formValid} type="submit">
            Отправить форму
          </button>
        </form>
        <div className="social-account-container">
          <button className="social-account-container">
            <ul className="example">
              <li className="icon-content_soshial">
                <a
                  className="link"
                  data-social="telegram"
                  aria-label="Telegram"
                  href="tg://resolve?domain=@Tomkka"
                >
                  <svg viewBox="0 0 100 100" version="1.1" className='icon-content'>
                    <path
                      fill="currentColor"
                      d="M95,9.9c-1.3-1.1-3.4-1.2-7-0.1c0,0,0,0,0,0c-2.5,0.8-24.7,9.2-44.3,17.3c-17.6,7.3-31.9,13.7-33.6,14.5  c-1.9,0.6-6,2.4-6.2,5.2c-0.1,1.8,1.4,3.4,4.3,4.7c3.1,1.6,16.8,6.2,19.7,7.1c1,3.4,6.9,23.3,7.2,24.5c0.4,1.8,1.6,2.8,2.2,3.2  c0.1,0.1,0.3,0.3,0.5,0.4c0.3,0.2,0.7,0.3,1.2,0.3c0.7,0,1.5-0.3,2.2-0.8c3.7-3,10.1-9.7,11.9-11.6c7.9,6.2,16.5,13.1,17.3,13.9  c0,0,0.1,0.1,0.1,0.1c1.9,1.6,3.9,2.5,5.7,2.5c0.6,0,1.2-0.1,1.8-0.3c2.1-0.7,3.6-2.7,4.1-5.4c0-0.1,0.1-0.5,0.3-1.2  c3.4-14.8,6.1-27.8,8.3-38.7c2.1-10.7,3.8-21.2,4.8-26.8c0.2-1.4,0.4-2.5,0.5-3.2C96.3,13.5,96.5,11.2,95,9.9z M30,58.3l47.7-31.6  c0.1-0.1,0.3-0.2,0.4-0.3c0,0,0,0,0,0c0.1,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2-0.1c-0.1,0.1-0.2,0.4-0.4,0.6L66,38.1  c-8.4,7.7-19.4,17.8-26.7,24.4c0,0,0,0,0,0.1c0,0-0.1,0.1-0.1,0.1c0,0,0,0.1-0.1,0.1c0,0.1,0,0.1-0.1,0.2c0,0,0,0.1,0,0.1  c0,0,0,0,0,0.1c-0.5,5.6-1.4,15.2-1.8,19.5c0,0,0,0,0-0.1C36.8,81.4,31.2,62.3,30,58.3z"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </button>
        </div>
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
            <button

              onClick={() => setErrorSubmit(false)}>
              Закрыть
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default FormWithoutOverlay;