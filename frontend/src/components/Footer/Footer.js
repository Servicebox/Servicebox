import { Link } from "react-router-dom";
import "./Footer.css";
//import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__map">
        <iframe
          className="footer__map-card"
          src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=58578899506"
        ></iframe>
        <div className="footer__info">
          <p className="footer__title">
            Название: ООО "СЕРВИС БОКС"
            ИНН: 3525475916
            КПП: 352501001
            ОГРН: 1213500018522
          </p>
          <p className="footer__author">&copy;Кознова T.А. 2023</p>
          <Link to="/privacy-policy" className="footer__link">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;