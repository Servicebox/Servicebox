import React, { useState, useEffect } from 'react';
import PromotionForm from '../../Form/Form'; // Модалка “Записаться”
import './PromotionsPage.css';


export default function PromotionsPage() {
    const [promotions, setPromotions] = useState([]);
    const [isFormOpen, setFormOpen] = useState(false);
    useEffect(() => {
        fetch('https://servicebox35.pp.ru/api/promotions')
            .then(r => r.json())
            .then(setPromotions)
    }, []);
    const openForm = () => setFormOpen(true);
    const closeForm = () => setFormOpen(false);

    function formatDate(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString('ru');
    }



    return (
        <div className='promotions-page'>
            <h2 className="animated-title ">Актуальные акции</h2>
            <div className='promo-list'>
                {promotions.map((promo) => (
                    <div className='promotion-card' key={promo._id}>
                        <div className='promotion-img'>
                            <img className='promo-image' src={`https://servicebox35.pp.ru${promo.image}`} alt={promo.title} />
                        </div>
                        <div className='promotion-content'>
                            <h2>{promo.title}</h2>
                            <p>{promo.description}</p>
                            <p className='promotion-date'>Действует до: <b>{formatDate(promo.endDate)}</b></p>
                            <button onClick={openForm}>Записаться</button>
                        </div>
                    </div>
                ))}
            </div>
            {isFormOpen && <PromotionForm close={closeForm} />}
        </div>
    );
}