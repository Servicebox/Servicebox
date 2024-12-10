import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './VerifyEmail.css';

const API_URL = 'https://servicebox35.pp.ru/api';

const VerifyEmail = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const [message, setMessage] = useState("Подтверждение email...");
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false); // Новый флаг

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || verified) { // Проверяем, был ли уже выполнен запрос
        return;
      }

      try {
        const response = await fetch(`${API_URL}/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('auth-token', data.token);
          setMessage(data.message || "Email подтвержден! Перенаправление...");
          setVerified(true); // Устанавливаем флаг после успешной верификации
          setTimeout(() => {
            navigate('/');
          }, 2000); // Перенаправление через 2 секунды
        } else {
          setMessage(data.message || "Неизвестная ошибка при подтверждении email.");
          setVerified(true); // Уже пытались верифицировать, чтобы предотвратить повторные попытки
        }
      } catch (error) {
        console.error("Ошибка при подтверждении email:", error);
        setMessage("Ошибка при подтверждении email.");
        setVerified(true); // Предотвращаем повторные попытки при ошибке
      }
    };

    verifyEmail();
  }, [token, navigate, verified]);

  return (
    <div className='verify-email-container'>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;