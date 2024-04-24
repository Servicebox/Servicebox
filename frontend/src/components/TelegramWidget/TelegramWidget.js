import React, { useEffect } from "react";

const TelegramWidget = () => {

  useEffect(() => {
    const onTelegramAuth = (user) => {
      // Дополнительные действия после успешной аутентификации
      const data_check_string = `auth_date=${user.auth_date}\nfirst_name=${user.first_name}\nid=${user.id}\nusername=${user.username}`;
      const bot_token = "6875218502:AAGQyFd6PJ5HR_DtjQsu8Y6Kz0MYSJONBjM"; 

      const secret_key = SHA256(bot_token);
      const hmac = HMAC_SHA256(data_check_string, secret_key);
      const hash = hex(hmac);

      if (hash === user.hash) {
        alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
        // Дополнительные действия после проверки безопасности
      } else {
        alert('Data integrity check failed. Data may be compromised.');
      }
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "servicB_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div></div>; // Пустой div для вставки виджета
};

export default TelegramWidget;