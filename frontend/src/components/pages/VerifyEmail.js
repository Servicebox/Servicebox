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
      try {
        const response = await fetch(`https://servicebox35.pp.ru/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('auth-token', data.token);
          navigate('/');
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        console.error("Ошибка при подтверждении email:", error);
        setMessage("Ошибка при подтверждении email.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className='verify-email-container'>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;