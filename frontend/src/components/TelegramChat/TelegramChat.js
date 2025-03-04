// src/components/TelegramChat.js
{/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './TelegramChat.css';

const apiServer = process.env.REACT_APP_API_SERVER || 'https://bd74-94-25-225-62.ngrok-free.app'; // Используем переменную окружения
const socket = io(apiServer); // Подключаемся к публичному API серверу

const TelegramChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const manager = 'Менеджер';

  useEffect(() => {
    // Загрузка истории сообщений из локального хранилища
    const storedMessages = localStorage.getItem('historyMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    // Подписка на новые сообщения через WebSocket
    socket.on('newMessage', (message) => {
      addMessage({ user: message.user, text: message.text });
    });

    // Отправка приветственного сообщения менеджера (опционально)
    addMessage({ user: manager, text: 'Салют! Какой вопрос?' });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

const handleSubmit = async () => {
  if (inputValue.trim() === '') {
    alert('Введите текст');
    return;
  }

  // Добавление сообщения пользователя
  const newMessage = { user: 'Вы', text: inputValue };
  addMessage(newMessage);

  // Отправка сообщения через backend-сервер
  try {
    await axios.post(`${apiServer}/send-message`, { message: inputValue });
    // Нет необходимости отправлять заголовок с секретом при отправке через API
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
  }

  setInputValue('');
};

  const addMessage = (message) => {
    setMessages((prev) => {
      const updatedMessages = [...prev, message];
      localStorage.setItem('historyMessages', JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  };

  const handleClose = () => {
    // Очистка истории сообщений при закрытии чата
    setMessages([]);
    localStorage.removeItem('historyMessages');
  };

  return (
    <div className="chat__wrap">
      <div className="chat__title">
        Онлайн-чат
        <div className="btm__close chat__close" onClick={handleClose}>
          &times;
        </div>
      </div>
      <div className="chat__body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat__body__item ${
              msg.user === 'Вы' ? 'chat__body__item__client' : 'chat__body__item__manager'
            }`}
          >
            <img
              className="chat__body__item__user__icon"
              src={`./telegram-chat/${msg.user === 'Вы' ? 'user.svg' : 'manager.svg'}`} // Убедитесь, что иконки существуют
              alt="аватарка"
            />
            <span className="chat__body__item__user">{msg.user}</span>
            <span className="chat__body__item__text">{msg.text}</span>
            <i className="chat__body__item__time">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </i>
          </div>
        ))}
      </div>
      <div className="chat__input">
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          rows="1"
          wrap="on"
          className="chat__main__input"
          placeholder="Напишите сообщение"
        />
        <button onClick={handleSubmit} className="chat__input__submit">
          Отправить
        </button>
      </div>
    </div>
  );
};

export default TelegramChat;
*/}