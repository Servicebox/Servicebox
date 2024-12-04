// src/components/ResetPasswordWrapper.jsx

import React from 'react';

import LoginSignup from './LoginSignup';
import { useParams } from 'react-router-dom';

const ResetPasswordWrapper = () => {
  const { token } = useParams();

  return (
    <LoginSignup
      isOpen={true}
      onClose={() => {}}
      onLoginSuccess={() => {}}
      token={token}
    />
  );
};

export default ResetPasswordWrapper;