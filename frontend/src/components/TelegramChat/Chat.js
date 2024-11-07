import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import './Chat.css';

const getClientId = () => {
  let clientId = document.cookie.replace(/(?:(?:^|.*;\s*)client-id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  if (!clientId) {
    clientId = `client_${Math.random().toString(36).substring(2, 15)}`;
    document.cookie = `client-id=${clientId}; path=/; max-age=86400`;
  }
  return clientId;
};

function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const clientId = getClientId();
    const newSocket = io("https://servicebox35.pp.ru", {
      query: { clientId, userName }
    });
    
    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("message", (message) => {
      console.log("Received message:", message);
      setMessages(prevMessages => [...prevMessages, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userName]);

  const sendMessage = () => {
    if (socket && messageInput.trim() && userName.trim()) {
      const message = {
        text: messageInput.trim(),
        userName: userName.trim(),
        timestamp: new Date()
      };
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
                <div key={index} className={`message ${msg.userName === userName ? "message-user" : "message-bot"}`}>
                  <div className="message-text"><strong>{msg.userName}:</strong> {msg.text}</div>
                </div>
              ))}
            </div>
            <div className="message-input-container">
              <input
                type="text"
                className="message-input"
                placeholder="Введите ваше сообщение..."
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