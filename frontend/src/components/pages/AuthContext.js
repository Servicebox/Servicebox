// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [warningTimer, setWarningTimer] = useState(null); // Для таймера уведомления

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      setLogoutTimer(null);
    }
    if (warningTimer) {
      clearTimeout(warningTimer);
      setWarningTimer(null);
    }
    // Дополнительно, можно отправить запрос на сервер для удаления куки
    fetch('https://servicebox35.pp.ru/api/logout', {
      method: 'POST',
      credentials: 'include', // Важно для отправки cookies
    }).catch(err => console.error('Ошибка при логауте:', err));
  }, [logoutTimer, warningTimer]);

  const extendSession = useCallback(async () => {
    try {
      const response = await fetch('https://servicebox35.pp.ru/api/refresh-token', {
        method: 'POST',
        credentials: 'include', // Важно для отправки cookies
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsAuthenticated(true);
        scheduleAutoLogout(data.token);
        alert("Сессия успешно продлена.");
      } else {
        logout();
      }
    } catch (error) {
      console.error('Ошибка при продлении сессии:', error);
      logout();
    }
  }, [logout]);

  const scheduleAutoLogout = useCallback((token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // в секундах
      const expirationTime = decodedToken.exp;
      const remainingTime = (expirationTime - currentTime) * 1000; // в миллисекундах

      if (remainingTime <= 0) {
        logout();
      } else {
        // Установить таймер для автоматического логаута
        const timer = setTimeout(() => {
          logout();
        }, remainingTime);
        setLogoutTimer(timer);

        // Установить таймер для предупреждения за 5 минут до логаута
        const warningTime = remainingTime - (5 * 60 * 1000); // за 5 минут
        if (warningTime > 0) {
          const warning = setTimeout(() => {
            if (window.confirm("Сессия истекает через 5 минут. Желаете продлить сессию?")) {
              extendSession();
            }
          }, warningTime);
          setWarningTimer(warning);
        }
      }
    } catch (error) {
      console.error("Ошибка при декодировании токена:", error);
      logout();
    }
  }, [logout, extendSession]);

 const checkAuth = useCallback(async () => {
  try {
    const response = await fetch('https://servicebox35.pp.ru/api/authenticate', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let errorMessage = 'Ошибка аутентификации';
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (data.success) {
      setIsAuthenticated(true);
      scheduleAutoLogout(data.token);
    } else {
      setIsAuthenticated(false);
    }
  } catch (error) {
    console.error('Ошибка при проверке аутентификации:', error);
    setIsAuthenticated(false);
  }
}, [scheduleAutoLogout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Добавление обработчиков событий для активности пользователя
  useEffect(() => {
    if (isAuthenticated) {
      const handleActivity = () => {
        // Продлить сессию при активности
        extendSession();
      };

      window.addEventListener('click', handleActivity);
      window.addEventListener('keypress', handleActivity);
      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('scroll', handleActivity);

      return () => {
        window.removeEventListener('click', handleActivity);
        window.removeEventListener('keypress', handleActivity);
        window.removeEventListener('mousemove', handleActivity);
        window.removeEventListener('scroll', handleActivity);
      };
    }
  }, [isAuthenticated, extendSession]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};