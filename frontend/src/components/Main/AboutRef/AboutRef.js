import React, { useRef, forwardRef } from "react";
import "./AboutRef.css";
import Clock from "../../../images/clock.svg";
import Card from "../../../images/Card.svg";
import Secure from "../../../images/secure.svg";

const AboutRef = forwardRef((_props, ref) => {
    return (
        <section id="aboutRef" className="aboutRef" ref={ref}>
            <div className="about__content">
                <h2 id="about-title" className="animated-title">О компании ServiceBox
                </h2>
                <h3 className="about__text">
                    Быстрый и профессиональный ремонт в Вологде!</h3>
                <h4 className="about__text">
                    ServiceBox открывает двери новой мастерской, расширяя спектр услуг! Теперь мы предлагаем быстрый и профессиональный ремонт видеокарт, ноутбуков, материнских плат, ПК, игровых консолей Sony, X-box, техники Apple, телефонов, планшетов, телевизоров.</h4>
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
                 <div className="features-grid">
                    <div className="feature-card">
                        <img src={Clock} className="feature-icon pulse" alt="Быстрый ремонт" />
                        <h3>Ремонт от 30 минут</h3>
                        <p>Срочный ремонт без очередей - большинство работ выполняем при вас</p>
                    </div>
                    
                    <div className="feature-card">
                        <img src={Secure} className="feature-icon" alt="Гарантия качества" />
                        <h3>Гарантия до 12 месяцев</h3>
                        <p>Даём официальную гарантию на все виды работ и запчасти</p>
                    </div>
                    
                    <div className="feature-card">
                        <img src={Card} className="feature-icon" alt="Удобная оплата" />
                        <h3>Любые формы оплаты</h3>
                        <p>Наличные, карты, безнал для юрлиц - вам решать как платить</p>
                    </div>
                </div>

                <div className="repair-services">
                    <h2>Что мы ремонтируем:</h2>
                    <ul className="services-list">
                        <li>💻 Ноутбуки всех брендов</li>
                        <li>🎮 Игровые консоли PlayStation/Xbox</li>
                        <li>📱 Смартфоны и планшеты</li>
                        <li>🖥️ Видеокарты и материнские платы</li>
                        <li> Техника Apple</li>
                        <li>📺 Телевизоры и мониторы</li>
                    </ul>
                </div>

            </div>
        </section>
    );
});

export default AboutRef