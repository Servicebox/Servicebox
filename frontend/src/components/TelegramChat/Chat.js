import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chat.css";
import Cha from "../../images/chatonlain.gif";
import userIcon from "../../images/user.svg";
import managerIcon from "../../images/manager.webp";
import Icon from "../../images/Up.svg";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

// Генерация и сохранение ID пользователя
function getUserId() {
  let id = localStorage.getItem('reactchat_userid');
  if (!id) {
    id = 'user' + Math.random().toString(36).substr(2, 10);
    localStorage.setItem('reactchat_userid', id);
  }
  return id;
}

// Сохранение имени пользователя в localStorage
function getUserName() {
  return localStorage.getItem('chat_userName') || '';
}

export default function Chat() {
  const USER_ID = getUserId();
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://servicebox35.pp.ru';
  
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState(() => {
    try {
      const history = JSON.parse(localStorage.getItem('reactchat_history') || '[]');
      return history;
    } catch {
      return [];
    }
  });
  const [showEmoji, setShowEmoji] = useState(false);
  const [userName, setUserName] = useState(getUserName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);

  const chatEndRef = useRef(null);
  const sndSend = useRef(null);
  const sndDelivery = useRef(null);
  const nameInputRef = useRef(null);

  // Скролл к последнему сообщению
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Сохраняем историю сообщений
  useEffect(() => {
    localStorage.setItem('reactchat_history', JSON.stringify(messages));
  }, [messages]);

  // Фокус на поле ввода имени при открытии
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  // Проверяем, есть ли имя при открытии чата
  useEffect(() => {
    if (open) {
      if (!userName) {
        setShowNameModal(true);
      } else {
        loadMessageHistory();
      }
    }
  }, [open, userName]);

  // Emoji picker
   const addEmoji = (emoji) => {
    setText(prevText => prevText + (emoji.native || emoji));
    setShowEmoji(false); // Закрываем пикер после выбора
  };

  // Сохраняем имя
  const saveName = () => {
    const newName = tempName.trim();
    if (!newName) return;

    setUserName(newName);
    localStorage.setItem('chat_userName', newName);
    setIsEditingName(false);
    setShowNameModal(false);
    loadMessageHistory();
  };

  // Отправка сообщения
  async function sendMessage(e) {
    e?.preventDefault();
    if (!text.trim() || !userName) return;
    setPending(true);

    const msgId = Date.now();

    // Звук отправки
    sndSend.current?.play();

    try {
      // Отправляем через наш бэкенд
      await axios.post(`${API_BASE_URL}/api/telegram/send`, {
        userId: USER_ID,
        userName,
        text: text.trim()
      });

      setMessages(msgs => [
        ...msgs,
        {
          _id: msgId,
          author: 'user',
          text,
          userName,
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "sent"
        }
      ]);
      setText('');
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setPending(false);
    }
  }

  // Загрузка истории сообщений
  const loadMessageHistory = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/telegram/updates?userId=${USER_ID}`
      );
      const replies = response.data || [];

      setMessages(old => {
        const known = new Set(old.map(m => m._id));
        let withDelivery = old.map(msg =>
          msg.author === 'user' && msg.status !== 'delivered'
            ? { ...msg, status: 'delivered' }
            : msg
        );

        return [
          ...withDelivery,
          ...replies.filter(r => !known.has(r._id))
        ];
      });
    } catch (e) {
      console.error("Error loading message history:", e);
    }
  };

  // Polling for replies
  useEffect(() => {
    if (!open || !userName) return;
    
    const timer = setInterval(async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/telegram/updates?userId=${USER_ID}`
        );
        const replies = response.data || [];
        
        if (replies.length) {
          setMessages(old => {
            const known = new Set(old.map(m => m._id));
            let withDelivery = old.map(msg =>
              msg.author === 'user' && msg.status !== 'delivered'
                ? { ...msg, status: 'delivered' }
                : msg
            );
            
            const newMessages = replies.filter(r => !known.has(r._id));
            if (newMessages.length) {
              sndDelivery.current?.play();
            }
            
            return [...withDelivery, ...newMessages];
          });
        }
      } catch (e) {
        console.error("Polling error:", e);
      }
    }, 3500);
    
    return () => clearInterval(timer);
  }, [open, userName]);

  const handleToggle = () => {
    setOpen(!open);
  };

  // Закрытие модалки с именем
  const closeNameModal = () => {
    setOpen(false);
    setShowNameModal(false);
  };

  return (
    <div className="chat-container-tg">
      <audio src={require('../Assets/send.mp3')} ref={sndSend} />
      <audio src={require('../Assets/delivered.mp3')} ref={sndDelivery} />

      {!open && (
        <button className="open-chat-btn" onClick={handleToggle} aria-label="Открыть чат">
          <img className="chat-icon" src={Cha} alt="чат" />
          <span className="pulse-dot"></span>
        </button>
      )}

      {open && (
        <div className="chat-modal">
          {showNameModal && (
            <div className="name-modal">
              <div className="name-modal-content">
                <button className="name-modal-close" onClick={closeNameModal}>
                  &times;
                </button>
                <h3>Как к вам обращаться?</h3>
                <p>Введите ваше имя для начала диалога</p>
                <input
                  type="text"
                  ref={nameInputRef}
                  value={tempName}
                  onChange={e => setTempName(e.target.value)}
                  placeholder="Ваше имя"
                  className="name-input"
                  onKeyDown={e => e.key === 'Enter' && saveName()}
                />
                <button
                  className="name-save-btn"
                  onClick={saveName}
                  disabled={!tempName.trim()}
                >
                  Начать общение
                </button>
              </div>
            </div>
          )}

          <div className="chat-header">
            <div className="header-avatar">
              <img src={managerIcon} alt="manager" />
              <div className="online-indicator"></div>
            </div>
            <div className="header-info">
              <h3>Поддержка</h3>
              <p>Отвечает быстро • Онлайн</p>
            </div>
            <button className="chat-close" onClick={handleToggle}>&times;</button>
          </div>

          {userName && (
            <div className="user-name-badge">
              <span>Ваше имя: </span>
              <strong>{userName}</strong>
              <button
                className="edit-name-btn"
                onClick={() => {
                  setTempName(userName);
                  setIsEditingName(true);
                }}
              >
                Изменить
              </button>
            </div>
          )}

          {isEditingName && (
            <div className="edit-name-container">
              <input
                type="text"
                ref={nameInputRef}
                value={tempName}
                onChange={e => setTempName(e.target.value)}
                placeholder="Новое имя"
                className="edit-name-input"
                onKeyDown={e => {
                  if (e.key === 'Enter') saveName();
                  if (e.key === 'Escape') setIsEditingName(false);
                }}
              />
              <button
                className="save-name-btn"
                onClick={saveName}
                disabled={!tempName.trim()}
              >
                Сохранить
              </button>
              <button
                className="cancel-name-btn"
                onClick={() => setIsEditingName(false)}
              >
                Отмена
              </button>
            </div>
          )}

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <div className="welcome-avatar">
                  <img src={managerIcon} alt="Поддержка" />
                </div>
                <div className="welcome-bubble">
                  <h3>Здравствуйте{userName ? `, ${userName}` : ''}!</h3>
                  <p>Чем я могу вам помочь сегодня? Пишите свои вопросы, я готов помочь.</p>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg._id} className={`chat-message ${msg.author === 'user' ? 'user-msg' : 'manager-msg'}`}>
                  {msg.author === 'manager' ? (
                    <img className="chat-ava" src={managerIcon} alt="Поддержка" />
                  ) : (
                    <img className="chat-ava" src={userIcon} alt="Вы" />
                  )}
                  <div className="chat-bubble">
                    {msg.author === 'user' && (
                      <div className="message-user-name">{msg.userName || userName}</div>
                    )}
                    <div className="message-text">
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    <div className="chat-meta">
                      <span className="chat-time">{msg.createdAt}</span>
                      {msg.author === 'user' && (
                        <span className={`msg-status ${msg.status}`}>
                          {msg.status === 'delivered' ? "✓✓" : "✓"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef}></div>
          </div>

          <form className="chat-input-form" onSubmit={sendMessage}>
            <button
              type="button"
              className="emoji-btn"
              onClick={() => setShowEmoji(v => !v)}
              disabled={!userName}
              title="Эмодзи"
            >
              😊
            </button>

            {showEmoji && (
              <div className="emoji-picker">
                <button
                  className="emoji-close-btn"
                  type="button"
                  onClick={() => setShowEmoji(false)}
                  aria-label="Закрыть эмодзи"
                >
                  ×
                </button>
                <Picker
                  data={data}
                  onEmojiSelect={addEmoji}
                  locale="ru"
                  theme="light"
                />
              </div>
            )}

            <textarea
              className="chat-input"
              placeholder={userName ? "Ваше сообщение..." : "Введите имя для начала диалога"}
              value={text}
              onChange={e => setText(e.target.value)}
              rows={1}
              disabled={pending || !userName}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  sendMessage(e);
                  e.preventDefault();
                }
              }}
            />

            <button
              type="submit"
              className="chat-send-btn"
              disabled={pending || !text.trim() || !userName}
              title={!userName ? "Введите имя для отправки сообщений" : "Отправить"}
            >
              <img src={Icon} alt="Отправить" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}