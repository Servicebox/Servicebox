// components/Register.js
import React from 'react';

const Register = async (email, password) => {
  try {
    const response = await fetch('https://servicebox35.pp.ru/api/user/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Использование функции handleRegister:
Register('newuser@example.com', 'password123');

export default Register;