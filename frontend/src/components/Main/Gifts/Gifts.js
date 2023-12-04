import React, { useState, useEffect } from 'react';
import "./Gifts.css";
import Form from "../../Form/Form";

function Gifts() {
    const [isOpen, setIsOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const toggleForm = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleEsc = (event) => {
    if (event.keyCode === 27) {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);


    return(
<section className="gifts">
    <h2> Задай вопрос сейчас и получи скидку на ремонт 20% </h2>

{isOpen && <Form toggleForm={toggleForm} />}
</section>
)
}
export default Gifts