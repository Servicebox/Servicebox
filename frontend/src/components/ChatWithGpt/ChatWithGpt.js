import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatWithGpt.css';

// Emoji иконки
const GPT_AVATAR = "🤖";
const USER_AVATAR = "🧑";
const SYSTEM_AVATAR = "ℹ️";

function getNowDate() {
    // ISO лучше для надёжного парса и MongoDB
    return new Date().toISOString();
}
function formatMsgDate(dt) {
    if (!dt) return "";
    let date;
    if (dt instanceof Date) date = dt;
    else if (typeof dt === "string") {
        // ISO-строка
        const tmp = new Date(dt);
        if (isNaN(tmp.getTime())) return "";
        date = tmp;
    } else { return ""; }
    const today = new Date();
    if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    ) {
        return date
            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date
        .toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' }) +
        " " +
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const ChatWithGpt = () => {
    const [messages, setMessages] = useState(() => {
        try {
            const saved = localStorage.getItem('gpt_chat_history');
            return saved
                ? JSON.parse(saved)
                : [{ role: 'system', content: 'Я консультант по ремонту цифровой электроники ноутбуков, видеокарт, телефонов, планшетов, телевизоров . Отвечаю максимально полезно!', date: getNowDate() }];
        } catch {
            return [{ role: 'system', content: 'Я консультант по ремонту цифровой электроники ноутбуков, видеокарт, телефонов, планшетов, телевизоров . Отвечаю максимально полезно!', date: getNowDate() }];
        }
    });

    useEffect(() => {
        localStorage.setItem('gpt_chat_history', JSON.stringify(messages));
    }, [messages]);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imgLoadingIdx, setImgLoadingIdx] = useState(null);
    const [ttsLoadingIdx, setTtsLoadingIdx] = useState(null);

    const messagesEndRef = useRef(null);

    // Скроллим при появлении новых сообщений
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        const newMessages = [
            ...messages,
            { role: 'user', content: input, date: getNowDate() }
        ];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);
        try {
            const res = await axios.post('https://servicebox35.pp.ru/api/gpt/chat', {
                messages: newMessages.map(({ role, content }) => ({ role, content }))
            });
            const answer = res.data.choices[0].message;
            answer.date = getNowDate();
            setMessages([...newMessages, answer]);
        } catch (e) {
            setMessages([...newMessages, { role: 'assistant', content: 'Ошибка при обращении к ИИ', date: getNowDate() }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Генерация картинки
    const handleGenImage = async (idx, text) => {
        setImgLoadingIdx(idx);
        try {
            const res = await axios.post('https://servicebox35.pp.ru/api/gpt/generate-image', {
                prompt: text
            });
            const url = res.data.data[0]?.url;
            if (url) {
                setMessages(msgs => msgs.map((m, i) =>
                    i === idx ? { ...m, image: url } : m
                ));
            }
        } catch (e) {
            alert("Ошибка генерации изображения");
        }
        setImgLoadingIdx(null);
    };

    // Голосовой ответ
    const handlePlayVoice = async (idx, text) => {
        setTtsLoadingIdx(idx);
        try {
            const res = await axios.post(
                'https://servicebox35.pp.ru/api/gpt/generate-voice',
                { text },
                { responseType: 'blob' }
            );
            const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
            const audio = new Audio(URL.createObjectURL(audioBlob));
            audio.play();
        } catch (e) {
            alert("Ошибка при озвучке");
        }
        setTtsLoadingIdx(null);
    };


    const getAvatar = (role) => {
        if (role === 'user') return <span className="avatar user">{USER_AVATAR}</span>;
        if (role === 'assistant') return <span className="avatar gpt">{GPT_AVATAR}</span>;
        if (role === 'system') return <span className="avatar system">{SYSTEM_AVATAR}</span>;
    };

    const renderToolbar = (m, idx) => {
        if (m.role === 'assistant') {
            return (
                <div className="bubble-toolbar">
                    <button className={"bubble-btn" + (ttsLoadingIdx === idx ? " loading" : "")}
                        title="Озвучить ответ"
                        onClick={() => handlePlayVoice(idx, m.content)}
                    >
                        {ttsLoadingIdx === idx ? "🔊..." : "🔊 Прослушать"}
                    </button>
                    <button
                        className="bubble-btn"
                        disabled={imgLoadingIdx === idx}
                        title="Сгенерировать изображение"
                        onClick={() => handleGenImage(idx, m.content)}
                    >
                        {imgLoadingIdx === idx ? "🎨..." : "🎨 Картинка"}
                    </button>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="chat-container">
            <h2 className="chat-header__gpt">Онлайн-консультант по ремонту</h2>
            <div className="messages-list">
                {messages.map((m, idx) => (
                    <div key={idx} className={"message-row " + m.role}>
                        {getAvatar(m.role)}
                        <div className="message-bubble">
                            {(m.role === 'user' ? 'Вы: ' : (m.role === 'assistant' ? 'ServiceBox: ' : ''))}
                            {m.content}
                            {m.image &&
                                <img
                                    src={m.image}
                                    alt="Сгенерировано нейросетью"
                                    className="generated-image"
                                />
                            }
                            {renderToolbar(m, idx)}
                            <div className="message-date">{formatMsgDate(m.date)}</div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="input-row">
                <textarea
                    className="chat-textarea"
                    value={input}
                    rows={3}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey ? (e.preventDefault(), handleSend()) : undefined}
                    placeholder="Опишите проблему с вашим устройством..."
                />
                <button
                    className="send-button"
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                >
                    {isLoading ? "..." : "Отправить"}
                </button>
            </div>

        </div>
    );
};

export default ChatWithGpt;