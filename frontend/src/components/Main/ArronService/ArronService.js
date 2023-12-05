import React from "react";
import "./ArronnService.css";

import Experienced from "../../../images/experienced.svg"
import Diagnostics from "../../../images/diagnostics.svg"
import ExpressRepair from "../../../images/expressrepair.svg"
import Protection from "../../../images/protection.svg"
import Original from "../../../images/original.svg"
import FixedPrice from "../../../images/fixedprice.svg"
import Status from "../../../images/status1.svg"
import AvailabilityParts from "../../../images/availabilityparts.svg"
import Save from "../../../images/save.svg"
import Payment from "../../../images/payment.svg"

function ArronService() { 
    return(
<section className="arron-service">
<div className="arron-service__content">
<h2 className="arron-service__title-text">Наши приемущества</h2>

<ul className="arron-service__list" >
     
      <li className="arron-service__list-item">
       <img src={Experienced} className="arron-service__img" alt="experienced" />
       <p className="arron-servise_text"> Опыт работы более 10 лет </p>
      </li>
      <li className="arron-service__list-item">
      <img src={Diagnostics} className="arron-service__img" alt="diagnostics" />
       <p className="arron-servise_text"> Бесплатная диагностика любой сложности </p>
      </li>
      <li className="arron-service__list-item">
      <img src={ExpressRepair} className="arron-service__img" alt="express repair" />
       <p className="arron-servise_text"> Экспресс реемонт от 20 минут </p>
      </li>
      <li className="arron-service__list-item">
      <img src={Protection} className="arron-service__img" alt="protection" />
       <p className="arron-servise_text"> Сохраним пыле-и влагозащиту </p>
      </li>
      <li className="arron-service__list-item">
      <img src={Original} className="arron-service__img" alt="original" />
       <p className="arron-servise_text"> Гарантия и оригинальные запчасти </p>
      </li>
      <li className="arron-service__list-item">
      <img src={FixedPrice} className="arron-service__img" alt="fixed price" />
       <p className="arron-servise_text"> Фиксированная цена </p>
      </li>
      <li className="arron-service__list-item">
      <img src={Status} className="arron-service__img" alt="status" />
       <p className="arron-servise_text"> Вы можете отлсеживать статус ремонта на сайте</p>
      </li>
      <li className="arron-service__list-item">
      <img src={AvailabilityParts} className="arron-service__img" alt="availability parts" />
       <p className="arron-servise_text"> Всегда в наличии запчасти на популярные модели </p>
      </li>
      <li className="arron-service__list-item">
      <img src={Save} className="arron-service__img" alt="save" />
       <p className="arron-servise_text"> Ремонт без потери данных </p>
      </li>
      <li className="arron-service__list-item">
      <img src={Payment} className="arron-service__img" alt="payment" />
       <p className="arron-servise_text"> Оплата после выполнения работы </p>
      </li>
    </ul>
    </div>
</section>
    )
}
export default ArronService