import React from "react";
import "./ReviewsSection.css";

const ReviewsSection = () => {
  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <h2 id="reviews-heading" className="reviews-title">Отзывы клиентов из Вологды</h2>
        <p className="reviews-subtitle">Сервисный центр «ServiceBox» — 150+ положительных отзывов на Яндекс.Картах</p>
        <div className="reviews-grid">
          <article className="review-card" itemScope itemType="https://schema.org/Review">
            <div className="review-header">
              <span className="review-author" itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">Даня Г.</span>
              </span>
              <time className="review-date" dateTime="2025-08-10" itemProp="datePublished">10 августа 2025</time>
            </div>
            <div className="review-rating" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
              <meta itemProp="ratingValue" content="5" />
              <meta itemProp="bestRating" content="5" />
              <span aria-label="Рейтинг: 5 из 5 звёзд">★★★★★</span>
            </div>
            <p className="review-text" itemProp="reviewBody">
              Сдал компьютер в сервис. Пришёл в 17:00, думал придётся ехать дважды, но мастер задержался и выполнил чистку за один визит. Температура CPU упала на 20°C! Работают до 19:00 — очень удобно.
            </p>
          </article>
          <article className="review-card" itemScope itemType="https://schema.org/Review">
            <div className="review-header">
              <span className="review-author" itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">Артур П.</span>
              </span>
              <time className="review-date" dateTime="2025-11-20" itemProp="datePublished">20 ноября 2025</time>
            </div>
            <div className="review-rating" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
              <meta itemProp="ratingValue" content="5" />
              <span>★★★★★</span>
            </div>
            <p className="review-text" itemProp="reviewBody">
              Обращался несколько раз по ремонту iPhone. Всё делают быстро, без навязывания лишних услуг. Андрею отдельное спасибо — всегда идёт навстречу!
            </p>
          </article>
          <article className="review-card" itemScope itemType="https://schema.org/Review">
            <div className="review-header">
              <span className="review-author" itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">Егор</span>
              </span>
              <time className="review-date" dateTime="2025-05-18" itemProp="datePublished">18 мая 2025</time>
            </div>
            <div className="review-rating" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
              <meta itemProp="ratingValue" content="5" />
              <span>★★★★★</span>
            </div>
            <p className="review-text" itemProp="reviewBody">
              Починили смартфон в тот же день! Объяснили всё по шагам, дали рекомендации. Доброжелательное общение и профессиональный подход. Рекомендую!
            </p>
          </article>
        </div>

        <div className="reviews-cta">
          <a 
            href="https://yandex.ru/maps/org/servisboks/58578899506/reviews/?utm_source=servicebox35&utm_medium=website&utm_campaign=reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-link"
            aria-label="Читать все 150+ отзывов на Яндекс.Картах"
          >
            Читать все отзывы на Яндекс.Картах →
          </a>
          <div
            className="reviews-rating-summary"
            itemScope
            itemType="https://schema.org/AggregateRating"
            itemProp="aggregateRating"
          >
            <meta itemProp="ratingValue" content="5.0" />
            <meta itemProp="reviewCount" content="150" />
            <meta itemProp="bestRating" content="5" />
            <p>Рейтинг: <strong>5.0</strong> на основе <strong>150+ отзывов</strong> в Вологде</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;