// components/ServicesGrid/ServicesGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ServicesGrid.css';

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

const ServicesGrid = () => {
  const services = [
    { 

      title: "Ноутбуками", 
      description: "Ремонт любой сложности. Замена мультиконтроллеров, USB портов, кулеров и разъемов зарядки", 
      icon: Notebook,
      link: "/notebook-service",
      color: "#092e9eff"
    },
    { 

      title: "Компьютерами", 
      description: "Ремонт компьютеров и моноблоков, настройка и сборка", 
      icon: Monoblok,
      link: "/monoblock-service",
      color: "#bfc81cff"
    },
    { 

      title: "Apple техникой", 
      description: "Качественный ремонт, замена аккумулятора, дисплейного модуля и стекол", 
      icon: Applefon,
      link: "/appl-service",
      color: "#36b9cc"
    },
    { 

      title: "Телефонами", 
      description: "Ремонт телефонов любой модели. Замена дисплея и компонентный ремонт платы", 
      icon: Android,
      link: "/telephone-service",
      color: "#f6c23e"
    },
    { 

      title: "Планшетами", 
      description: "Быстрый и надежный ремонт планшетов любых марок и моделей", 
      icon: Tablet,
      link: "/tablet-service",
      color: "#ffe627ff"
    },
    { 

      title: "Телевизорами", 
      description: "Профессиональный ремонт: замена подсветки, ремонт системной платы", 
      icon: Tv,
      link: "/tv-service",
      color: "#1cc6ffff"
    },
    { 
  
      title: "Замена стекла", 
      description: "Замена стекла от 1 часа на телефонах, планшетах и часах", 
      icon: Glass,
      link: "/glass-replacement-price-lists",
      color: "#fd7e14"
    },
    { 
 
      title: "Видеокартами", 
      description: "Сложный ремонт и обслуживание видеокарт и асиков", 
      icon: Videocard,
      link: "/videocard",
      color: "#53fff4ff"
    },
    { 
 
      title: "Другие устройства", 
      description: "Ремонт Bluetooth-колонок, пылесосов, электронных книг и игровых приставок", 
      icon: Devices,
      link: "/other-service",
      color: "#2710f2ff"
    }
  ];

     // Анимации
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

    return (
        <section className="services-grid-section">
            <div className="section-header">
                <h2>Наши услуги</h2>
                <p>Комплексный ремонт техники любой сложности</p>
            </div>
            
            <motion.div 
                className="services-grid"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
            >
                {services.map(service => (
                    <motion.div 
                        key={service.id}
                        className="servicecard__book"
                        variants={item}
                        whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                    >
                        <div 
                            className="card-header"
                            style={{ backgroundColor: service.color }}
                        >
                            <div className="icon-wrapper">
                                <img 
                                    src={service.icon} 
                                    alt={service.title} 
                                    className="service-icon"
                                />
                            </div>
                            <h3>{service.title}</h3>
                        </div>
                        
                        <div className="card-body">
                            <p>{service.description}</p>
                       
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default ServicesGrid;