import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './LoginSignup.css';

const API_URL = 'https://servicebox35.pp.ru/api';

const LoginSignup = ({ isOpen, onClose, onLoginSuccess }) => {
  const { token } = useParams();
  const [mode, setMode] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  });
  const [emailForReset, setEmailForReset] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showWrongPasswordModal, setShowWrongPasswordModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }

    if (token) {
      setMode("Set New Password");
    }
  }, [isOpen, token]);

  const resetForm = () => {
    setFormData({ username: "", email: "", password: "", phone: "" });
    setEmailForReset("");
    setNewPassword("");
    setConfirmPassword("");
    setShowWrongPasswordModal(false);
    setMode("Login");
    setMessage("");
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Сброс сообщения
    if (loading) return; // Предотвращаем отправку, если уже идет загрузка

    if (mode === "Login") {
      await login();
    } else if (mode === "Sign Up") {
      await signup();
    } else if (mode === "Forgot Password") {
      await requestPasswordReset();
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://servicebox35.pp.ru/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('auth-token', data.tokens.accessToken);
        localStorage.setItem('refresh-token', data.tokens.refreshToken);
        localStorage.setItem('role', data.role);
        localStorage.setItem('username', data.username);
        
        onLoginSuccess();
        onClose();
        
        if (data.role === 'admin') {
          navigate('/admin-panel');
        } else {
          navigate('/');
        }
        onClose(); // Закрыть модалку после успешной авторизации
        if (data.role === "admin") {
          navigate('/admin-panel');
        } else {
          navigate('/');
        }
      } else {
        setMessage(data.message || "Ошибка входа");
      }
    } catch (err) {
      setMessage("Ошибка сети");
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    // Валидация на клиенте
    if (!formData.username.trim()) {
      setMessage("Имя обязательно");
      return;
    }
    
    if (!formData.phone.trim()) {
      setMessage("Телефон обязателен");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      
      if (response.ok) {
         // Автоматически входим после регистрации
    await login(formData.email, formData.password);
        setMessage(responseData.message || "Регистрация успешна! Подтвердите email.");
        setMode("Login");
      } else {
        setMessage(responseData.message || "Ошибка при регистрации.");
      }
    } catch (error) {
      setMessage("Ошибка при выполнении запроса.");
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailForReset }),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        alert(responseData.message);
        setMode("Login");
        onClose();
      } else {
        alert(responseData.message || "Ошибка при запросе сброса пароля.");
      }
    } catch (error) {
      console.error("Ошибка при запросе сброса пароля:", error);
      alert("Ошибка при запросе сброса пароля.");
    } finally {
      setLoading(false);
    }
  };
  //
  const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem('refresh-token');

    if (!refreshToken) return false; // Нет токена для обновления

    try {
      const response = await fetch(`${API_URL}/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('auth-token', data.accessToken); // Сохраняем новый access token
        return true;
      } else {
        console.error('Ошибка обновления токена:', response.statusText);
        localStorage.removeItem('auth-token');
        localStorage.removeItem('refresh-token'); // Очистка при ошибке
        return false;
      }
    } catch (error) {
      console.error('Ошибка обновления токена:', error.message);
      return false;
    }
  };
  ///
  const resetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    if (loading) return; // Предотвращаем отправку, если уже идет загрузка
    if (newPassword !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token); // Сохранение токена для авторизации
        alert(responseData.message);
        onLoginSuccess();
        onClose();
        navigate('/');
      } else {
        setMessage(responseData.message || "Ошибка при сбросе пароля.");
      }
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error);
      setMessage("Ошибка при сбросе пароля.");
    } finally {
      setLoading(false);
    }
  };

  const closeWrongPasswordModal = () => {
    setShowWrongPasswordModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content__reg' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header__reg'>
          <h2>{mode}</h2>
          <button className='close-buttonreg' onClick={onClose}>&times;</button>
        </div>

        {message && <p className='error-message'>{message}</p>}

        {mode === "Set New Password" ? (
          <form className='reset-password' onSubmit={resetPassword}>
            <h3>Установка нового пароля</h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Введите новый пароль"
              required
              autoComplete="new-password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите новый пароль"
              required
              autoComplete="new-password"
            />
            <button type="submit" disabled={loading}>
              {loading ? "Загрузка..." : "Установить новый пароль"}
            </button>
          </form>
        ) : mode === "Forgot Password" ? (
          <form className='forgot-password' onSubmit={handleSubmit}>
            <h3>Восстановление пароля</h3>
            <input
              type="email"
              value={emailForReset}
              onChange={(e) => setEmailForReset(e.target.value)}
              placeholder="Введите ваш email"
              required
              autoComplete="email"
            />
            <button type="submit" disabled={loading}>
              {loading ? "Загрузка..." : "Отправить"}
            </button>
          </form>
        ) : (
          <form className='loginsignup-fields' onSubmit={handleSubmit}>
            {/* Добавлены поля для имени и телефона при регистрации */}
            {mode === "Sign Up" && (
              <>
                <input
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Имя"
                  required
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={changeHandler}
                  type="tel"
                  placeholder="Телефон"
                  required
                />
              </>
            )}
            
            <input
              name="email"
              value={formData.email}
              onChange={changeHandler}
              type="email"
              placeholder="Email"
              required
              autoComplete="email"
            />
            <input
              name="password"
              value={formData.password}
              onChange={changeHandler}
              type="password"
              placeholder="Пароль"
              required
              autoComplete={mode === "Login" ? "current-password" : "new-password"}
            />
            <button className='submit-button' type="submit" disabled={loading}>
              {loading ? "Загрузка..." : (mode === "Login" ? "Войти" : "Зарегистрироваться")}
            </button>
          </form>
        )}

        {mode !== "Forgot Password" && mode !== "Set New Password" && (
          <p className='toggle-state'>
            {mode === "Sign Up" ? "Уже есть аккаунт? " : "У вас нет аккаунта? "}
            <span onClick={() => { setMode(mode === "Login" ? "Sign Up" : "Login") }}>
              {mode === "Login" ? "Зарегистрироваться" : "Войти"}
            </span>
          </p>
        )}

        {mode === "Login" && (
          <p className='forgot-password-link'>
            <span onClick={() => setMode("Forgot Password")}>
              Забыли пароль?
            </span>
          </p>
        )}

        {showWrongPasswordModal && (
          <div className='wrong-password-modal'>
            <div className='modal-content'>
              <h3>Неверный пароль</h3>
              <p>
                Забыли пароль?{' '}
                <span
                  className='recover-link'
                  onClick={() => { setShowWrongPasswordModal(false); setMode("Forgot Password"); }}
                >
                  Восстановить
                </span>
              </p>
              <button onClick={closeWrongPasswordModal}>Закрыть</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;