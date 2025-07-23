// components/ServiceCategoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './ServiceCategoryPage.css';

const ServiceCategoryPage = () => {
    const { categoryId } = useParams();
    const [services, setServices] = useState([]);
    const [categoryInfo, setCategoryInfo] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(true);

    // Данные для разных категорий
    const categoryData = {
        'notebook': {
            title: "Ремонт ноутбуков",
            description: "Осуществляем ремонт бюджетных и игровых ноутбуков любой сложности на профессиональном оборудовании",
            image: "notebook-bg.jpg"
        },
        'monoblock': {
            title: "Ремонт компьютеров и моноблоков",
            description: "Профессиональный ремонт системных блоков и моноблоков",
            image: "monoblock-bg.jpg"
        },
        // Добавьте данные для других категорий...
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const categoryName = getCategoryName(categoryId);
                const response = await axios.get(`https://servicebox35.pp.ru/services/${categoryName}`);
                setServices(response.data);
                setCategoryInfo(categoryData[categoryId] || {});
                setLoading(false);
            } catch (error) {
                console.error('Error fetching services:', error);
                setLoading(false);
            }
        };

        fetchServices();
    }, [categoryId]);

    const getCategoryName = (id) => {
        const mapping = {
            'notebook': 'Ноутбук',
            'monoblock': 'Моноблок',
            'appl': 'Аппл',
            'telephone': 'Телефон',
            'tablet': 'Планшеты',
            'tv': 'Телевизор',
            'glass': 'Замена стекла',
            'videocard': 'Видеокарты',
            'other': 'Другие'
        };
        return mapping[id] || id;
    };

    const filteredServices = services.filter(service => 
        service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (e) => setSearchQuery(e.target.value);
    const toggleShowAll = () => setShowAll(!showAll);

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <div className="service-category-page">
            <div className="category-header" style={{ backgroundImage: `url(${categoryInfo.image})` }}>
                <div className="header-content">
                    <h1>{categoryInfo.title}</h1>
                    <p>{categoryInfo.description}</p>
                </div>
            </div>

            <div className="category-content">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="🔍 Поиск услуги..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                <div className="services-table">
                    <div className="table-header">
                        <div>Название услуги</div>
                        <div>Цена</div>
                    </div>
                    
                    <div className="table-body">
                        {filteredServices
                            .slice(0, showAll ? filteredServices.length : 15)
                            .map(service => (
                                <div key={service._id} className="service-row">
                                    <div>{service.serviceName}</div>
                                    <div>{service.price}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <button className="toggle-btn" onClick={toggleShowAll}>
                    {showAll ? 'Скрыть прайс' : 'Посмотреть весь прайс'}
                </button>

                <div className="disclaimer">
                    <p>* Время ремонта может меняться в зависимости от модели устройства и сложности работ</p>
                    <p>Информация о ценах доступна в сервисном центре Servicebox. Не является публичной офертой.</p>
                </div>

                <div className="back-link">
                    <Link to="/">← На главную</Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCategoryPage;