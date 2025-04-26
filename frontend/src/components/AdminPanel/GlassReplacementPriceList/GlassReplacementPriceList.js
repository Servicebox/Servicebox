import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./GlassReplacementPriceList.css"
import Search from "../../Search/Search"
import { BrowserRouter as Router, Link, useLocation, NavLink } from "react-router-dom";

const GlassReplacementPriceList = () => {
  const [glassPrices, setGlassPrices] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const getCategoryGlassPrices = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/services/Замена стекла на телефонах');
        setGlassPrices(response.data);
      } catch (error) {
        console.error('Error fetching glass replacement prices: ', error);
      }
    };
    getCategoryGlassPrices();
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleHideAll = () => {
    setShowAll(false);
  };

  const filteredGlassPrices = glassPrices.filter((glassPrice) => {
    return glassPrice.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className='glass'>
      <h1 className='glass__title'>Цены на замену стекла Iphone, Apple Watch, Samsung</h1>
      <p className='about__subtitle'> Замена стекла на телефоне производится в течении дня, если аппарат сдали до 13-00!
        Заменастекла необходима когда разбился тачскрин, на нем появились трещины, сколы, глубокие царапины и при этом экран показывает. Такое часто случается при падении телефона и других механических повреждениях.</p>
      <h3 className='about__text'>Как проходит срез стекла</h3>
      <p className='about__subtitle'>
        Срез стекла является сложной процедурой, которую выполняют только профессионалы по особой технологии. В работе используется специализированное оборудование и расходные материалы. Замена стекла в нашем сервисном центре проходит в несколько этапов:
      </p>
      <p className='about__subtitle'>- Разбираем телефон или планшет и аккуратно достаем дисплей.</p>
      <p className='about__subtitle'> - Расслаиваем его, на машинке сепараторе или используем специальную машинку которая охлаждает дисплей до -150С
        Переклейка стекла на телефоне- С помощью специальных жидкостей убираем остатки старого клея ОСА, который соединял элементы дисплейного модуля        и убирал воздушное пространство между модулем и стеклом.</p>
      <p className='about__subtitle'>- В беспылевой комнате наносим новую ОСА пленку, устанавливаем новое стекло.</p>
      <p className='about__subtitle'> - Ламинируем, выкачиваем воздух в специальном ламинаторе под давлениием в 5 атмосфер и убираем пузырьки воздуха.</p>
      <p className='about__subtitle'> - Собираем телефон.</p>

      <p className='about__subtitle'>После выполнения всей процедуры замены стекла ваш дисплей снова в рабочем состоянии и без трещин, и вы сможете снова комфортно его использовать. Стоимость такого ремонта будет в разы ниже установки нового дисплея, а в некоторых случаях - единственной возможностью        восстановить телефон.</p>
      <span className="smaller-font">По другим моделям уточняйте по номеру телефона 8911 501 88 28</span>
      <Search className="search__product" value={searchQuery} onChange={handleSearch} placeholder="Поиск по названию" />
      <table>
        <thead>
          <tr>
            <th>Название услуги</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {filteredGlassPrices.slice(0, showAll ? filteredGlassPrices.length : 15).map((glassPrice) => (
            <tr key={glassPrice._id}>
              <td>{glassPrice.serviceName}</td>
              <td>{glassPrice.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!showAll ? (
        <button className='glass__btn-active' onClick={handleShowAll}>Посмотреть прайс</button>
      ) : (
        <button className='glass__btn' onClick={handleHideAll}>Скрыть прайс</button>
      )}
      <p className='glass__sabtitle-one'>* - время ремонта может меняться в зависимости от модели устройства и сложности проводимых работ</p>
      <p className='glass__sabtitle'>Информация о ценах, возможных выгодах и условиях приобретения доступна в сервисном центре Servicebox. Не является публичной офертой.</p>
      <div className="back__btn">
        <ul>
          <li><Link to="/">На главную</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GlassReplacementPriceList;