import React, { useEffect, useState } from 'react';
import './NddDeliveryWidget.css';

const NddDeliveryWidget = () => {
  const [response, setResponse] = useState(null);
ymaps = window.Map;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://ndd-widget.landpro.site/widget.js';
    script.async = true;

    // Function to initialize widget
    script.onload = () => {
      if (window.YaDelivery) {
        window.YaDelivery.createWidget({
          containerId: 'delivery-widget',
          params: {
            city: "Вологда",
            size: {
              height: "450px",
              width: "100%",
            },
            delivery_price: "от 100",
            delivery_term: "от 1 дня",
            show_select_button: true,
            filter: {
              type: ["pickup_point", "terminal"],
              is_yandex_branded: false,
              payment_methods: ["already_paid", "card_on_receipt"],
              payment_methods_filter: "or",
            },
          },
        });

        // Checking for ymaps and SuggestView
        if (window.ymaps && window.ymaps.SuggestView) {
          new window.ymaps.SuggestView('your-suggest-view'); // Replace 'your-suggest-view' with the actual element ID
        } else {
          console.error('ymaps or ymaps.SuggestView is undefined');
        }
      } else {
        console.error('window.YaDelivery is undefined');
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleOrder = async () => {
    // Обработка заказа и назначение доставки
    console.log('Заказать доставку, использовав данные:', response);
  };

  return (
    <div>
      <h2>Доставка</h2>
      <div id="delivery-widget" style={{ width: '100%', height: '450px' }}></div>
      {response && (
        <div>
          <p>ID: {response.id}</p>
          <p>Полный адрес: {response.address.full_address}</p>
          <p>Страна: {response.address.country}</p>
          <p>Город: {response.address.locality}</p>
          <p>Улица: {response.address.street}</p>
          <p>Дом: {response.address.house}</p>
          <p>Комментарий: {response.address.comment}</p>
        </div>
      )}
      <button onClick={handleOrder}>Заказать доставку</button>
    </div>
  );
};

export default NddDeliveryWidget;