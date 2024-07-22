import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const login = async () => {
    console.log("Login function Executed", formData);
    try {
      const response = await fetch('https://servicebox35.pp.ru/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("./");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      alert("Ошибка при выполнении запроса.");
    }
  };

  const signup = async () => {
    console.log("Signup function Executed", formData);
    try {
      const response = await fetch('https://servicebox35.pp.ru/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("./");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      console.log('Подробная информация о запросе:', {
        url: 'https://servicebox35.pp.ru/signup',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      alert("Ошибка при выполнении запроса.");
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state === "Sign Up" && <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Имя' />}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>
          {state === "Login" ? "Войти" : "Зарегистрироваться"}
        </button>
        {state === "Sign Up" 
          ? <p className='loginsignup-login'>Уже есть аккаунт? <span onClick={() => { setState("Login") }}>Войти</span></p>
          : <p className='loginsignup-login'>У вас нет аккаунта? <span onClick={() => { setState("Sign Up") }}>Зарегистрироваться</span></p>
        }
        <div className='loginsignup-agree'>
          <input type='checkbox' />
          <p>Продолжая, я соглашаюсь с условиями использования и политикой конфиденциальности.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;