import { Link } from "react-router-dom";
import "./Footer.css";
import Oplata from "../../images/ruble.svg";
import Sbp from "../../images/MNP.svg";
import Beznal from "../../images/Payment methods.svg";
import Dolyami from '../../images/Dolyame.svg'
import InteractiveMap from '../InteractiveMap/InteractiveMap';
//import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__map">
       <InteractiveMap />
        <div className="footer__info">
          <p className="footer__title">
            Название организации: ООО "СЕРВИС БОКС"
            ИНН: 3525475916
            КПП: 352501001
            ОГРН: 1213500018522
          </p>
         
          <Link to="/privacy-policy" className="footer__link"> Политика конфиденциальности</Link>
          <div className="foooter__oplata">
       <h3 className="oplata__title"> Удобные способы оплаты </h3>
       <ul className="oplata__list">
     
         <li className="oplata__item">
           <img className="oplata__image" src={Beznal} alt="Paypal" />
         </li>
      
       </ul>
        </div>
        </div>
       
      </div>
      <p className="footer__author">&copy;Кознова T.А. 2023</p>
    </footer>
  );
}

export default Footer;