import React, { useEffect } from "react";
import CryptoJS from "crypto-js";

import "./TelegramWidget.css";

const TelegramWidget = () => {
    useEffect(() => {
        const onTelegramAuth = (user) => {
            const dataCheckString = [
                `auth_date=${user.auth_date}`,
                `id=${user.id}`,
                `first_name=${user.first_name}`,  // optional
                `last_name=${user.last_name}`,  // optional
                `username=${user.username}`,  // optional
            ].filter(Boolean).join('\n');

            const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
            const secretKey = CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(botToken));

            const hash = CryptoJS.HmacSHA256(dataCheckString, secretKey);
            const hashHex = CryptoJS.enc.Hex.stringify(hash);

            if (hashHex === user.hash) {
                alert(`Logged in as ${user.first_name} ${user.last_name} (${user.id} ${user.username ? ", @" + user.username : ""})`);
            } else {
                alert('Data integrity check failed. Data may be compromised.');
            }
        };

        window.onTelegramAuth = onTelegramAuth;

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
            window.onTelegramAuth = undefined;
        };
    }, []);

    return <div className="telegram-widget-container"></div>;
};

export default TelegramWidget;