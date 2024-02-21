import React from "react";
import "./Button.css";
const Button = ({ num, click }) => {
  return (
    <button className="ui-change-btn" onClick={() => click(true)}>
      Всего  <span>{num}</span> {num <= 1 ? "товар" : "товара"}
    </button>
  );
};

export default Button;

