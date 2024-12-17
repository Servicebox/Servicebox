// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Создаём контекст
export const AuthContext = createContext();

// Создаём провайдер для контекста
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверяем, есть ли токен при загрузке приложения
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Функция для входа
  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  // Функция для выхода
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};