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
import Acer from "../../../images/acer.png.webp"
import Apple from "../../../images/apple.png.webp"
import Asus from "../../../images/asus.png.webp"
import Dell from "../../../images/dell.png.webp"
import Hp from "../../../images/hp.png.webp"
import Lenovo from "../../../images/lenovo.png.webp"
import Samsung from "../../../images/samsung.png.webp"
import Sony from "../../../images/sony.png.webp"
import Toshiba from "../../../images/tosh.png.webp"
import Xiaomi from "../../../images/xiaomi.png.webp"
import Fujitsu from "../../../images/fujitsu.png.webp"
import Gigabyte from "../../../images/gigabyte.png.webp"
import Honor from "../../../images/honor.png.webp"
import Huawei from "../../../images/huaw.png.webp"
import Lg from "../../../images/lg.png.webp"
import Msi from "../../../images/msi.png.webp"


import BenQ from "../../../images/benq.png.webp"
import ViewSonic from "../../../images/viewsonic.png.webp"
import Philips from "../../../images/philips.png.webp"
import Panasonic from "../../../images/panasonic.png.webp"


function ArronService() { 
    const brands = [
        { name: "Acer", image: Acer },
        { name: "Apple", image: Apple },
        { name: "Asus", image: Asus },
        { name: "Dell", image: Dell },
        { name: "HP", image: Hp },
        { name: "Huawei", image: Huawei },
        { name: "Lenovo", image: Lenovo },
        { name: "Xiaomi", image: Xiaomi },
        { name: "MSI", image: Msi },
        { name: "Samsung", image: Samsung },
        { name: "Sony", image: Sony },
        { name: "Toshiba", image: Toshiba },
        { name: "LG", image: Lg },
        { name: "Philips", image: Philips },
        { name: "Panasonic", image: Panasonic },
        { name: "BenQ", image: BenQ },
        { name: "ViewSonic", image: ViewSonic },
        { name: "Gigabyte", image: Gigabyte },
        { name: "Fujitsu", image: Fujitsu },
        { name: "Honor", image: Honor },
       
      
    ];

    const advantages = [
        { icon: Experienced, text: "Опыт работы более 10 лет" },
        { icon: Diagnostics, text: "Бесплатная диагностика любой сложности" },
        { icon: ExpressRepair, text: "Экспресс ремонт от 20 минут" },
        { icon: Protection, text: "Сохраним пыле- и влагозащиту" },
        { icon: Original, text: "Гарантия и оригинальные запчасти" },
        { icon: FixedPrice, text: "Фиксированная цена" },
        { icon: Status, text: "Вы можете отслеживать статус ремонта на сайте" },
        { icon: AvailabilityParts, text: "Всегда в наличии запчасти на популярные модели" },
        { icon: Save, text: "Ремонт без потери данных" },
        { icon: Payment, text: "Оплата после выполнения работы" }
    ];

    return (
        <section className="arron-service">
            <div className="arron-service__content">
                <h2 className="animated-title">Наши преимущества</h2>

                <ul className="arron-service__list">
                    {advantages.map((advantage, index) => (
                        <li key={index} className="arron-service__list-item">
                            <img src={advantage.icon} className="arron-service__img" alt="" />
                            <p className="arron-servise_text">{advantage.text}</p>
                        </li>
                    ))}
                </ul>

                <div className="arron-service__brands">
                    <h2 className="animated-title">Ремонтируем и обслуживаем<br></br>
                    все бренды в Вологде</h2>
                    <p className="brands-subtitle">
                        Если Вы не нашли свой бренд цифровой техники - не расстраивайтесь!<br />
                        Наши мастера обслужат технику любого бренда.
                    </p>
                    <p className="brands-subtitle">
                        Независимо от того, что сломалось —
                        специалисты справятся с любой задачей.
                        Беремся за ремонт и замену матриц, экранов,
                        системных и материнских плат, блоков питания и управления, контроллеров и процессоров, различных разъемов от 
                        различной цифровой техники. И наконец, стоит отметить прозрачную ценовую политику и фирменную гарантию на все виды работ,
                        а также на установленные детали. Это значит, что вы можете быть уверены: ваше устройство будет работать как новенькое без лишних затрат.
                        Так что если ваша техника дала сбой — не паникуйте! Доверьтесь профессионалам из сервисного центра “Servicebox” и наслаждайтесь дальше эксплуатацией
                        своих гаджетов!
                    </p>
                    
                    <div className="brand-grid">
                        {brands.map((brand, index) => (
                            <div key={index} className="brand-item">
                                <div className="brand-image-container">
                                    <img src={brand.image} alt={brand.name} className="brand-logo" />
                                </div>
                                <span className="brand-name"> {brand.name}</span>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default ArronService