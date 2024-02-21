import React, { useEffect, useState } from "react";
import Search from "./SearchProducts/SearchProducts";
import SectionsBody from "./Sections/SectionsBody";
import Button from "./Button/Button";
import "./SectionApi.css";
import axios from 'axios';

const SectionApi = () => {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [addedItems, setAddedItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/sections')
      .then(response => {
        setSections(response.data.response.items);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSectionSelect = (sectionId) => {
    setSelectedSection(sectionId);
    setSelectedSubsection(null);
    axios.get(`http://localhost:8000/products?sectionId=${sectionId}`)
      .then(response => {
        setItems(response.data.response.items);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubsectionSelect = (subsectionId) => {
    setSelectedSubsection(subsectionId);
    const filteredProducts = items.filter(item => item.subsection_id === subsectionId);
    setItems(filteredProducts);
  };

  function changingSearchData(e) {
    setSearchValue(e.target.value);
  }



  return (
    <div>
      <div className="section__container">
        <div className="section__api">
          <div className="nav-section">
            <ul className="section-lists">
              {sections.filter(section => section.parent_id).map(section => (
                <li key={section.id} onClick={() => handleSectionSelect(section.id)}>
                  {section.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="nav-right">
          <Search
            value={searchValue}
            onChangeData={changingSearchData}
          />
          <Button num={addedItems.length} click={() => setShowAddProducts(!showAddProducts)} />
        </div>
      </div>
      <SectionsBody
        products={items.filter(item => (selectedSection ? item.section_id === selectedSection : true) && (selectedSubsection ? item.subsection_id === selectedSubsection : true))}
      />
    </div>
  );
};

export default SectionApi;