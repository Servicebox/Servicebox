import React, { useEffect, useState, useRef } from 'react';

const InteractiveMap = () => {
  const [addresses] = useState([
    'Вологда, ул. Северная 7А, 405',
    'Вологда, ул. Ленина, 6'
  ]);
  const [coordinates, setCoordinates] = useState([]);
  const mapRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const geocodeAddress = async (addr) => {
    try {
      const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=861b9258-9411-4580-8524-6ead04fc0195&format=json&geocode=${encodeURIComponent(addr)}`);
      const data = await response.json();
      const pos = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
      return [parseFloat(pos[1]), parseFloat(pos[0])];
    } catch (error) {
      console.error('Ошибка при геокодировании:', error);
      return null;
    }
  };

  useEffect(() => {
    if (window.ymaps) {
      setIsMapReady(true);
      return;
    }

    const loadScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1.78/?apikey=861b9258-9411-4580-8524-6ead04fc0195&lang=ru_RU`;
        script.async = true;
        script.onload = () => {
          window.ymaps.ready(() => {
            setIsMapReady(true);
            resolve();
          });
        };
        document.head.appendChild(script);
      });
    };

    loadScript().catch(error => console.error('Ошибка при загрузке Яндекс.Карт', error));
  }, []);

  useEffect(() => {
    if (!isMapReady) return;

    const updateCoordinates = async () => {
      const newCoordinates = await Promise.all(addresses.map(geocodeAddress));
      setCoordinates(newCoordinates.filter(coord => coord !== null));
    };

    updateCoordinates();
  }, [isMapReady, addresses]);

  useEffect(() => {
    if (!isMapReady || coordinates.length === 0) return;

    if (!mapRef.current) {
      mapRef.current = new window.ymaps.Map('map', {
        center: coordinates[0],
        zoom: 12
      });
    }

    mapRef.current.geoObjects.removeAll();

    coordinates.forEach((coord, index) => {
      const placemark = new window.ymaps.Placemark(coord, {
        hintContent: `ООО "СЕРВИС БОКС" (${addresses[index]})`,
        balloonContent: `Наш офис: ${addresses[index]}`
      });
      mapRef.current.geoObjects.add(placemark);
    });

    if (coordinates.length > 1) {
      mapRef.current.setBounds(mapRef.current.geoObjects.getBounds());
    }
  }, [isMapReady, coordinates, addresses]);

  return (
    <div>
      <div id="map" style={{ width: '300px', height: '300px', borderRadius:'15%' }}></div>
      <p>Статус загрузки карты: {isMapReady ? 'Готова' : 'Загрузка...'}</p>
      <p>Количество координат: {coordinates.length}</p>
    </div>
  );
};

export default InteractiveMap;