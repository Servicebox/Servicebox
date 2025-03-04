import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://servicebox35.pp.ru/api/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://servicebox35.pp.ru/api/news/${id}`);
      setNews(news.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  return (
    <div className="list-news">
      <h2>Список Новостей</h2>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              {item.image && <img src={`https://servicebox35.pp.ru${item.image}`} alt="News" />}
              {item.video && <video src={`https://servicebox35.pp.ru${item.video}`} controls />}
              <div className="actions">
                <Link to={`/admin-panel/update-news/${item.id}`}>Редактировать</Link>
                <button onClick={() => handleDelete(item.id)}>Удалить</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListNews;