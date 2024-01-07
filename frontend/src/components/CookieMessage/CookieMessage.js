import React, { useEffect } from "react";
import Cookies from "js-cookie";
import "./CookieMessage.css";

function CookieMessage() {
  useEffect(() => {
    const cookieConsent = Cookies.get("cookieConsent");
    if (cookieConsent !== "true") {
      const cookieMessage = document.createElement("div");
      cookieMessage.classList.add("cookie-message");

      const cookieText = document.createElement("div");
      cookieText.classList.add("cookie-message__text");
      cookieText.innerHTML =
        'Продолжая пользоваться сайтом, я даю согласие на использование файлов cookie.';
      cookieMessage.appendChild(cookieText);

      const acceptButton = document.createElement("button");
      acceptButton.classList.add("cookie-message__button");
      acceptButton.innerHTML = "Принять";
      acceptButton.addEventListener("click", () => {
        Cookies.set("cookieConsent", "true", { expires: 30 });
        cookieMessage.remove();
      });
      cookieMessage.appendChild(acceptButton);

      document.body.appendChild(cookieMessage);
    }
  }, []);

  return null;
}

export default CookieMessage;