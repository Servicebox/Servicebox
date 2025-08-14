import React, { useEffect, useState } from 'react';
import './FormWithoutOverlay.css';
import Modal from "../Modal/Modal";

const FormWithoutOverlay = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const [nameDirty, setNameDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successSubmit, setSuccessSubmit] = useState(false);
 const handleFocus = (field) => {
    if (field === 'name') setNameError('');
    if (field === 'phone') setPhoneError('');
  };

  useEffect(() => {
    const isNameValid = name.trim().length >= 2;
    const isPhoneValid = /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/.test(phone);
    
    setNameError(!isNameValid ? 'Минимум 2 буквы' : '');
    setPhoneError(!isPhoneValid ? 'Некорректный номер' : '');
    
    setFormValid(isNameValid && isPhoneValid);
  }, [name, phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');
    
    try {
      const response = await fetch('https://servicebox35.pp.ru/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, description })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSuccessSubmit(true);
        setName('');
        setPhone('');
        setDescription('');
        
        setTimeout(() => {
          setSuccessSubmit(false);
        }, 2000);
      } else {
        setSubmitError(result.message || 'Ошибка при отправке');
      }
    } catch (error) {
      setSubmitError('Ошибка соединения с сервером');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === 'name') setNameDirty(true);
    if (name === 'phone') setPhoneDirty(true);
  };

  return (
    <div className="form-container__gift">
      <div className="form-card__gift">
        <div className="form-header">
          <h2 className="form-title">
            <span className="highlight">Бесплатная</span> консультация
          </h2>
          <p className="form-subtitle">Оставьте заявку и наш специалист свяжется с вами в течение 15 минут</p>
        </div>
        
        <form onSubmit={handleSubmit} className="form-body">
          <div className={`form-group ${nameError && nameDirty ? 'error' : ''}`}>
            <label className="form-label">
              <input
                className="form-input"
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                onBlur={handleBlur}
                placeholder=" "
                onFocus={() => handleFocus('name')}
              />
              <span className="input-label">Ваше имя</span>
              {nameError && nameDirty && <div className="error-message">{nameError}</div>}
            </label>
          </div>
          
          <div className={`form-group ${phoneError && phoneDirty ? 'error' : ''}`}>
            <label className="form-label">
              <input
                className="form-input"
                type="tel"
                value={phone}
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                onBlur={handleBlur}
                placeholder=" "
                onFocus={() => handleFocus('name')}
              />
              <span className="input-label">Номер телефона</span>
              {phoneError && phoneDirty && <div className="error-message">{phoneError}</div>}
            </label>
          </div>
          
          <div className="form-group">
            <label className="form-label">
              <textarea
                className="form-textarea"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder=" "
                rows={3}
              />
              <span className="input-label">Опишите вашу проблему</span>
            </label>
          </div>
          
          <button 
            className={`submit-btn ${formValid ? 'active' : ''}`}
            type="submit"
            disabled={!formValid || isLoading}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              'Отправить заявку'
            )}
          </button>
        </form>

        <div className="form-footer">
          <p className="privacy-text">
            Нажимая кнопку, вы соглашаетесь с <a href="/privacy">политикой конфиденциальности</a>
          </p>
        </div>

        {successSubmit && (
          <Modal onClose={() => setSuccessSubmit(false)}>
            <div className="success-modal">
              <div className="success-icon">✓</div>
              <h3>Заявка отправлена!</h3>
              <p>Мы свяжемся с вами в ближайшее время</p>
              <div className="success-countdown">
                <div className="countdown-bar"></div>
              </div>
            </div>
          </Modal>
        )}
        
        {submitError && (
          <Modal onClose={() => setSubmitError('')}>
            <div className="error-modal">
              <h3>Ошибка</h3>
              <p>{submitError}</p>
              <button 
                className="modal-close-btn"
                onClick={() => setSubmitError('')}
              >
                Закрыть
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default FormWithoutOverlay;