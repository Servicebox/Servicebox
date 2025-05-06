import React, { useEffect, useState, useRef } from "react";
import "./Form.css";
import CloseIcon from "../../images/x.svg";
import Modal from "../Modal/Modal";

const initialState = { name: "", phone: "", description: "" };

export default function Form({ onClose }) {
  const [values, setValues] = useState(initialState);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRefs = {
    name: useRef(null),
    phone: useRef(null),
    description: useRef(null),
  };

  // Валидация
  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  // esc закрывает
  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  function validate(v) {
    const err = {};
    if (!v.name.trim()) err.name = "Имя не может быть пустым";
    else if (!/^([а-яёa-z]{2,})$/i.test(v.name)) err.name = "Только буквы, минимум 2 символа";
    if (!v.phone.trim()) err.phone = "Телефон не может быть пустым";
    else if (!/^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(v.phone.trim())) err.phone = "Некорректный номер";
    return err;
  }

  const isValid = Object.keys(errors).length === 0 && values.name && values.phone;

  const onChange = e => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onBlur = e => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const onFocus = e => {
    // Подсветка реализована через CSS :focus, но если нужно сюда можно добавить логику
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (!isValid) return;
    setIsLoading(true);
    setSubmitError("");
    try {
      const res = await fetch("https://servicebox35.pp.ru/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await res.json();
      if (result.status === "ok") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setValues(initialState);
          onClose(); // закрываем форму
        }, 1200);
      } else {
        setSubmitError(result.message || "Ошибка при отправке");
      }
    } catch (e) {
      setSubmitError("Ошибка соединения");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="form-overlay">
      <div className="form-container" tabIndex={-1}>
        <h2 className="form__title">
          Оставьте заявку на <span className="besplatnaya">бесплатную</span> консультацию
        </h2>
        <form className="form" onSubmit={handleSubmit} autoComplete="off">
          <label className="form__label">
            <input
              className={`form__input${touched.name && errors.name ? " form__error" : ""}`}
              ref={inputRefs.name}
              type="text"
              maxLength={24}
              name="name"
              value={values.name}
              placeholder="Введите Ваше имя"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              autoFocus
            />
            <span className="form__placeholder">Имя</span>
          </label>
          {touched.name && errors.name && <div className="error-msg">{errors.name}</div>}

          <label className="form__label">
            <input
              className={`form__input${touched.phone && errors.phone ? " form__error" : ""}`}
              ref={inputRefs.phone}
              type="text"
              maxLength={18}
              name="phone"
              value={values.phone}
              placeholder="Введите номер телефона"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
            />
            <span className="form__placeholder">Телефон</span>
          </label>
          {touched.phone && errors.phone && <div className="error-msg">{errors.phone}</div>}

          <label className="form__label">
            <textarea
              className="form__input"
              ref={inputRefs.description}
              name="description"
              value={values.description}
              placeholder="Опишите Вашу проблему..."
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              rows={3}
              maxLength={300}
              style={{ resize: "none" }}
            />
            <span className="form__placeholder">Комментарий</span>
          </label>

          <button
            className={`form-overlay__btn${isValid ? " active" : ""}`}
            type="submit"
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Отправка..." : "Отправить форму"}
          </button>
        </form>
        <button className="close-button" type="button" aria-label="Закрыть" onClick={onClose}>
          <img className="close-button__img" src={CloseIcon} alt="Закрыть" />
        </button>

        {submitError && (
          <Modal onClose={() => setSubmitError("")}>
            <h3>Ошибка</h3>
            <p>{submitError}</p>
            <button type="button" onClick={() => setSubmitError("")}>
              Закрыть
            </button>
          </Modal>
        )}

        {success && (
          <Modal onClose={onClose}>
            <p className="success-text">Ваше сообщение успешно отправлено!</p>
          </Modal>
        )}
      </div>
    </div>
  );
}