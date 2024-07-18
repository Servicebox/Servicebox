import React from 'react';

const Search = () => {
    const [query, setQuery] = React.useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div>
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