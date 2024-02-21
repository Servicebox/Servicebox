import React from 'react';

function renderCategoryTree(categories, onSelect) {
    if (!Array.isArray(categories)) {
      return null;
    }
  
    return (
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <button onClick={() => onSelect(category)}>{category.name}</button>
            {category.children && renderCategoryTree(category.children, onSelect)}
          </li>
        ))}
      </ul>
    );
  }
  
  function Sidebar({ categories, onSelect }) {
    return (
      <div className="sidebar">
        {renderCategoryTree(categories, onSelect)}
      </div>
    );
  }
  
  export default Sidebar;