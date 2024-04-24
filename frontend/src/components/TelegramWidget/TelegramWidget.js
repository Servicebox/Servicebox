import React, { useEffect } from "react";

import "./TelegramWidget.css"
import { sha256, HmacSHA256 } from "crypto-js";


const TelegramWidget = () => {
  useEffect(() => {
    // Добавляем функцию в глобальный объект window
    window.onTelegramAuth = (user) => {
      const dataCheckString = `auth_date=${user.auth_date}\nfirst_name=${user.first_name}\nid=${user.id}\nusername=${user.username}`;
      const botToken = "6875218502:AAGQyFd6PJ5HR_DtjQsu8Y6Kz0MYSJONBjM"; // токен
      const secretKey = sha256(botToken);
      const hmac = HmacSHA256(dataCheckString, secretKey);
      const hash = hmac.toString();

      if (hash === user.hash) {
        alert(`Logged in as ${user.first_name} ${user.last_name} (${user.id}${user.username ? `, @${user.username}` : ''})`);
      } else {
        alert('Data integrity check failed. Data may be compromised.');
      }
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "servicB_bot"); // Имя бота
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div className="telegram-widget-container"></div>;
};
//
export default TelegramWidget;