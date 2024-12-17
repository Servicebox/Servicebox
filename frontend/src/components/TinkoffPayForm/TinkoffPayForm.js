import React, { useEffect, useState } from 'react';
import './TinkoffPayForm.css';

const terminalkey = "1709125434432"; // идентификатор магазина

function TinkoffPayForm({ amount, receiptData, onPaymentSuccess }) {
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    };
  }, []);

  const calculateTotalAmount = () => {
    return receiptData.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payForm = document.forms['payform-tinkoff'];
    
    // Вычисляем общую сумму позиций
    const calculatedAmount = calculateTotalAmount();

    // Проверяем, что сумма в чеке совпадает с переданной суммой заказа
    if (calculatedAmount !== parseFloat(amount)) {
      return alert("Сумма всех позиций в чеке должна равняться сумме заказа.");
    }

    const receipt = {
      EmailCompany: "mail@mail.com",
      Taxation: "patent",
      FfdVersion: "1.2",
      Items: receiptData.map(item => ({
          Name: item.name,
          Price: (item.price * 100).toString(), // в копейках
          Quantity: item.quantity,
          Amount: (item.price * item.quantity * 100).toString(), // в копейках
          PaymentMethod: "full_prepayment",
          PaymentObject: "commodity",
          Tax: "none",
          MeasurementUnit: "pc"
      })),
    };
    
    payForm.elements.receipt.value = JSON.stringify(receipt);
    payForm.elements.Phone.value = phone;

    window.pay(payForm, {
      onSuccess: () => {
        onPaymentSuccess();
        // Перенаправление для возвращения в магазин с флагом успешной оплаты
        window.location.href = `${window.location.origin}?paymentSuccess=true`;
      },
    });
  };

  // Получаем список названий товаров для описания заказа
  const orderDescription = receiptData.map(item => item.name).join(", ");

  return (
    <form id="payform-tinkoff" className="payform-tinkoff" name="payform-tinkoff" onSubmit={handleSubmit}>
      <input className="payform-tinkoff-row" type="hidden" name="terminalkey" value={terminalkey} />
      <input className="payform-tinkoff-row" type="hidden" name="frame" value="true" />
      <input className="payform-tinkoff-row" type="hidden" name="language" value="ru" />
      <input className="payform-tinkoff-row" type="hidden" name="receipt" value="" />
      <input className="payform-tinkoff-row" type="text" name="amount" placeholder="Сумма заказа" value={amount} readOnly />
      <input className="payform-tinkoff-row" type="hidden" name="order" value={'Order_' + Date.now()} />
      <input className="payform-tinkoff-row" type="text" placeholder="Описание заказа" name="description" value={orderDescription} readOnly />
      <input className="payform-tinkoff-row" type="text" placeholder="ФИО плательщика" name="name" />
      <input className="payform-tinkoff-row" type="email" placeholder="E-mail" name="email" />
      <input className="payform-tinkoff-row" type="tel" placeholder="Контактный телефон" name="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className="payform-tinkoff-row payform-tinkoff-btn" type="submit" value="Оплатить" />
    </form>
  );
}

export default TinkoffPayForm;