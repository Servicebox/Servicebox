import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Phone, Search, FileText, Wrench, CheckCircle, Shield, 
  ChevronLeft, ChevronRight
} from 'lucide-react';
import './WorkSteps.css';

const WorkSteps = () => {
  const [activeStep, setActiveStep] = useState(null);
  const scrollContainerRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const steps = [
        {
      id: 1,
      icon: <Phone className="step-icon-svg" />,
      title: "А где Андрей?",
      description: "Звоните ему по номеру",
      details: "+7 (911) 501-06-96",
      fullText: "Андрей работает в сервисном центре по адресу: ул. Ленине, д. 6"
    },
    {
      id: 2,
      icon: <Phone className="step-icon-svg" />,
      title: "Звонок",
      description: "Звоните нам по номеру",
      details: "+7 (911) 501-88-28",
      fullText: "Оператор уточнит про неисправность, расскажет про наши условия, согласует с вами время визита в наш сервисный центр"
    },
    {
      id: 3,
      icon: <Search className="step-icon-svg" />,
      title: "Диагностика",
      description: "Мастер проводит точную диагностику в сервисном центре",
      details: "Это бесплатно",
      fullText: "Мастер проведет точную диагностику в нашем сервисном центре для определения причины неисправности и стоимости ремонта"
    },
    {
      id: 4,
      icon: <FileText className="step-icon-svg" />,
      title: "Согласование",
      description: "После диагностики мастер сформирует смету",
      details: "Включает стоимость работ и запчастей",
      fullText: "Вы получите подробную смету с перечнем необходимых работ и запчастей. Все пункты согласовываются с вами перед началом ремонта"
    },
    {
      id: 5,
      icon: <Wrench className="step-icon-svg" />,
      title: "Ремонт",
      description: "Мастер принимается за ремонт в сервисном центре",
      details: "Технику мы не забираем",
      fullText: "Ремонт производится в нашем сервисном центре. Вы можете забрать технику самостоятельно или воспользоваться доставкой"
    },
    {
      id: 6,
      icon: <CheckCircle className="step-icon-svg" />,
      title: "Тестирование",
      description: "После ремонта специалист проверяет технику на работоспособность",
      details: "Если всё в порядке ― происходит оплата услуг",
      fullText: "Проводится комплексное тестирование отремонтированной техники для проверки качества выполненных работ"
    },
    {
      id: 7,
      icon: <Shield className="step-icon-svg" />,
      title: "Гарантия",
      description: "Мастер выписывает фирменную гарантию на проделанные работы",
      details: "На установленные комплектующие",
      fullText: "Вы получаете официальную гарантию на выполненные работы и установленные комплектующие. Гарантийный срок зависит от типа работ"
    }
  ];

const faqs = [
    {
      question: "А где Андрей?",
      
      answer: "Звоните ему по номеру +7 (911) 501-06-96 Андрей работает в сервисном центре по адресу: ул. Ленина, д. 6 Ориентир K&B"
    },
      {
      question: "Сколько времени занимает диагностика?",
      answer: "Диагностика занимает от 30 минут до 2 часов в зависимости от сложности неисправности. В большинстве случаев мы можем определить проблему сразу в сервисном центре."
    },
    {
      question: "Нужно ли записываться заранее?",
      answer: "Рекомендуем записаться заранее по телефону для удобства планирования времени. Однако вы можете прийти и без записи в рабочие часы."
    },
    {
      question: "Могу ли я присутствовать при диагностике?",
      answer: "Процесс диагностики требует сосредоточенности и проходит в техническом помещении, поэтому, к сожалению, присутствие клиентов невозможно. Диагностика с разбором некоторых устройств занимает значительное время, а наши мастера могут быть заняты одновременно несколькими заказами. Однако мы всегда подробно информируем о причинах неисправности и можем предоставить фото/видео материалов по запросу."
    },
    {
      question: "Как происходит оплата за ремонт?",
      answer: "Оплата производится только после успешного завершения ремонта и проверки работоспособности техники. Мы принимаем наличные и безналичные расчеты."
    },
    {
      question: "Предоставляете ли вы гарантию на ремонт?",
      answer: "Да, мы предоставляем официальную гарантию на все выполненные работы от 3 месяцев до 2 лет в зависимости от типа ремонта и установленных комплектующих."
    },
    {
      question: "Что делать, если техника снова сломалась после ремонта?",
      answer: "В случае возникновения проблем в гарантийный период, просто свяжитесь с нами по телефону. Мы бесплатно устраним выявленные недостатки."
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = useCallback((index) => setOpenFaq(openFaq === index ? null : index), [openFaq]);

  const handleCall = () => window.location.href = "tel:+79115018828";

  const scrollLeft = useCallback(() => {
    if (!scrollContainerRef.current) return;
    setIsAutoScrolling(false);
    const container = scrollContainerRef.current;
    const cardWidth = container.scrollWidth / steps.length;
    const newIndex = Math.max(0, currentStepIndex - 1);
    container.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
    setCurrentStepIndex(newIndex);
  }, [currentStepIndex, steps.length]);

  const scrollRight = useCallback(() => {
    if (!scrollContainerRef.current) return;
    setIsAutoScrolling(false);
    const container = scrollContainerRef.current;
    const cardWidth = container.scrollWidth / steps.length;
    const newIndex = Math.min(steps.length - 1, currentStepIndex + 1);
    container.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
    setCurrentStepIndex(newIndex);
  }, [currentStepIndex, steps.length]);

  const scrollToStep = useCallback((index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.scrollWidth / steps.length;
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    setCurrentStepIndex(index);
  }, [steps.length]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      diff > 0 ? scrollRight() : scrollLeft();
    }
  };

  // Автопрокрутка
  useEffect(() => {
    if (!isAutoScrolling || isMobile) return;
    autoScrollInterval.current = setInterval(() => {
      setCurrentStepIndex(prev => (prev + 1) % steps.length);
    }, 8000);
    return () => clearInterval(autoScrollInterval.current);
  }, [isAutoScrolling, isMobile, steps.length]);

  useEffect(() => {
    if (scrollContainerRef.current && !isMobile) {
      const cardWidth = scrollContainerRef.current.scrollWidth / steps.length;
      scrollContainerRef.current.scrollTo({ left: currentStepIndex * cardWidth, behavior: 'smooth' });
    }
  }, [currentStepIndex, steps.length, isMobile]);

  useEffect(() => {
    if (!isAutoScrolling) {
      const timer = setTimeout(() => setIsAutoScrolling(true), 10000);
      return () => clearTimeout(timer);
    }
  }, [isAutoScrolling]);

  return (
    <div className="work-steps-container" itemScope itemType="https://schema.org/Service">
      <div className="work-steps-header">
        <h2 className="work-steps-title">Этапы работ</h2>
        <p className="work-steps-subtitle">Как происходит ремонт в нашем сервисе</p>
      </div>

      <div className="work-steps-progress mb-12">
        <div className="progress-line">
          <div 
            className="progress-fill"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="steps-indicator">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`step-indicator ${currentStepIndex >= index ? 'active' : ''}`}
              onClick={() => scrollToStep(index)}
              aria-label={`Перейти к шагу ${index + 1}`}
            >
              <span>{index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="work-steps-wrapper relative mb-16">
        {!isMobile && (
          <>
            <button className="scroll-button left" onClick={scrollLeft} aria-label="Предыдущий этап">
              <ChevronLeft />
            </button>
            <button className="scroll-button right" onClick={scrollRight} aria-label="Следующий этап">
              <ChevronRight />
            </button>
          </>
        )}

        <div 
          className="work-steps-scroll-container"
          ref={scrollContainerRef}
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="work-steps-grid">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`work-step-card ${activeStep === step.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
                onClick={() => isMobile && setActiveStep(activeStep === step.id ? null : step.id)}
                itemScope
                itemType="https://schema.org/Service"
              >
                <div className="step-icon">{step.icon}</div>
                <div className="step-content">
                  <h3 className="step-title" itemProp="name">{step.title}</h3>
                  <p className="step-description" itemProp="description">{step.description}</p>
                  <div className="step-details">{step.details}</div>
                  <div className={`step-full-text ${activeStep === step.id ? 'visible' : ''}`}>
                    {step.fullText}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="faq-section mb-16">
        <h2 className="faq-title">Часто задаваемые вопросы</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
              >
                {faq.question}
                <span className="faq-toggle">{openFaq === index ? '−' : '+'}</span>
              </button>
              <div className={`faq-answer ${openFaq === index ? 'open' : ''}`} aria-hidden={openFaq !== index}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div itemScope itemType="https://schema.org/LocalBusiness" className="hidden">
        <meta itemProp="name" content="ServiceBox - ремонт техники в Вологде" />
        <meta itemProp="description" content="Профессиональный ремонт ноутбуков, телефонов, iPhone в Вологде" />
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <meta itemProp="streetAddress" content="Северная, 7А, офис 405" />
          <meta itemProp="addressLocality" content="Вологда" />
          <meta itemProp="addressRegion" content="Вологодская область" />
          <meta itemProp="postalCode" content="160000" />
          <meta itemProp="addressCountry" content="RU" />
        </div>
        <meta itemProp="telephone" content="+7 (911) 501-88-28" />
        <meta itemProp="openingHours" content="Mo-Fr 10:00-19:00" />
        <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
          <meta itemProp="latitude" content="59.2133" />
          <meta itemProp="longitude" content="39.8897" />
        </div>
      </div>
    </div>
  );
};

export default WorkSteps;