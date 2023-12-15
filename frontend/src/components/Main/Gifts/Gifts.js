import React from 'react';
import "./Gifts.css";
import FormWithoutOverlay from "../../FormWithoutOverlay/FormWithoutOverlay"; // Путь к компоненту FormWithoutOverlay

function Gifts() {
    return (
        <section className="gifts">
            <h2 className='gifts__title'> Задай вопрос сейчас и получи скидку на ремонт 20% </h2>
            <FormWithoutOverlay /> {/* Отображение формы без оверлея */}
        </section>
    )
}

export default Gifts;