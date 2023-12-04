import React, { useEffect } from "react";
import "./CookieMessage.css";

function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

function CookieMessage() {
  useEffect(() => {
    const cookieConsent = getCookie("cookieConsent");
    if (cookieConsent !== "true") {
      const cookieMessage = document.createElement("div");
      cookieMessage.classList.add("cookie-message");
      
      const cookieText = document.createElement("div");
      cookieText.classList.add("cookie-message__text");
      cookieText.innerHTML =
        'Мы используем куки для улучшения Вашего опыта на сайте. Нажимая "Принять", Вы соглашаетесь с использованием куки.';
      cookieMessage.appendChild(cookieText);

      const acceptButton = document.createElement("button");
      acceptButton.classList.add("cookie-message__button");
      acceptButton.innerHTML = "Принять";
      acceptButton.addEventListener("click", () => {
        setCookie("cookieConsent", "true", 30);
        cookieMessage.remove();
      });
      cookieMessage.appendChild(acceptButton);

      document.body.appendChild(cookieMessage);
    }
  }, []);

  return null;
}

export default CookieMessage;