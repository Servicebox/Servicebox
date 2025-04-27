import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chat.css";
import Cha from "../../images/chatonlain.gif";
import userIcon from "../../images/user.png";
import managerIcon from "../../images/manager.webp";
import Icon from "../../images/Up.svg";

// -------- ЭТО ГЛАВНОЕ ДЛЯ РАБОТЫ EMOJI PICKER -------------
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
// ----------------------------------------------------------

const BOT_TOKEN = "7903855692:AAEsBiERZ5B7apWoaQJvX0nNRB-PEJjmBcc";
const CHAT_ID = "406806305";

function getUserId() {
  let id = localStorage.getItem('reactchat_userid');
  if (!id) {
    id = 'user' + Math.random().toString(36).substr(2, 10);
    localStorage.setItem('reactchat_userid', id);
  }
  return id;
}
const USER_ID = getUserId();

function parseBotReplies(updates) {
  return updates
    .filter(
      u =>
        u.message &&
        u.message.reply_to_message &&
        typeof u.message.reply_to_message.text === 'string' &&
        u.message.reply_to_message.text.includes(USER_ID)
    )
    .map(u => ({
      _id: u.update_id,
      author: 'manager',
      text: u.message.text,
      createdAt: new Date(u.message.date * 1000).toLocaleTimeString(),
      status: "delivered"
    }));
}

function parseUserHistory(items) {
  if (!Array.isArray(items)) return [];
  return items.map(msg => ({
    ...msg,
    createdAt: msg.createdAt,
    status: msg.status
  }));
}

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState(() => {
    try {
      return parseUserHistory(JSON.parse(localStorage.getItem('reactchat_history') || '[]'));
    } catch {
      return [];
    }
  });
  const [showEmoji, setShowEmoji] = useState(false);
  const chatEndRef = useRef(null);
  const sndSend = useRef(null);
  const sndDelivery = useRef(null);

  // Скролл вниз
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Локальная история
  useEffect(() => {
    localStorage.setItem('reactchat_history', JSON.stringify(messages));
  }, [messages]);

  // Emoji picker (НОВАЯ ФУНКЦИЯ ДЛЯ EMOJI-MART 5)
  const addEmoji = (emoji) => setText(text + (emoji.native || emoji));

  // Отправка сообщения
  async function sendMessage(e) {
    e && e.preventDefault();
    if (!text.trim()) return;
    setPending(true);

    const body = `USER:${USER_ID}\n${text.trim()}`;
    const msgId = Date.now();

    // Звук отправки
    sndSend.current && sndSend.current.play();

    try {
      await axios.get(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          params: { chat_id: CHAT_ID, text: body },
        }
      );
      setMessages(msgs =>
        [...msgs, { _id: msgId, author: 'user', text, createdAt: new Date().toLocaleTimeString(), status: "sent" }]
      );
      setText('');
    } finally {
      setPending(false);
    }
  }

  // Polling for replies and "mark delivered"
  useEffect(() => {
    if (!open) return;
    const timer = setInterval(async () => {
      try {
        const { data } = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
        const replies = parseBotReplies(data.result || []);
        if (replies.length) {
          setMessages(old => {
            const known = new Set(old.map(m => m._id));
            let withDelivery = old.map(msg =>
              msg.author === 'user' && msg.status !== 'delivered'
                ? { ...msg, status: 'delivered' }
                : msg
            );
            if (replies.some(r => !known.has(r._id))) {
              sndDelivery.current && sndDelivery.current.play();
            }
            return [
              ...withDelivery,
              ...replies.filter(r => !known.has(r._id))
            ];
          });
        }
      } catch (e) {
        // Ошибки при получении сообщений Telegram игнорируются
      }
    }, 3500);
    return () => clearInterval(timer);
  }, [open]);

  const handleToggle = () => setOpen(v => !v);

  return (
    <div>
      <audio src={require('../Assets/send.mp3')} ref={sndSend} />
      <audio src={require('../Assets/delivered.mp3')} ref={sndDelivery} />
      <button className="open-chat-btn" onClick={handleToggle} aria-label="Открыть чат">
        <img className="chat-icon" src={Cha} alt="чат" />
      </button>
      {open && (
        <div className="chat-modal">
          <div className="chat-header">
            <img src={managerIcon} alt="manager" width={32} style={{ marginRight: 10, borderRadius: 12 }} />
            <span>Онлайн-консультант</span>
            <button className="chat-close" onClick={handleToggle}>&times;</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={msg._id || idx} className={`chat-message ${msg.author === 'user' ? 'user-msg' : 'manager-msg'}`}>
                {msg.author === 'manager'
                  ? <img className="chat-ava" src={managerIcon} alt="m" />
                  : <img className="chat-ava" src={userIcon} alt="u" />}
                <div className="chat-bubble">
                  <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                  <div className="chat-meta">
                    <span className="chat-time">{msg.createdAt}</span>
                    {msg.author === 'user' && (
                      <span className={`msg-status ${msg.status}`}>{msg.status === 'delivered' ? "✓✓" : "✓"}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <form className="chat-input-form" onSubmit={sendMessage} style={{ position: 'relative' }}>
            <button type="button" className="emoji-btn" onClick={() => setShowEmoji(v => !v)} title="Эмодзи">
              😊
            </button>
            {showEmoji && (
              <div className="emoji-picker">
                <button
                  className="emoji-close-btn"
                  type="button"
                  onClick={() => setShowEmoji(false)}
                  aria-label="Закрыть эмодзи"
                >×</button>
                <Picker
                  data={data}
                  onEmojiSelect={(emoji) => {
                    addEmoji(emoji);
                    setShowEmoji(false);  // уберите строку если не хотите автозакрытия
                  }}
                  locale="ru"
                  theme="light"
                />
              </div>
            )}
            <textarea
              className="chat-input"
              placeholder="Ваше сообщение..."
              value={text}
              onChange={e => setText(e.target.value)}
              rows={1}
              disabled={pending}
              style={{ minWidth: 0, maxWidth: "100%", width: "100%" }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) { sendMessage(e); e.preventDefault(); }
              }}
            />
            <button type="submit" disabled={pending || !text.trim()} className="chat-send-btn">
              <img src={Icon} alt="send" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}