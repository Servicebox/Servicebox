import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ShopCategory.css';
import Item from '../Item/Item';

const API_URL = "https://servicebox35.pp.ru";

const PLACEHOLDER = "data:image/svg+xml;utf8,<svg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect fill='%23F1F1F1' width='400' height='400'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='%23b3b3b3'>Нет фото</text></svg>";

const ShopCategory = () => {
  const [categories, setCategories] = useState([]);
  const [openedCat, setOpenedCat] = useState(null); // текущий раскрытый аккордеон
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedSubcat, setSelectedSubcat] = useState('');
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // для фильтрации поиска
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Получение категорий и всех товаров
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const [cats, prods] = await Promise.all([
          axios.get(`${API_URL}/api/categories-with-subcategories`),
          axios.get(`${API_URL}/api/allproducts`),
        ]);
        if (!ignore) {
          setCategories(cats.data);
          setProducts(prods.data.reverse());
          setAllProducts(prods.data);
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    })();
    return () => { ignore = true };
  }, []);

  // Сбросить фильтры если "все"
  const handleClearFilter = () => {
    setSelectedCat('');
    setSelectedSubcat('');
    setProducts(allProducts);
    setSearch('');
  };

  // Фильтрация по меню
  useEffect(() => {
    let filtered = allProducts;
    if (selectedCat) filtered = filtered.filter(p => p.category === selectedCat);
    if (selectedSubcat) filtered = filtered.filter(p => p.subcategory === selectedSubcat);
    setProducts(filtered);
  }, [selectedCat, selectedSubcat, allProducts]);

  // Поиск (фильтрует по названию/описанию)
  useEffect(() => {
    let filtered = allProducts;
    if (selectedCat) filtered = filtered.filter(p => p.category === selectedCat);
    if (selectedSubcat) filtered = filtered.filter(p => p.subcategory === selectedSubcat);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(p =>
        (p.name ?? '').toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q)
      );
    }
    setProducts(filtered);
  }, [search]); // фильтруем только при изменении поиска (категории — в отдельном юз-эффекте)

  const handleCatClick = (cat) => {
    setOpenedCat(openedCat === cat ? null : cat);
    setSelectedCat(cat);
    setSelectedSubcat('');
    setSearch('');
  };
  const handleSubcatClick = (cat, subcat) => {
    setSelectedCat(cat);
    setSelectedSubcat(subcat);
    setSearch('');
  };

  return (
    <div className="shopcategory-root">
      <aside className="shopcategory-sidebar">
        <div className="shopcategory-sidebar-title">Категории</div>
        <ul className="shopcategory-menu">
          <li>
            <button
              type="button"
              onClick={handleClearFilter}
              className={(!selectedCat && !selectedSubcat ? 'active' : '')}
            >Все товары</button>
          </li>
          {categories.map(cat =>
            <li key={cat.category}>
              <button
                type="button"
                className={`shopcategory-cat-btn${selectedCat === cat.category && !selectedSubcat ? ' active' : ''}`}
                onClick={() => handleCatClick(cat.category)}
                aria-expanded={openedCat === cat.category}
              >
                {cat.category}
                {cat.subcategories.length > 0 &&
                  <span className={`cat-arrow${openedCat === cat.category ? ' open' : ''}`}></span>
                }
              </button>
              {cat.subcategories.length > 0 && openedCat === cat.category && (
                <ul className="shopcategory-submenu">
                  <li>
                    <button
                      type="button"
                      className={`shopcategory-sub-btn${selectedCat === cat.category && !selectedSubcat ? ' active' : ''}`}
                      onClick={() => handleCatClick(cat.category)}
                    >Все</button>
                  </li>
                  {cat.subcategories.map(sub => (
                    <li key={`${cat.category}-${sub}`}>
                      <button
                        type="button"
                        className={`shopcategory-sub-btn${selectedCat === cat.category && selectedSubcat === sub ? ' active' : ''}`}
                        onClick={() => handleSubcatClick(cat.category, sub)}
                      >{sub}</button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
        </ul>
      </aside>

      <main className="shopcategory-content">
        <div className="shopcategory-topbar">
          <h1>Каталог товаров</h1>
          <div className="shopcategory-searchwrap">
            <input
              type="text"
              placeholder="Поиск по товарам..."
              className="shopcategory-search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search &&
              <button className="shopcategory-search-clear" onClick={() => setSearch('')} title="Очистить поиск">&times;</button>
            }
          </div>
        </div>
        {loading ? (
          <div className="shopcategory-loader">Загрузка товаров...</div>
        ) : !products.length ? (
          <div className="shopcategory-empty"><b>Нет товаров.</b></div>
        ) : (
          <div className="shopcategory-grid">
            {products.map(product => <Item key={product._id} {...product} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopCategory;