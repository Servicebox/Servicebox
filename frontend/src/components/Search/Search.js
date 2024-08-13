import React from 'react';
import './Search.css'
const Search = () => {
    const [query, setQuery] = React.useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className='search__product'>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="поиск..."
            />
            
        </div>
    );
};

export default Search;