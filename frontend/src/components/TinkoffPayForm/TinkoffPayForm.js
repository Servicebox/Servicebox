import React, { useEffect, useState } from 'react';
import './TinkoffPayForm.css';

const terminalkey = "1709125434432"; // идентификатор магазина


function TinkoffPayForm({ amount, receiptData, onPaymentSuccess }) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!window.pay) {
      const script = document.createElement('script');
      script.src = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js';
      script.async = true;
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    }
  }, []);

  const calculateTotalAmount = () =>
    receiptData.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payForm = document.forms['payform-tinkoff'];
    const calculatedAmount = calculateTotalAmount();

    if (calculatedAmount !== parseFloat(amount)) {
      return alert("Сумма всех позиций в чеке должна равняться сумме заказа.");
    }

    if (!email && !phone) {
      alert('Укажите хотя бы email или телефон.');
      return;
    }

    // Формируем чек
    const receipt = {
      Email: email,
      Phone: phone,
      EmailCompany: "your@shop.com",
      Taxation: "patent",
      FfdVersion: "1.2",
      Items: receiptData.map(item => ({
        Name: item.name,
        Price: (item.price * 100).toString(),
        Quantity: item.quantity,
        Amount: (item.price * item.quantity * 100).toString(),
        PaymentMethod: "full_prepayment",
        PaymentObject: "commodity",
        Tax: "none",
        MeasurementUnit: "pc"
      }))
    };

    // DATA для личного кабинета (отправить свои нужные поля, не стандартные)
    // Включить их отображение в ЛК может только менеджер Тинькофф!
    const dataValue = [
      `ClientName=${name}`,
      `ClientPhone=${phone}`,
      `ClientEmail=${email}`,
      `OrderInfo=${receiptData.map(i => i.name).join(", ")}`,
      `Time=${new Date().toLocaleString("ru")}`
    ].join('|');

    payForm.elements.receipt.value = JSON.stringify(receipt);
    payForm.elements.DATA && (payForm.elements.DATA.value = dataValue);
    payForm.elements.Phone.value = phone; // Not нужен если есть в receipt, но т.к. есть поле в форме — пусть будет

    window.pay(payForm, {
      onSuccess: () => {
        onPaymentSuccess?.();
        window.location.href = `${window.location.origin}?paymentSuccess=true`;
      },
    });

    // ВАЖНО: Для почтового уведомления нужен сервер!
    // fetch('/api/order-email', {method:'POST', body:JSON.stringify({name,email,phone,receiptData}),headers:{'Content-Type':'application/json'}});
    // На вашем бэке обработайте этот POST и отправьте email себе!
  };

  const orderDescription = receiptData.map(item => item.name).join(", ");

  return (
    <form id="payform-tinkoff" name="payform-tinkoff" onSubmit={handleSubmit}>
      <input type="hidden" name="terminalkey" value={terminalkey} />
      <input type="hidden" name="frame" value="true" />
      <input type="hidden" name="language" value="ru" />
      <input type="hidden" name="receipt" value="" />
      <input type="hidden" name="DATA" value="" />
      <input type="text" name="amount" placeholder="Сумма заказа" value={amount} readOnly />
      <input type="hidden" name="order" value={'Order_' + Date.now()} />
      <input className='form-control__description' type="text" name="description" value={orderDescription} readOnly placeholder="Описание заказа" />
      <div className="payform-field-group">
        <input className='form-control' type="text" name="name" value={name} onChange={e => setName(e.target.value)} required placeholder="ФИО плательщика" />
        <input className='form-control' type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="E-mail" />
        <input className='form-control' type="tel" name="Phone" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="Контактный телефон" />
        <input className='btn-primary' type="submit" value="Оплатить" />
      </div>
    </form>
  );
}

export default TinkoffPayForm;