import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import './Chat.css';

const socket = io("https://servicebox35.pp.ru"); // Replace with your server address

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("Получено сообщение:", message); // Логирование
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Развесим слушатель событий клавиатуры
    const handleKeyDown = (event) => {
      if (chatOpen) {
        if (event.key === 'Escape') {
          setChatOpen(false);
        }
        if (event.key === 'Enter') {
          sendMessage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      socket.off("message");
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [chatOpen, messageInput]); // Добавляем зависимости

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const message = { text: messageInput, timestamp: new Date() };
      socket.emit("message", message);
      setMessageInput("");
    }
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div>
      <button className="chat-toggle" onClick={toggleChat}>
        {chatOpen ? "Закрыть Чат" : "Открыть Чат"}
      </button>
      {chatOpen && (
        <div className="chat-container">
          <div className="chat-content">
            <h2 className="chat-header">Отправьте нам сообщение</h2>
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${index % 2 === 0 ? "message-user" : "message-bot"}`}
                >
                  <div className="message-text">{msg.text}</div>
                  <span className="message-timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                  {msg.update_id && (
                    <span className="message-id">
                      ID: {msg.update_id}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="message-input-container">
              <input
                type="text"
                className="message-input"
                placeholder="Задайте вопрос..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button className="send-button" onClick={sendMessage}>
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;