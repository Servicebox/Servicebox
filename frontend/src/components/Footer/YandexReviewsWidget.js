import { useEffect, useRef } from "react";

export default function YandexReviewsWidget() {
    const reviewsRef = useRef(null);

    useEffect(() => {
        if (!reviewsRef.current) return;

        // Очищаем контейнер
        reviewsRef.current.innerHTML = "";

        // Создаём div для виджета
        const widgetDiv = document.createElement("div");
        widgetDiv.className = "yandex-reviews-widget";
        widgetDiv.setAttribute("data-bounds", "39.8,59.1,39.95,59.25");
        widgetDiv.setAttribute("data-org-id", "58578899506");
        widgetDiv.setAttribute("data-theme", "light"); // можно "dark"
        widgetDiv.setAttribute("data-lang", "ru");

        reviewsRef.current.appendChild(widgetDiv);

        // Проверяем, был ли уже подключён скрипт
        if (!document.querySelector('script[src="//yandex.ru/maps-reviews-widget/v1.js"]')) {
            const script = document.createElement("script");
            script.src = "https://yandex.ru/maps-reviews-widget/v1.js";
            script.async = true;
            reviewsRef.current.appendChild(script);
        } else {
            // если скрипт уже был, перезапускаем инициализацию вручную
            if (window.YMapsReviewsWidget) {
                window.YMapsReviewsWidget.init();
            }
        }
    }, []);

    return (
        <div className="footer__yandex-reviews" ref={reviewsRef} />
    );
}