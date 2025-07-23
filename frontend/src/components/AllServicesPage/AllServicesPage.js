 // components/ServicesGrid/ServicesGrid.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AllServicesPage.css';
import BookingForm from "../BookingForm/BookingForm";
// Импортируем изображения
import Notebook from "../../images/notebook.webp";
import Monoblok from "../../images/monoblok.webp";
import Applefon from "../../images/apple.webp";
import Android from "../../images/android.webp";
import Tablet from "../../images/tablet.webp";
import Tv from "../../images/tv.webp";
import Glass from "../../images/glass.webp";
import Videocard from "../../images/videocard.webp";
import Devices from "../../images/Devices.webp";
const AllServicesPage = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Все');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
     const [activeService, setActiveService] = useState(null);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
     const [bookingSuccess, setBookingSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);
  
    // Обработчик открытия формы записи
    const handleBookingClick = (service, e) => {
        e.stopPropagation(); // Предотвращаем всплытие события
        setSelectedService(service);
        setIsBookingFormOpen(true);
    };

    // Обработчик успешной записи
const handleBookingSuccess = (bookingData) => {
  alert(`Запись создана! Ваш код: ${bookingData.trackingCode}`);
  setIsBookingFormOpen(false);
};

    // Данные категорий
    const categoryData = {
           'Ноутбук': { icon: Notebook, color: '#4e73df', name: 'Ноутбуки' },
        'Моноблок': { icon: Monoblok, color: '#1cc88a', name: 'Компьютеры и моноблоки' },
        'Аппл': { icon: Applefon, color: '#36b9cc', name: 'Apple техника' },
        'Телефон': { icon: Android, color: '#f6c23e', name: 'Телефоны' },
        'Планшеты': { icon: Tablet, color: '#e74a3b', name: 'Планшеты' },
        'Телевизор': { icon: Tv, color: '#6f42c1', name: 'Телевизоры' },
        'Замена стекла': { icon: Glass, color: '#fd7e14', name: 'Замена стекла' },
        'Видеокарты': { icon: Videocard, color: '#20c997', name: 'Видеокарты' },
        'Другие': { icon: Devices, color: '#6610f2', name: 'Другие устройства' },
        'Замена переднего стекла на телефонах': { icon: Glass, color: '#e83e8c', name: 'Замена стекла' }
    };
    // Группировка услуг по категориям
    const groupedServices = useMemo(() => {
        const groups = {};
        
        filteredServices.forEach(service => {
            const category = service.category || 'Другие';
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(service);
        });
        
        return groups;
    }, [filteredServices]);
 
 
 useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('https://servicebox35.pp.ru/services');
                const data = await response.json();
                
                // Фильтрация невалидных услуг
                const validServices = data.filter(service => 
                    service.serviceName && service.description
                );
                
                setServices(validServices);
                setFilteredServices(validServices);
                
                // Извлечение уникальных категорий
                const uniqueCategories = [...new Set(validServices.map(s => s.category || 'Другие'))];
                setCategories(['Все', ...uniqueCategories]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching services:', error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Обработка фильтрации
    useEffect(() => {
        let result = services;
        
        // Фильтрация по категории
        if (selectedCategory !== 'Все') {
            result = result.filter(service => 
                service.category === selectedCategory
            );
        }
        
        // Фильтрация по поиску
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

    // Форматирование цены
    const formatPrice = (price) => {
        if (!price) return '';
        if (price.includes('₽') || price.includes('руб')) return price;
        return `${price} ₽`;
          }; // Анимации
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
                    <motion.div className="service-price-page">
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Загружаем услуги...</p>
                        </div>
                    </motion.div>
                );
            }
         {isBookingFormOpen && (
                <BookingForm 
                    service={selectedService}
                    onClose={() => setIsBookingFormOpen(false)}
                    onBookingSuccess={handleBookingSuccess}
                />
            )}
            return (
                <motion.div
                    className="service-price-page"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div сlassName="animated-title">
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
                            {categories.map(category => {
                                const displayData = categoryData[category] || {};
                                
                                return (
                                    <motion.button
                                        key={category}
                                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(category)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{ 
                                            backgroundColor: selectedCategory === category 
                                                ? displayData.color || '#4e73df' 
                                                : 'transparent',
                                            borderColor: displayData.color || '#4e73df'
                                        }}
                                    >
                                        {category === 'Все' ? 'Все' : (
                                            <>
                                                <span className="category-icon">
                                                    {displayData.icon ? (
                                                        <img 
                                                            src={displayData.icon} 
                                                            alt={category} 
                                                            className="category-img"
                                                        />
                                                    ) : (
                                                        '📋'
                                                    )}
                                                </span>
                                                {displayData.name || category}
                                            </>
                                        )}
                                    </motion.button>
                                );
                            })}
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
                        <div className="services-container">
                            {Object.keys(groupedServices).map(category => {
                                const categoryServices = groupedServices[category];
                                const displayData = categoryData[category] || {};
                                
                                return (
                                    <motion.div 
                                        key={category}
                                        className="category-group"
                                        variants={container}
                                        initial="hidden"
                                        animate="show"
                                    >
                                        {selectedCategory === 'Все' && (
                                            <div className="category-header">
                                                <div className="category-icon-title">
                                                    {displayData.icon ? (
                                                        <img 
                                                            src={displayData.icon} 
                                                            alt={category} 
                                                            className="category-title-img"
                                                        />
                                                    ) : (
                                                        <span className="category-icon">📋</span>
                                                    )}
                                                    <h2 className="category-title">
                                                        {displayData.name || category}
                                                    </h2>
                                                </div>
                                                <div 
                                                    className="category-divider"
                                                    style={{ backgroundColor: displayData.color || '#4e73df' }}
                                                ></div>
                                            </div>
                                        )}
                                        
                                        <motion.div 
                                            className="services-grid"
                                            variants={container}
                                        >
                                            {categoryServices.map(service => (
                                                <motion.div
                                                    key={service._id}
                                                    className={`service-card__book ${activeService === service._id ? 'active' : ''}`}
                                                    variants={item}
                                      
                                                    onClick={() => setActiveService(activeService === service._id ? null : service._id)}
                                                >
                                                    <div className="card-header">
                                                        <h3>{service.serviceName}</h3>
                                                        <span className="price-tag">
                                                            {formatPrice(service.price)}
                                                        </span>
                                                    </div>
                                                    <div className="card-body">
                                                        <p className="description">{service.description}</p>
                                                    </div>
                                                    
                                                    {activeService === service._id && (
                <motion.div 
                    className="service-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие
                >
        <div className="service-meta">
    <span className="category-badge">
        {displayData.icon ? (
            <img 
            src={displayData.icon} 
            alt={category} 
            className="badge-icon"
            />
            ) : (
            '📋'
            )}
            {displayData.name || service.category}
            </span>
            </div>
{isBookingFormOpen && (
        <BookingForm 
          service={selectedService}
          onClose={() => setIsBookingFormOpen(false)}
          onBookingSuccess={handleBookingSuccess}
        />
)}

                                                            <div className="service-actions">
                                                                   <button 
                            className="btn-book"
                            onClick={(e) => handleBookingClick(service, e)}
                        >
                            Записаться
                        </button>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            );
        };
        
        export default AllServicesPage;
    