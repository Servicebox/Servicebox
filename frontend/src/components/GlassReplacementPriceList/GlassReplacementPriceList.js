import React from 'react';

const GlassReplacementPriceList = () => {
const glassReplacements = [
{ brand: 'Apple', model: 'iPhone 7/8', price: 3000 },
{ brand: 'Apple', model: 'iPhone 7 plus/8 plus', price: 3500 },
{ brand: 'Apple', model: 'iPhone X/Xs', price: 5000 },
{ brand: 'Apple', model: 'iPhone Xr', price: 4500 },
{ brand: 'Apple', model: 'iPhone Xs Max', price: 6000 },
{ brand: 'Apple', model: 'iPhone 11', price: 5500 },
{ brand: 'Apple', model: 'iPhone 11 Pro', price: 6000 },
{ brand: 'Apple', model: 'iPhone 11 Pro Max', price: 7000 },
{ brand: 'Apple', model: 'iPhone 12 mini', price: 9000 },
{ brand: 'Apple', model: 'iPhone 12/12 Pro', price: 9000 },
{ brand: 'Apple', model: 'iPhone 12 Pro Max', price: 12000 },
{ brand: 'Apple', model: 'iPhone 13 mini', price: 9000 },
{ brand: 'Apple', model: 'iPhone 13', price: 12000 },
{ brand: 'Apple', model: 'iPhone 13 Pro', price: 14000 },
{ brand: 'Apple', model: 'iPhone 13 Pro Max', price: 16000 },
{ brand: 'Apple', model: 'iPhone 14', price: 14000 },
{ brand: 'Apple', model: 'iPhone 14 plus', price: 16000 },
{ brand: 'Apple', model: 'iPhone 14 Pro', price: 18000 },
{ brand: 'Apple', model: 'iPhone 14 Pro Max', price: 20000 },

{ brand: 'Apple watch', model: 'S3-38mm', price: 5500 },
{ brand: 'Apple watch', model: 'S3-42mm', price: 6000 },
{ brand: 'Apple watch', model: 'S4/SE/S5/40-44mm', price: 6000 },
{ brand: 'Apple watch', model: 'S6 40-44mm', price: 5500 },
{ brand: 'Apple watch', model: 'S7 41-46mm', price: 5500 },

{ brand: 'Apple', model: 'Заднее стекло для iPhone 8/8 plus/X/Xs', price: 3000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone Xs Max/Xr', price: 3500 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 11', price: 4000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 11 Pro', price: 4000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 11 Pro Max', price: 4500 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 12 mini', price: 5000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 12', price: 5500 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 12 Pro', price: 7500 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 12 Pro Max', price: 8000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 13 mini', price: 6000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 13', price: 6000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 13 Pro', price: 7000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 13 Pro Max', price: 7500 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 14', price: 6000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 14 plus', price: 6500 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 14 Pro', price: 8000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 14 Pro Max', price: 9000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 8/8 plus/X/Xs', price: 3000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone Xs Max/Xr', price: 3500 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 11', price: 4000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 11 Pro', price: 4000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 11 Pro Max', price: 4500 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 12 mini', price: 5000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 12', price: 5500 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 12 Pro', price: 7500 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 12 Pro Max', price: 8000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 13 mini', price: 6000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 13', price: 6000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 13 Pro', price: 7000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 13 Pro Max', price: 7500 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 14', price: 6000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 14 plus', price: 6500 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 14 Pro', price: 8000 },
{ brand: 'Apple', model: 'Заднее стекло для iPhone 14 Pro Max', price: 9000 },

{ brand: 'Apple', model: 'Аккумулятор для iPhone 12/12 Pro', price: 5000 },
{ brand: 'Apple', model: 'Аккумулятор для iPhone 12 Pro Max/13 mini', price: 5500 },

{ brand: 'Apple', model: 'Аккумулятор для iPhone 13 mini', price: 6000 },
{ brand: 'Apple', model: 'Аккумулятор для iPhone 13', price: 6000 },
{ brand: 'Apple', model: 'Аккумулятор для iPhone 13 Pro/13 Pro Max', price: 6000 },
{ brand: 'Apple', model: 'Аккумулятор для iPhone Xs Max/11', price: 4500 },
{ brand: 'Apple', model: 'Аккумулятор для iPhone Xr/Xs', price: 4000 },

{ brand: 'Samsung', model: 'Galaxy A12/A10/M12/J4 PLUS/J6 PLUS', price: 3500 },
{ brand: 'Samsung', model: 'Galaxy A40', price: 4000 },
{ brand: 'Samsung', model: 'Galaxy A30/A50/A50s/M30/M30s/M21/M31', price: 4500 },
{ brand: 'Samsung', model: 'Galaxy A51/M31s/M71', price: 5500 },
{ brand: 'Samsung', model: 'Galaxy A70', price: 5500 },
{ brand: 'Samsung', model: 'Galaxy A71/M51/ NOTE 10 LITE', price: 80 },
{ brand: 'Samsung', model: 'Galaxy S8/S8 PLUS', price: 80 },
{ brand: 'Samsung', model: 'Galaxy S10/S10 PLUS', price: 80 },
{ brand: 'Samsung', model: 'Galaxy S20/S20 PLUS/S20U', price: 11000 },
{ brand: 'Samsung', model: 'Galaxy S21/S21 PLUS/S21U', price: 12000 },


];

return (
<div>
<h2 style={{ textAlign: 'center', color: '#333' }}>Прайс-лист на замену стекла на телефонах и часах, а так же аккумулятора</h2>
<table style={{ margin: '0 auto', width: '80%', borderCollapse: 'collapse' }}>
<thead>
<tr>
<th style={{ backgroundColor: '#f2f2f2', padding: '15px', border: '1px solid #ccc' }}>Марка</th>
<th style={{ backgroundColor: '#f2f2f2', padding: '15px', border: '1px solid #ccc' }}>Модель</th>
<th style={{ backgroundColor: '#f2f2f2', padding: '15px', border: '1px solid #ccc' }}>Цена (руб.)</th>
</tr>
</thead>
<tbody>
{glassReplacements.map((glassReplacement, index) => (
<tr key={index}>
<td style={{ padding: '10px', border: '1px solid #ccc' }}>{glassReplacement.brand}</td>
<td style={{ padding: '10px', border: '1px solid #ccc' }}>{glassReplacement.model}</td>
<td style={{ padding: '10px', border: '1px solid #ccc' }}>{glassReplacement.price}</td>
</tr>
))}
</tbody>
</table>
</div>
);
}

export default GlassReplacementPriceList;