// src/components/GEOSEO.js
import { useEffect } from 'react';

const GEOSEO = () => {
  useEffect(() => {
    // Создаём скрипт только на клиенте
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ComputerStore",
      "name": "ServiceBox",
      "url": "https://servicebox35.ru",
      "telephone": "+79115018828",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Вологда",
        "addressRegion": "Вологодская область",
        "addressCountry": "RU"
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default GEOSEO;