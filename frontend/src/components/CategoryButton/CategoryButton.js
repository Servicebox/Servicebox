import React from 'react';
import './CategoryButton.css'; // Путь к вашему новому CSS файлу

const CategoryButton = ({ children, onClick, category, level }) => {

  const levelClass = `category-card-level-${level}`;

  return (
    <div className="category-button">
    <div className={`category-card ${levelClass}`} onClick={onClick}>
      {children}
      <h2>{category && category.name}</h2>
      
    </div>
    </div>
  );
};

export default CategoryButton;             