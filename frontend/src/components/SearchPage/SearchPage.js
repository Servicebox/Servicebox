// SearchPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const query = useQuery().get('query');
  const [results, setResults] = useState([]);


useEffect(() => {
  if (query) {
    console.log(`Search query: ${query}`);
    
    fetch(`https://servicebox35.pp.ru/api/search?query=${query}`)
      .then(response => {
        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Search results:', data);
        setResults(data);
      })
      .catch(err => console.error('Error during fetching search results:', err));
  }
}, [query]);

  return (
    <div>
      <h1>Результаты поиска для "{query}"</h1>
      {results.length > 0 ? (
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      ) : (
        <p>Ничего не найдено</p>
      )}
    </div>
  );
}

export default SearchPage;