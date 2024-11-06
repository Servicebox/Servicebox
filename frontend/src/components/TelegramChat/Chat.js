import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import './Chat.css';

// Замените на свой URL сервера
const socket = io("https://servicebox35.pp.ru", {
  query: { clientId: document.cookie.replace(/(?:(?:^|.*;\s*)client-id\s*\=\s*([^;]*).*$)|^.*$/, "$1") }
});

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("Получено сообщение:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

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
  }, [chatOpen, messageInput]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
        // Заменяем id получателя на локальное сохраненное, если оно есть
      const clientId = localStorage.getItem("clientId");
      localStorage.setItem("clientId", clientId); // Сохраняем id получателя
      setMessages((prevMessages) => [...prevMessages, { text: clientId, timestamp: new Date() }]); // Добавляем сообщение с id получателя
      sendMessageToTelegram(clientId); // Отправляем сообщение в Telegram
 
      const message = { text: messageInput, timestamp: new Date() };

      socket.emit("message", message, clientId); // Передаем id получателя
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