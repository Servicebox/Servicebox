import { Link } from "react-router-dom";
import "./Footer.css";
import { useState, useEffect } from "react";
import Oplata from "../../images/ruble.svg";
import Sbp from "../../images/MNP.svg";
import Beznal from "../../images/Payment methods.svg";
import Dolyami from '../../images/Dolyame.svg';
import InteractiveMap from '../InteractiveMap/InteractiveMap';


function Footer() {
  const [taxiLoaded, setTaxiLoaded] = useState(false);
  const [geoError, setGeoError] = useState(null);

  const loadTaxiWidget = () => {
    if (!window.YaTaxi) {
      const script = document.createElement('script');
      script.src = "https://yastatic.net/taxi-widget/ya-taxi-widget-v2.js";
      script.async = true;
      script.onload = () => setTaxiLoaded(true);
      script.onerror = () => setGeoError('Ошибка загрузки сервиса такси');
      document.body.appendChild(script);
    } else {
      setTaxiLoaded(true);
    }
  };

  useEffect(() => {
    if (taxiLoaded) {
      navigator.geolocation.getCurrentPosition(
        () => {},
        (error) => {
          setGeoError(`Ошибка геолокации: ${error.message}`);
        },
        { 
          timeout: 10000,
          maximumAge: 60000 
        }
      );
    }
  }, [taxiLoaded]);

  return (
    <footer className="footer">
      <div className="footer__map">
        <InteractiveMap />
        
        <button 
          className="taxi-load-button"
          onClick={loadTaxiWidget}
          aria-label="Показать виджеты такси"
        >
          Показать такси
        </button>

        {taxiLoaded && !geoError && (
          <div className="taxi-widget-container">
            <div 
              className="ya-taxi-widget"
              data-ref="https%3A%2F%2Fservicebox35.ru"
              data-tariff="econom"
              data-app="3"
              data-lang="ru"
              data-erid="12114994"
              data-redirect="1178268795219780156"
              data-description="Северная улица, 7А"
              data-size="s"
              data-theme="dark"
              data-title="Go ServiceBox"
              data-use-location="true"
              data-point-b="39.929117,59.216807"
            ></div>

            <div 
              className="ya-taxi-widget"
              data-ref="12114993"
              data-tariff="econom"
              data-app="3"
              data-lang="ru"
              data-redirect="1178268795219780156"
              data-description="улица Ленина, 6"
              data-size="s"
              data-theme="dark"
              data-title="Go ServiceBox"
              data-use-location="true"
              data-point-b="39.894388,59.220814"
            ></div>
          </div>
        )}

        {geoError && (
          <div className="geo-error">
            {geoError}. 
            <button onClick={() => window.location.reload()}>
              Попробовать снова
            </button>
          </div>
        )}

        <div className="footer__contacts">
          <a 
            className="go" 
            href="https://yandex.go.link/?adj_t=i6qgxe_vlce30&adj_adgroup=12114994&adj_campaign=12114994"
          >
          
          </a>
        </div>
      </div>

      <div className="footer__content">
        <div className="footer__info">
          <div className="company-info">
            <h3 className="info-title">Реквизиты компании</h3>
            <p className="footer__text">
              Название организации: ООО "СЕРВИС БОКС"<br/>
              ИНН: 3525475916<br/>
              КПП: 352501001<br/>
              ОГРН: 1213500018522
            </p>
          </div>

          <Link to="/privacy-policy" className="privacy-link">
            Политика конфиденциальности
          </Link>
        </div>

        <div className="payment-section">
          <h3 className="payment-title">Удобные способы оплаты</h3>
          <div className="payment-methods">
            <img className="payment-logo" src={Beznal} alt="Безналичный расчет" />
            <img className="payment-logo" src={Sbp} alt="СБП" />
            <img className="payment-logo" src={Dolyami} alt="Долями" />
            <img className="payment-logo" src={Oplata} alt="Наличные" />
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__author">&copy; Кознова T.А. 2023</p>
      </div>
    </footer>
  );
}

export default Footer;