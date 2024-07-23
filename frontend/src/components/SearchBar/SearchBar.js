import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Обновите ваши предложения
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    navigate(`/search?query=${suggestion}`);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Поиск..."
        />
        <button type="submit">Искать</button>
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;