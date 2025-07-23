import React, { useState, useRef, useEffect } from 'react';
import './BookingForm.css';
import CloseIcon from "../../images/x.svg";

const BookingForm = ({ service, onClose, onBookingSuccess }) => {
  const [values, setValues] = useState({ 
    name: "", 
    phone: "", 
    email: "",
    device: "",
    notes: service ? `Запись на услугу: ${service.serviceName}` : "" 
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);
  const formRef = useRef(null);
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'unset';
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
  
  const validate = () => {
    const newErrors = {};
    if (!values.name.trim()) newErrors.name = "Введите имя";
    if (!values.phone.trim()) newErrors.phone = "Введите телефон";
    
    if (!/^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(values.phone)) {
      newErrors.phone = "Некорректный номер";
    }
    
    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Некорректный email";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("https://servicebox35.pp.ru/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service._id,
          serviceName: service.serviceName,
          userName: values.name,
          userPhone: values.phone,
          userEmail: values.email,
          deviceModel: values.device,
          notes: values.notes
        })
      });

      if (response.ok) {
        const result = await response.json();
        setCreatedBooking(result);
        setBookingSuccess(true);
        if (onBookingSuccess) onBookingSuccess(result);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка при отправке");
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  if (bookingSuccess && createdBooking) {
    return (
      <div className="booking-overlay">
        <div className="booking-form-container" ref={formRef}>
          <button className="close-button" onClick={onClose}>
            <img src={CloseIcon} alt="Закрыть" />
          </button>
          
          <div className="booking-success">
            <h2>Запись оформлена!</h2>
            <p>Мы свяжемся с вами для подтверждения</p>
            <p className="tracking-code">
              Ваш номер записи: <strong>{createdBooking.trackingCode}</strong>
            </p>
            
            <div className="success-actions">
              <button className="btn-close" onClick={onClose}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-overlay">
       <div className="booking-form-container" ref={formRef}>
        <button className="close-button" onClick={onClose}>
          <img src={CloseIcon} alt="Закрыть" />
        </button>

        <h2>Запись на услугу</h2>
        {service && (
          <div className="service-info">
            <h3>{service.serviceName}</h3>
            <p>{service.description}</p>
            <p className="price">Цена: {service.price}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя *</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
              placeholder="Иван Иванов"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Телефон *</label>
            <input
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
              placeholder="+7 (999) 999-99-99"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              placeholder="email@example.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Устройство</label>
            <input
              type="text"
              name="device"
              value={values.device}
              onChange={handleChange}
              placeholder="Модель устройства"
            />
          </div>

          <div className="form-group">
            <label>Дополнительная информация</label>
            <textarea
              name="notes"
              value={values.notes}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Отправка..." : "Записаться"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;