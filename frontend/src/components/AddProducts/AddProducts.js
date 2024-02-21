import React from "react";
import CardList from "./CardList";
import "./AddProducts.css";
import { useRef } from "react";
const AddProducts = ({ items, click, removeItem, setAddedItem,setAddedItems }) => {
  const total = items
  .reduce((pre, cur) => {
    return pre + Number(cur.addNumber) * Number(cur.price);
  }, 0)
  .toFixed(2);
  // let curDate = new Date();
  // console.log(curDate);
  const showDivRef = useRef(null);



  return (
    <div ref={showDivRef} className="addproducts__container">
      <div className="left-side">
        <div className="check-out-container">
          <div className="check-out-print">
            <h1 className="check-out-title">Заказ</h1>
            {/* <p>{curDate}</p> */}
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th className="table-item-title">товар</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.text}</td>
                    <td>₽{item.price}</td> 
                    <td>{item.addNumber}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                <td className="total-item" colSpan={2}>
    Сумма
  </td>
  <td colSpan={4}>
  <span>Общая сумма: ₽{total}</span>
</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="right-side-header">
          <h1>
            Заказ <span className="total-items">{items.length}</span>
            {items.length <= 1 ? " товар" : " товаров"}
          </h1>
          <button
            className="remove-item-btn"
            onClick={() => {
              showDivRef.current.classList.add("animate");
              setTimeout(() => click(false), 200);
            }}
          >
            ⌫
          </button>
        </div>
        <div className="right-side-body">
          {items.map((item, i, itemsArr) => (
            <CardList
  key={item.id}
  item={item}
  removeItem={removeItem}
  setAddedItems={setAddedItems}
  itemsArr={itemsArr}
  text={item.text} // Передача текста продукта
  price={item.price} // Передача цены продукта
/>
          ))}
        </div>
        <div className="right-side-footer">
          <div className="bar"></div>
          <div className="footer-head">
            <h4>Всего :</h4>
            <h1>₽{total}</h1>
          </div>
          <div className="check-out">
            <button
              className="check-out-btn"
              onClick={() => {
                items.length >= 1 && print();
              }}
            >
              Оформить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;