// components/ServicePricePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ServicePricePage.css';
import { motion } from 'framer-motion';

const ServicePricePage = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Все');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Маппинг категорий для отображения с иконками
    const categoryDisplayData = {
        'Ноутбук': { name: 'Ноутбуки', icon: '💻' },
        'Моноблок': { name: 'Компьютеры и моноблоки', icon: '🖥️' },
        'Аппл': { name: 'Apple техника', icon: '🍎' },
        'Телефон': { name: 'Телефоны', icon: '📱' },
        'Планшеты': { name: 'Планшеты', icon: '📱' },
        'Телевизор': { name: 'Телевизоры', icon: '📺' },
        'Замена стекла': { name: 'Замена стекла', icon: '🔍' },
        'Видеокарты': { name: 'Видеокарты', icon: '🎮' },
        'Другие': { name: 'Другие устройства', icon: '🔌' }
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('https://servicebox35.pp.ru/services');
                // Фильтруем услуги с невалидными данными
                const validServices = response.data.filter(service =>
                    service.serviceName && service.description
                );

                setServices(validServices);
                setFilteredServices(validServices);

                // Извлекаем уникальные категории
                const uniqueCategories = [...new Set(validServices.map(s => s.category))];
                setCategories(['Все', ...uniqueCategories]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching services:', error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        let result = services;

        // Фильтрация по категории
        if (selectedCategory !== 'Все') {
            result = result.filter(service =>
                service.category === selectedCategory
            );
        }

        // Фильтрация по поисковому запросу (с защитой от undefined)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(service => {
                const name = service.serviceName?.toLowerCase() || '';
                const desc = service.description?.toLowerCase() || '';
                return name.includes(query) || desc.includes(query);
            });
        }

        setFilteredServices(result);
    }, [searchQuery, selectedCategory, services]);

    // Форматирование цены с добавлением знака рубля
    const formatPrice = (price) => {
        if (!price) return '';
        // Если цена уже содержит знак рубля, оставляем как есть
        if (price.includes('₽') || price.includes('руб')) return price;

        // Добавляем знак рубля к числовым значениям
        return `${price} ₽`;
    };

    // Анимация появления элементов
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <motion.div
                className="service-price-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Загружаем услуги...</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="service-price-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="price-header">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    Цены на услуги
                </motion.h1>
                <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Прозрачное ценообразование без скрытых платежей
                </motion.p>
            </div>

            <div className="controls-container">
                <motion.div
                    className="search-container"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <input
                        type="text"
                        placeholder="🔍 Поиск услуги..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </motion.div>

                <motion.div
                    className="category-filter"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {categories.map(category => (
                        <motion.button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category === 'Все' ? 'Все' : (
                                <>
                                    <span className="category-icon">{categoryDisplayData[category]?.icon || '📋'}</span>
                                    {categoryDisplayData[category]?.name || category}
                                </>
                            )}
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {filteredServices.length === 0 ? (
                <motion.div
                    className="no-results"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <h3>Услуги не найдены</h3>
                    <p>Попробуйте изменить критерии поиска или выбрать другую категорию</p>
                </motion.div>
            ) : (
                <motion.div
                    className="services-grid"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {filteredServices.map(service => (
                        <motion.div
                            key={service._id}
                            className="service-card"
                            variants={item}
                            whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
                        >
                            <div className="card-header">
                                <h3>{service.serviceName}</h3>
                                <span className="price-tag">{formatPrice(service.price)}</span>
                            </div>
                            <div className="card-body">
                                <p className="description">{service.description}</p>
                                <div className="category-badge">
                                    {categoryDisplayData[service.category]?.icon || '📋'}
                                    {categoryDisplayData[service.category]?.name || service.category}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default ServicePricePage;