import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import './ShopCategory.css';
import Item from '../Item/Item';

const API_URL = "https://servicebox35.pp.ru";

const PLACEHOLDER = "data:image/svg+xml;utf8,<svg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect fill='%23F1F1F1' width='400' height='400'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='%23b3b3b3'>Нет фото</text></svg>";

const ShopCategory = () => {
  const [categories, setCategories] = useState([]);
  const [openedCat, setOpenedCat] = useState(null);
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedSubcat, setSelectedSubcat] = useState('');
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest'); 
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const [catsResponse, prodsResponse] = await Promise.all([
          axios.get(`${API_URL}/api/categories-with-subcategories`),
          axios.get(`${API_URL}/api/allproducts`),
        ]);
        
        if (!ignore) {
          setCategories(catsResponse.data);
          
          const productsData = prodsResponse.data;
          let productsArray = [];
          
          if (productsData.success && Array.isArray(productsData.products)) {
            productsArray = productsData.products;
          } else if (Array.isArray(productsData)) {
            productsArray = productsData;
          }
          
          setProducts(productsArray);
          setAllProducts(productsArray);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
    
    return () => { ignore = true };
  }, []);

  const handleClearFilter = useCallback(() => {
    setSelectedCat('');
    setSelectedSubcat('');
    setSearch('');
    setCurrentPage(1);
    setSortBy('newest');
  }, []);


  const processedProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (selectedCat) {
      filtered = filtered.filter(p => p.category === selectedCat);
    }
    if (selectedSubcat) {
      filtered = filtered.filter(p => p.subcategory === selectedSubcat);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(p =>
        (p.name ?? '').toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q) ||
        (p.category ?? '').toLowerCase().includes(q) ||
        (p.subcategory ?? '').toLowerCase().includes(q)
      );
    }
    
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => (a.new_price || 0) - (b.new_price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.new_price || 0) - (a.new_price || 0));
        break;
      default:
        break;
    }
    
    return filtered;
  }, [search, selectedCat, selectedSubcat, allProducts, sortBy]);

  useEffect(() => {
    setProducts(processedProducts);
    setCurrentPage(1);
  }, [processedProducts]);

  const handleCatClick = useCallback((cat) => {
    setOpenedCat(openedCat === cat ? null : cat);
    setSelectedCat(cat);
    setSelectedSubcat('');
    setSearch('');
  }, [openedCat]);

  const handleSubcatClick = useCallback((cat, subcat) => {
    setSelectedCat(cat);
    setSelectedSubcat(subcat);
    setSearch('');
  }, []);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => {
    return products.slice(indexOfFirstItem, indexOfLastItem);
  }, [products, indexOfFirstItem, indexOfLastItem]);
  
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const newArrivals = useMemo(() => {
    return [...allProducts]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 8);
  }, [allProducts]);

  const catalogStructuredData = useMemo(() => {
    return {

    };
  }, [products.length, currentItems, indexOfFirstItem]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(6);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(9);
      } else {
        setItemsPerPage(12);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
     
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogStructuredData) }}
      />

      <main className="shopcategory" itemScope itemType="https://schema.org/ItemList">

        {showMobileFilters && (
          <div className="shopcategory__mobile-filters-overlay">
            <div className="shopcategory__mobile-filters-content">
              <div className="shopcategory__mobile-filters-header">
                <h2>Фильтры</h2>
                <button 
                  className="shopcategory__mobile-filters-close"
                  onClick={() => setShowMobileFilters(false)}
                  aria-label="Закрыть фильтры"
                >
                  ×
                </button>
              </div>
              <nav className="shopcategory__sidebar" role="navigation" aria-label="Навигация по категориям">
                <h3 className="shopcategory__sidebar-title">Категории товаров</h3>
                <ul className="shopcategory__menu">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        handleClearFilter();
                        setShowMobileFilters(false);
                      }}
                      className={`shopcategory__btn shopcategory__btn--category ${(!selectedCat && !selectedSubcat ? 'shopcategory__btn--active' : '')}`}
                      aria-current={!selectedCat && !selectedSubcat ? "page" : undefined}
                    >
                      Все товары
                    </button>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.category} className="shopcategory__category-item">
                      <button
                        type="button"
                        className={`shopcategory__btn shopcategory__btn--category ${selectedCat === cat.category && !selectedSubcat ? 'shopcategory__btn--active' : ''}`}
                        onClick={() => {
                          handleCatClick(cat.category);
                          setShowMobileFilters(false);
                        }}
                        aria-expanded={openedCat === cat.category}
                        aria-controls={`submenu-${cat.category}`}
                      >
                        <span className="shopcategory__category-name">{cat.category}</span>
                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <span 
                            className={`shopcategory__arrow ${openedCat === cat.category ? 'shopcategory__arrow--open' : ''}`}
                            aria-hidden="true"
                          >
                            ▼
                          </span>
                        )}
                      </button>
                      {cat.subcategories && cat.subcategories.length > 0 && openedCat === cat.category && (
                        <ul 
                          id={`submenu-${cat.category}`}
                          className="shopcategory__submenu"
                          role="group"
                          aria-label={`Подкатегории ${cat.category}`}
                        >
                          <li>
                            <button
                              type="button"
                              className={`shopcategory__btn shopcategory__btn--subcategory ${selectedCat === cat.category && !selectedSubcat ? 'shopcategory__btn--active' : ''}`}
                              onClick={() => {
                                handleCatClick(cat.category);
                                setShowMobileFilters(false);
                              }}
                            >
                              Все подкатегории
                            </button>
                          </li>
                          {cat.subcategories.map(sub => (
                            <li key={`${cat.category}-${sub}`}>
                              <button
                                type="button"
                                className={`shopcategory__btn shopcategory__btn--subcategory ${selectedCat === cat.category && selectedSubcat === sub ? 'shopcategory__btn--active' : ''}`}
                                onClick={() => {
                                  handleSubcatClick(cat.category, sub);
                                  setShowMobileFilters(false);
                                }}
                              >
                                {sub}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}

        <nav className="shopcategory__sidebar" role="navigation" aria-label="Навигация по категориям">
          <h2 className="shopcategory__sidebar-title">Категории товаров</h2>
          <ul className="shopcategory__menu">
            <li>
              <button
                type="button"
                onClick={handleClearFilter}
                className={`shopcategory__btn shopcategory__btn--category ${(!selectedCat && !selectedSubcat ? 'shopcategory__btn--active' : '')}`}
                aria-current={!selectedCat && !selectedSubcat ? "page" : undefined}
              >
                Все товары
              </button>
            </li>
            {categories.map(cat => (
              <li key={cat.category} className="shopcategory__category-item">
                <button
                  type="button"
                  className={`shopcategory__btn shopcategory__btn--category ${selectedCat === cat.category && !selectedSubcat ? 'shopcategory__btn--active' : ''}`}
                  onClick={() => handleCatClick(cat.category)}
                  aria-expanded={openedCat === cat.category}
                  aria-controls={`submenu-${cat.category}`}
                >
                  <span className="shopcategory__category-name">{cat.category}</span>
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <span 
                      className={`shopcategory__arrow ${openedCat === cat.category ? 'shopcategory__arrow--open' : ''}`}
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  )}
                </button>
                {cat.subcategories && cat.subcategories.length > 0 && openedCat === cat.category && (
                  <ul 
                    id={`submenu-${cat.category}`}
                    className="shopcategory__submenu"
                    role="group"
                    aria-label={`Подкатегории ${cat.category}`}
                  >
                    <li>
                      <button
                        type="button"
                        className={`shopcategory__btn shopcategory__btn--subcategory ${selectedCat === cat.category && !selectedSubcat ? 'shopcategory__btn--active' : ''}`}
                        onClick={() => handleCatClick(cat.category)}
                      >
                        Все подкатегории
                      </button>
                    </li>
                    {cat.subcategories.map(sub => (
                      <li key={`${cat.category}-${sub}`}>
                        <button
                          type="button"
                          className={`shopcategory__btn shopcategory__btn--subcategory ${selectedCat === cat.category && selectedSubcat === sub ? 'shopcategory__btn--active' : ''}`}
                          onClick={() => handleSubcatClick(cat.category, sub)}
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="shopcategory__content">
          <header className="shopcategory__header">
            <div className="shopcategory__header-top">
              <h1 className="shopcategory__title" itemProp="name">
                {selectedCat 
                  ? `${selectedCat}${selectedSubcat ? ` / ${selectedSubcat}` : ''}` 
                  : 'Каталог товаров'}
              </h1>
              
              <button 
                className="shopcategory__mobile-filters-btn"
                onClick={() => setShowMobileFilters(true)}
                aria-label="Открыть фильтры"
              >
                Фильтры
              </button>
            </div>
            
            <div className="shopcategory__controls">
              <div className="shopcategory__search-container">
                <div className="shopcategory__search-wrapper">
                  <label htmlFor="product-search" className="visually-hidden">
                    Поиск по товарам
                  </label>
                  <input
                    id="product-search"
                    type="search"
                    placeholder="Поиск по товарам..."
                    className="shopcategory__search-input"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    autoComplete="off"
                  />
                  {search && (
                    <button 
                      className="shopcategory__search-clear"
                      onClick={() => setSearch('')}
                      aria-label="Очистить поиск"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
              
              <div className="shopcategory__toolbar">
                <div className="shopcategory__results-info">
                  Найдено: <strong>{products.length}</strong> товаров
                </div>
                
                <div className="shopcategory__view-controls">
                  <label htmlFor="sort-select" className="visually-hidden">
                    Сортировать по
                  </label>
                  <select
                    id="sort-select"
                    className="shopcategory__sort-select"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="newest">Сначала новые</option>
                    <option value="price-low">Цена: по возрастанию</option>
                    <option value="price-high">Цена: по убыванию</option>
                  </select>
                  
                  <div className="shopcategory__view-mode">
                    <button
                      className={`shopcategory__view-btn ${viewMode === 'grid' ? 'shopcategory__view-btn--active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Сетка"
                    >
                      🟦
                    </button>
                    <button
                      className={`shopcategory__view-btn ${viewMode === 'list' ? 'shopcategory__view-btn--active' : ''}`}
                      onClick={() => setViewMode('list')}
                      aria-label="Список"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {!selectedCat && !selectedSubcat && !search && (
            <section className="shopcategory__new-arrivals">
              <h2 className="shopcategory__section-title">Новинки</h2>
              <div className="shopcategory__new-arrivals-grid">
                {newArrivals.map((product, index) => (
                  <div key={product.slug || product._id} className="shopcategory__new-arrival-item">
                    <Item 
                      id={product.slug}
                      slug={product.slug}
                      name={product.name}
                      images={product.images}
                      new_price={product.new_price}
                      old_price={product.old_price}
                      description={product.description}
                      quantity={product.quantity}
                      category={product.category}
                      subcategory={product.subcategory}
                      position={index + 1}
                      compact={true}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {loading ? (
            <div className="shopcategory__loading" role="status">
              <span className="shopcategory__loading-text">Загрузка товаров...</span>
            </div>
          ) : !products.length ? (
            <div className="shopcategory__empty">
              <p><strong>Товары не найдены.</strong></p>
              <button 
                className="shopcategory__reset-btn"
                onClick={handleClearFilter}
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <>
              <div 
                className={`shopcategory__grid shopcategory__grid--${viewMode}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {currentItems.map((product, index) => (
                  <div 
                    key={product.slug || product._id}
                    className="shopcategory__grid-item"
                  >
                    <Item 
                      id={product.slug}
                      slug={product.slug}
                      name={product.name}
                      images={product.images}
                      new_price={product.new_price}
                      old_price={product.old_price}
                      description={product.description}
                      quantity={product.quantity}
                      category={product.category}
                      subcategory={product.subcategory}
                      position={indexOfFirstItem + index + 1}
                    />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <nav 
                  className="shopcategory__pagination"
                  role="navigation"
                  aria-label="Навигация по страницам"
                >
                  <ul className="shopcategory__pagination-list">
                    <li>
                      <button
                        className="shopcategory__pagination-btn"
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        aria-label="Предыдущая страница"
                      >
                        ‹
                      </button>
                    </li>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }
                      
                      return (
                        <li key={page}>
                          <button
                            className={`shopcategory__pagination-btn ${currentPage === page ? 'shopcategory__pagination-btn--active' : ''}`}
                            onClick={() => paginate(page)}
                            aria-current={currentPage === page ? "page" : undefined}
                            aria-label={`Страница ${page}`}
                          >
                            {page}
                          </button>
                        </li>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <li className="shopcategory__pagination-ellipsis">…</li>
                        <li>
                          <button
                            className={`shopcategory__pagination-btn ${currentPage === totalPages ? 'shopcategory__pagination-btn--active' : ''}`}
                            onClick={() => paginate(totalPages)}
                            aria-current={currentPage === totalPages ? "page" : undefined}
                            aria-label={`Страница ${totalPages}`}
                          >
                            {totalPages}
                          </button>
                        </li>
                      </>
                    )}
                    
                    <li>
                      <button
                        className="shopcategory__pagination-btn"
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        aria-label="Следующая страница"
                      >
                        ›
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default ShopCategory;