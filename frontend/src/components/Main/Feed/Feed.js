import React from "react";
import "./Feed.css";

function Feed() {
    return (
        <section className="feed">
            <div className="feed__iframe-container">
                <h2 className="feed__title">Отзывы счастливых клиентов</h2>
                <div className="feed__iframe_map">
                <iframe className="feed__map" src="https://yandex.ru/maps-reviews-widget/58578899506?comments"></iframe>
                <a href="https://yandex.ru/maps/org/servisboks/58578899506/" target="_blank" rel="noopener noreferrer" className="feed__link"></a>
                </div>
            </div>
        </section>
    );
}

export default Feed;