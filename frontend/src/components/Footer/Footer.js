import { Link } from "react-router-dom";
import "./Footer.css";
import { useEffect } from "react";
import Oplata from "../../images/ruble.svg";
import Sbp from "../../images/MNP.svg";
import Beznal from "../../images/Payment methods.svg";
import Dolyami from '../../images/Dolyame.svg';
import InteractiveMap from '../InteractiveMap/InteractiveMap';


function Footer() {
  useEffect(() => {
    // Динамическая загрузка скрипта Яндекс Такси
    const script = document.createElement('script');
    script.src = "https://yastatic.net/taxi-widget/ya-taxi-widget-v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer__map">
        <InteractiveMap />
        
        <div className="taxi-widget-container">
          <div 
            className="ya-taxi-widget"
            data-ref="https%3A%2F%2Fservicebox35.ru"
            data-proxy-url="https://{app}.redirect.appmetrica.yandex.com/route?start-lat={start-lat}&amp;start-lon={start-lon}&amp;end-lat={end-lat}&amp;end-lon={end-lon}&amp;tariffClass={tariff}&amp;ref={ref}&amp;appmetrica_tracking_id={redirect}&amp;lang={lang}&amp;erid={erid}"
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
            data-point-a=""
            data-point-b="39.929117,59.216807"
          ></div>
           <div 
            className="ya-taxi-widget"
            data-ref="12114993"
            data-proxy-url="https://{app}.redirect.appmetrica.yandex.com/route?start-lat={start-lat}&amp;start-lon={start-lon}&amp;end-lat={end-lat}&amp;end-lon={end-lon}&amp;tariffClass={tariff}&amp;ref={ref}&amp;appmetrica_tracking_id={redirect}&amp;lang={lang}&amp;erid={erid}"
            data-tariff="econom"
            data-app="3"
            data-lang="ru"
            data-redirect="1178268795219780156"
            data-description="улица Ленина, 6"
            data-size="s"
            data-theme="dark"
            data-title="Go ServiceBox"
            data-use-location="true"
            data-point-a=""
            data-point-b="39.894388,59.220814"
          ></div>
        </div>
          <div className="taxi-widget-container">
        
        </div>

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