import React, { useRef , forwardRef} from "react";
import "./AboutRef.css";
import Clock from "../../../images/clock.svg";
import Card from "../../../images/Card.svg";
import Secure from "../../../images/secure.svg";

const AboutRef = forwardRef((_props, ref) => {
    return (
        <section id="aboutRef" className="aboutRef" ref={ref}>
      <div className="about__content">
<h2 id="about-title" className="about__title">О компании ServiceBox
</h2>
<h3 className="about__text">
Быстрый и профессиональный ремонт в Вологде!</h3>
<h4 className="about__text">
ServiceBox открывает двери новой мастерской, расширяя спектр услуг! Теперь мы предлагаем быстрый и профессиональный ремонт видеокарт, ASICов, ноутбуков, материнских плат, ПК.</h4>
<p className="about__subtitle">Ищете надежный сервисный центр для ремонта Вашей цифровой техники?
Добро пожаловать в сервисный центр "ServiceBox"!
Мы специализируемся на быстром и профессиональном ремонте ноутбуков, видеокарт, мобильных телефонов и
планшетов.
Наша главная цель - обеспечить удобство для наших клиентов.
</p>
<p className="about__subtitle">
    Мы также понимаем важность разумного подхода к ценообразованию.
    В "ServiceBox" мы выбираем взвешенную ценовую политику,
    чтобы цены на ремонт телефонов, планшетов и ноутбуков
    были адекватны стоимости самих гаджетов.
    Вы можете быть уверены, что не будет никаких скрытых комиссий или
    неожиданных повышений стоимости работ после установления причины поломки.</p>

<h3 className="about__text">Почему стоит выбрать нашу мастерскую по ремонту цифровой техники?</h3> 
<p className="about__subtitle">
    В "ServiceBox" мы гордимся тем, что беремся даже за самые безнадежные случаи.
    Наша команда квалифицированных мастеров имеет более 10-летний опыт в ремонте мобильных телефонов,
    планшетов и ноутбуков в Вологде.
    Вы можете связаться с нами через наш сайт и получить консультацию 
    в режиме онлайн.
    Доверьте свои гаджеты "ServiceBox" - Ваша техника будет в надежных руках.
</p>
<div className="about__tech">
    <div className="about__tech_content">
<img src={Clock} className="about__image" alt="Clock" />
<h3 className="about__text-tech"> Работы от 30 минут</h3>
<p className="about__subtitle">Время работы или настройки занимает
от 30 минут до несколько часов.</p>
</div>
<div className="about__tech_content">
<img src={Card} className="about__image" alt="Card" />
<h3 className="about__text-tech"> Удобный способ оплаты</h3>
<p className="about__subtitle">Оплата наличными или по перечеслению компаниям.</p>
</div>
<div className="about__tech_content">
<img src={Secure} className="about__image" alt="Secure" />
<h3 className="about__text-tech"> Гарантия на все выполненые услуги</h3>
<p className="about__subtitle">Запчасти, фотографии и сообщения под Вашим контролем. После работ инженер отдаст Вам старые запчасти.</p>
</div>
</div>

</div>
</section>
  );
});

export default AboutRef