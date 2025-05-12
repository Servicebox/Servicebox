import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchHandler = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        setLoading(true);
        try {
            const res = await fetch(`https://servicebox35.pp.ru/api/search?query=${encodeURIComponent(search)}`);
            const data = await res.json();
            setResults(data);
        } catch {
            setResults([]);
        }
        setLoading(false);
    };

    return (
        <div className="search-bar-wrap">
            <form onSubmit={searchHandler} className="search-bar-form">
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Искать товар, услугу, модель, категорию..."
                    className="search-bar-input"
                />
                <button className="search-bar-btn">Найти</button>
            </form>
            {loading && <div className="search-bar-loading">Поиск...</div>}
            {!loading && results.length > 0 && (
                <ul className="search-bar-results">
                    {results.map((r) =>
                        <li key={r.id} className="search-bar-result-item">
                            <div>
                                <b>{r.title}</b>
                                <span className={`search-type search-type__${r.type.toLowerCase()}`}>{r.type}</span>
                            </div>
                            <div className="search-bar-desc">
                                {r.description}
                            </div>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}