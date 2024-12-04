import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const [message, setMessage] = useState("Подтверждение email...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage("Токен не предоставлен.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('auth-token', data.token);
          navigate('/');
        } else {
          setMessage(data.message || "Неизвестная ошибка при подтверждении email.");
        }
      } catch (error) {
        console.error("Ошибка при подтверждении email:", error);
        setMessage("Ошибка при подтверждении email.");
      }
    };

    // Запускаем верификацию только один раз при загрузке компонента
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className='verify-email-container'>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;