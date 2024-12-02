// src/components/ResetPasswordWrapper.jsx

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoginSignup from './LoginSignup';

const ResetPasswordWrapper = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const handleLoginSuccess = () => {
    // Обновите состояние аутентификации в вашем приложении
    // Например, вызов функции из контекста или поднятие состояния
  };

  const closeModal = () => {
    navigate('/'); // Перенаправление на главную при закрытии модального окна
  };

  return (
    <LoginSignup
      isOpen={true}
      onClose={closeModal}
      onLoginSuccess={handleLoginSuccess}
      passwordResetToken={token} // Передаём токен как пропс
    />
  );
};

export default ResetPasswordWrapper;