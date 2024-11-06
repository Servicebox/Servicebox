import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import './Chat.css';

const getClientId = () => {
  return Promise.resolve(document.cookie.replace(/(?:(?:^|.*;\s*)client-id\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
};

function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getClientId().then(clientId => {
      const newSocket = io("https://servicebox35.pp.ru", {
        query: { clientId, userName }
      });

      newSocket.on("message", (message) => {
        console.log("Получено сообщение:", message);
        setMessages(prevMessages => [...prevMessages, message]);
      });

      setSocket(newSocket);

      // Чистка после завершения
      return () => newSocket.disconnect();
    });
  }, [userName]);

  const sendMessage = () => {
    if (socket && messageInput.trim()) {
      socket.emit("message", {
        text: messageInput,
        timestamp: new Date(),
        userName
      });
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
            <h2 className="chat-header">Представьтесь и отправьте нам сообщение</h2>
            <div className="user-name-input-container">
              <input
                type="text"
                className="user-name-input"
                placeholder="Введите ваше имя..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${index % 2 === 0 ? "message-user" : "message-bot"}`}
                >
                  <div className="message-text"><strong>{msg.userName}:</strong> {msg.text}</div>
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
              <button className="send-button" onClick={sendMessage}>Отправить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;