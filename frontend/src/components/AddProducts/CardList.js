import React, { useReducer, useEffect } from "react";
import "./CardList.css";
function reducer(state, action) {
// console.log(state);
if (action.type === "INCREASE") {
return {
...state,
addNumber: state.addNumber + 1,
};
} else if (action.type === "DECREASE") {
if (state.addNumber == 1) {
return state;
}
return {
...state,
addNumber: state.addNumber - 1,
};
}
}
const CardList = ({ item, removeItem, setAddedItems, itemsArr, text, price }) => {
const [state, dispatch] = useReducer(reducer, item);

useEffect(() => {
const newArr = itemsArr.map((itemArr) => {
itemArr.id == item.id && (item.addNumber = state.addNumber);
return itemArr;
});
setAddedItems(newArr);
}, [state]);

return (
<div className="card-list-body">
<img src={item.picture} className="card-list-img" alt="" />
<button
className="delete-btn"
onClick={() => {
document.querySelector(".card-list-body").classList.add("animate");
setTimeout(() => removeItem(item), 190);
}}
>
✘
</button>
<h4>{item.name}</h4>
<hr />
<div className="card-list-add-minu-body">
<p>{text}</p>
<p>Цена : ₽{price}</p>
<div className="plus-items-minu">
<button
className="plus-btn"
onClick={() => {
dispatch({ type: "INCREASE" });
}}
>
</button>
<span className="num-of-items">{item.addNumber}</span>
<button
className="minu-btn"
onClick={() => {
dispatch({ type: "DECREASE" });
}}
>
</button>
</div>
</div>
</div>
);
};

export default CardList; 