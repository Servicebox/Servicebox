import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './LoginSignup.css';

const LoginSignup = ({ isOpen, onClose, onLoginSuccess }) => {
  const { token } = useParams(); // Получаем токен из URL
  const [mode, setMode] = useState("Login"); // "Login", "Sign Up", "Forgot Password", "Set New Password"
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }

    // Если есть токен, переключаемся на режим "Set New Password"
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
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "Login") {
      await login();
    } else if (mode === "Sign Up") {
      await signup();
    } else if (mode === "Forgot Password") {
      await requestPasswordReset();
    }
  };

  const login = async () => {
    try {
      const response = await fetch('https://servicebox35.pp.ru/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        onLoginSuccess(); // Обновляем состояние аутентификации в родительском компоненте
        onClose();
        navigate('/');
      } else {
        if (responseData.errors === "Неверный пароль") {
          setShowWrongPasswordModal(true);
        } else {
          alert(responseData.errors);
        }
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      alert("Ошибка при выполнении запроса.");
    }
  };

  const signup = async () => {
    try {
      const response = await fetch('https://servicebox35.pp.ru/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (response.ok) {
        alert(responseData.message);
        onClose();
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      alert("Ошибка при выполнении запроса.");
    }
  };

  const requestPasswordReset = async () => {
    try {
      const response = await fetch('https://servicebox35.pp.ru/forgot-password', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailForReset }),
      });
      const responseData = await response.json();
      alert(responseData.message);
      setMode("Login");
      onClose();
    } catch (error) {
      console.error("Ошибка при запросе сброса пароля:", error);
      alert("Ошибка при запросе сброса пароля.");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    try {
      const response = await fetch(`https://servicebox35.pp.ru/reset-password/${token}`, {
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
        navigate('/'); // Перенаправление на главную страницу
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error);
      alert("Ошибка при сбросе пароля.");
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

        {mode === "Set New Password" ? (
          <form className='reset-password' onSubmit={resetPassword}>
            <h3>Установка нового пароля</h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Введите новый пароль"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите новый пароль"
              required
            />
            <button type="submit">Установить новый пароль</button>
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
            />
            <button type="submit">Отправить</button>
          </form>
        ) : (
          <form className='loginsignup-fields' onSubmit={handleSubmit}>
            {mode === "Sign Up" && (
              <>
                <input
                  name='username'
                  value={formData.username}
                  onChange={changeHandler}
                  type='text'
                  placeholder='Имя'
                  required
                />
                <input
                  name='phone'
                  value={formData.phone}
                  onChange={changeHandler}
                  type='text'
                  placeholder='Телефон'
                  required
                />
              </>
            )}
            <input
              name='email'
              value={formData.email}
              onChange={changeHandler}
              type="email"
              placeholder="Email"
              required
            />
            <input
              name='password'
              value={formData.password}
              onChange={changeHandler}
              type="password"
              placeholder="Пароль"
              required
            />
            <button className='submit-button' type="submit">
              {mode === "Login" ? "Войти" : "Зарегистрироваться"}
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