import React from "react";

const SectionComponent = ({ sections, handleClick }) => {
    return (
      <ul>
        {sections.map((section) => (
          <li key={section.id} onClick={() => handleClick(section.id)}>
            {section.name}
          </li>
        ))}
      </ul>
    );
  };
  
  export default SectionComponent;