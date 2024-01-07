import React from "react";
import "./Button.css";
const Button = ({ num, click }) => {
  return (
    <button className="ui-change-btn" onClick={() => click(true)}>
      Добавлено <span>{num}</span> {num <= 1 ? "товар" : "товаров"}
    </button>
  );
};

export default Button;
